"use server";

import prisma from "@/lib/db";

interface CartItem {
  id: number; // Or number if the product ID is numeric
  name: string;
  price: number;
  quantity: number;
  type: "mobile" | "repair" | "backglass" | "screen";
}

interface CreateOrderValues {
  contactNumber: string;
  email?: string; // Optional email
  cartItems: CartItem[];
}

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
        contactNumber: values.contactNumber,
        email: values.email,
        price: totalPrice,
        orderStatus: "pending",
      },
    });
    const orderId = result.id;

    // Separate mobile products and repair services
    const orderItems = values.cartItems.filter(
      (item: any) => item.type === "mobile"
    );

    const extra = values.cartItems.filter(
      (item: any) => item.type === "backglass" || item.type === "screen"
    );

    const repairItems = values.cartItems.filter(
      (item: any) => item.type === "repair"
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

    console.log("Hello1");

    // 7. Create order services for repair services
    if (repairItems.length > 0) {
      await prisma.orderServicesItem.createMany({
        data: repairItems.map((item: any) => ({
          orderId: orderId,
          serviceId: item.id, // Assuming the `id` refers to a `RepairServices`'s ObjectId
          quantity: item.quantity,
          //   price: item.price,
        })),
      });
      console.log(
        `Created ${repairItems.length} order services for repair services.`
      );
    }

    if (extra.length > 0) {
      await prisma.orderServicesItem.createMany({
        data: extra.map((item: any) => ({
          orderId: orderId,
          serviceId: item.id,
          name: item.name,
          quantity: item.quantity,
          // price: item.price,
        })),
      });
      console.log(
        `Created ${orderItems.length} order items for mobile products.`
      );
    }

    return { success: "Order created..." };
  } catch {
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
        OrderServicesItem: {
          include: {
            services: true,
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
