"use server";

import prisma from "@/lib/db";
import { sendEmail } from "@/lib/send-email";
import { CartItem, ProductType } from "@/store";
import { error } from "console";
import { revalidatePath } from "next/cache";

type CreateOrderValues = {
  name: string;
  device: string;
  imei: string;
  address: string;
  contactNumber: string;
  email?: string; // Optional email
  trxId?: string; // Optional transaction ID

  cartItems: CartItem[];
};

export async function createOrder(values: CreateOrderValues) {
  try {
    if (!values.contactNumber) {
      return { error: "Contact Number is required" };
    }

    const totalPrice = values.cartItems.reduce(
      (total: number, item: CartItem) => {
        return total + item.price * item.quantity;
      },
      0
    );

    const result = await prisma.order.create({
      data: {
        name: values.name,
        contactNumber: values.contactNumber,
        email: values.email,
        trxId: values.trxId,
        price: totalPrice,
        address: values.address,
        device: values.device,
        imei: values.imei,
        orderStatus: "pending",
      },
    });
    const orderId = result.id;

    // Separate mobile products and repair services
    const orderItems = values.cartItems.filter(
      (item: any) => item.type === "mobile"
    );

    const services = values.cartItems.filter(
      (item: any) => item.type !== "mobile"
    );

    // 6. Create order items for mobile products
    if (orderItems.length > 0) {
      await prisma.orderItem.createMany({
        data: orderItems.map((item: any) => ({
          orderId: orderId,
          productId: item.id, // Assuming the `id` refers to a `Product`'s ObjectId
          quantity: item.quantity,
          //   price: item.price,
        })),
      });
      console.log(
        `Created ${orderItems.length} order items for mobile products.`
      );
    }
    console.log(services[0]);
    // 7. Create order services for repair services
    if (services.length > 0) {
      await prisma.orderServicesItem.createMany({
        data: services.map((item: any) => ({
          orderId: orderId,
          quantity: item.quantity,
          //   price: item.price,
          repairServicesId: item.id,
          assignedTo: item.serviceDetails.assignedTo,
          customerComments: item.serviceDetails.customerComments,
          staffComments: item.serviceDetails.staffComments,
          dueOn: new Date(item.serviceDetails.dueOn),
          imei: item.serviceDetails.imei,
          price: item.price,
          securityCode: item.serviceDetails.securityCode,
          powerButton: item.serviceDetails.conditions.powerButton,
          touchFunctionality: item.serviceDetails.conditions.touchFunctionality,
          waterDamage: item.serviceDetails.conditions.waterDamage,
          backIsBroke: item.serviceDetails.conditions.backIsBroke,
          laptopBatteryCheckUp:
            item.serviceDetails.conditions.laptopBatteryCheckUp,
          volumeButton: item.serviceDetails.conditions.volumeButton,
          proximitySensor: item.serviceDetails.conditions.proximitySensor,
          testCondition: item.serviceDetails.conditions.testCondition,
          noBattery: item.serviceDetails.conditions.noBattery,
          muteSwitch: item.serviceDetails.conditions.muteSwitch,
          homeButton: item.serviceDetails.conditions.homeButton,
          scratches: item.serviceDetails.conditions.scratches,
          laptopCheckup: item.serviceDetails.conditions.laptopCheckup,
        })),
      });
      console.log(
        `Created ${services.length} order services for repair services.`
      );
    }
    if (values.email) {
      const res = await sendEmail({ email: values.email, data: { ...values } });
    }
    const order = await prisma.order.findUnique({
      where: { id: result.id },
    });

    return { success: "Order created...", order };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch {
    return null;
  }
}

export async function getPendingOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: { orderStatus: "pending" },
    });
    return orders;
  } catch {
    return null;
  }
}

export async function getPaidOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: { orderStatus: "paid" },
    });
    return orders;
  } catch {
    return null;
  }
}

export async function getLast10Orders() {
  try {
    const orders = await prisma.order.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch {
    return null;
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderProducts: {
          include: {
            products: true,
          },
        },
        orderServicesItem: {
          include: {
            repairServices: {
              include: {
                repairProduct: true,
              },
            },
          },
        },
      },
    });
    return order;
  } catch {
    return null;
  }
}

export async function totalOrdersLength() {
  try {
    const orderLength = await prisma.order.count();
    return orderLength;
  } catch {
    return null;
  }
}

export async function getPendingOrdersLength() {
  try {
    const orderLength = await prisma.order.count({
      where: {
        orderStatus: "pending",
      },
    });
    return orderLength;
  } catch {
    return null;
  }
}

export async function getPaidOrdersLength() {
  try {
    const orderLength = await prisma.order.count({
      where: {
        orderStatus: "paid",
      },
    });
    return orderLength;
  } catch {
    return null;
  }
}

export const updateOrderStatus = async (id: string, orderStatus: string) => {
  try {
    await prisma.order.update({
      where: { id },
      data: {
        orderStatus: orderStatus === "paid" ? "paid" : "pending",
      },
    });
    revalidatePath(`/orders/${id}`);
    return { success: "Record update successfully" };
  } catch {
    return { success: "Record update successfully" };
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await prisma.order.delete({
      where: { id },
    });
    return { success: "Record deleted successfully" };
  } catch {
    return { error: "Internal server error" };
  }
};
