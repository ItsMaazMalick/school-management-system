"use client";
import { addBrand, addBrandCategory, addBrandProduct } from "@/actions/brand";
import TextInput from "@/components/inputs/text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store";
import { useEffect, useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DeviceConditionRadioGroup from "./DeviceConditionRadioGroup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Cog,
  LucidePhone,
  Phone,
  PhoneIcon,
  Plus,
  Smartphone,
} from "lucide-react";
import FormSubmitButton from "@/components/form-submit-button";
import { z } from "zod";
import { createOrderSchema } from "@/app/checkout/checkout";
import { createOrder } from "@/actions/order";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define shared types for the product and service
export interface RepairService {
  id: string;
  name: string;
  type: string; // 'screen', 'battery', etc.
  price: number;
}

export interface RepairProduct {
  id: string;
  name: string;

  repairServices: RepairService[]; // Ensure this property exists
}

export interface RepairCategory {
  id: string;
  name: string;
  repairProducts: RepairProduct[];
}

export interface RepairBrand {
  id: string;
  name: string;
  repairCategories: RepairCategory[];
}

interface LastStepValues {
  imei: string;
  assignedTo: string;
  securityCode: string;
  customerComments: string;
  staffComments: string;
  price: string;
  dueOn: string;
  powerButton: "null" | "true" | "false"; // Power button can be "null", "true", or "false"
  touchFunctionality: "null" | "true" | "false";
  waterDamage: "null" | "true" | "false";
  backIsBroke: "null" | "true" | "false";
  laptopBatteryCheckUp: "null" | "true" | "false";
  volumeButton: "null" | "true" | "false";
  proximitySensor: "null" | "true" | "false";
  testCondition: "null" | "true" | "false";
  noBattery: "null" | "true" | "false";
  muteSwitch: "null" | "true" | "false";
  homeButton: "null" | "true" | "false";
  scratches: "null" | "true" | "false";
  laptopCheckup: "null" | "true" | "false";
}

export function PosBrands({ brands }: { brands: RepairBrand[] }) {
  // States to store the selected brand, category, product, and cart
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<RepairBrand | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<RepairCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<RepairProduct | null>(
    null
  );
  const [newBrandName, setNewBrandName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [lastStep, setLastStep] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    router.refresh();
  }, []);

  const [lastStepValues, setLastStepValues] = useState<LastStepValues>({
    imei: "",
    assignedTo: "",
    securityCode: "",
    customerComments: "",
    staffComments: "",
    price: "",
    dueOn: "",
    powerButton: "null",
    touchFunctionality: "null",
    waterDamage: "null",
    backIsBroke: "null",
    laptopBatteryCheckUp: "null",
    volumeButton: "null",
    proximitySensor: "null",
    testCondition: "null",
    noBattery: "null",
    muteSwitch: "null",
    homeButton: "null",
    scratches: "null",
    laptopCheckup: "null",
  });

  const {
    items,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  // Handle brand click
  const handleBrandClick = (brand: RepairBrand) => {
    setSelectedBrand(brand);
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  // Handle category click
  const handleCategoryClick = (category: RepairCategory) => {
    setSelectedCategory(category);
    setSelectedProduct(null); // Reset selected product
  };

  // Handle product click
  const handleProductClick = (product: RepairProduct) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (
    item: any,
    type: "mobile" | "service" | "screen" | "battery" | "charging",
    quantity: number = 1
  ) => {
    // Create a new cart item with the selected service and last step values
    const cartItem = {
      id: item.id,
      name: `${type !== "mobile" && `${selectedProduct?.name} - `}${item.name}`,
      price: item.price,
      type: type,
      quantity: quantity,
      serviceDetails: {
        imei: lastStepValues.imei,
        assignedTo: lastStepValues.assignedTo,
        securityCode: lastStepValues.securityCode,
        customerComments: lastStepValues.customerComments,
        staffComments: lastStepValues.staffComments,
        dueOn: lastStepValues.dueOn,
        conditions: {
          powerButton: lastStepValues.powerButton,
          touchFunctionality: lastStepValues.touchFunctionality,
          waterDamage: lastStepValues.waterDamage,
          backIsBroke: lastStepValues.backIsBroke,
          laptopBatteryCheckUp: lastStepValues.laptopBatteryCheckUp,
          volumeButton: lastStepValues.volumeButton,
          proximitySensor: lastStepValues.proximitySensor,
          testCondition: lastStepValues.testCondition,
          noBattery: lastStepValues.noBattery,
          muteSwitch: lastStepValues.muteSwitch,
          homeButton: lastStepValues.homeButton,
          scratches: lastStepValues.scratches,
          laptopCheckup: lastStepValues.laptopCheckup,
        },
      },
    };

    // Add the item to the cart with service details
    addItem(cartItem);

    // Reset last step after adding to cart
    setLastStep(false);
  };

  const handleAddBrand = async () => {
    if (!newBrandName) {
      return null;
    }
    startTransition(async () => {
      await addBrand({ name: newBrandName });
    });
    router.refresh();
  };
  const handleAddCategory = async () => {
    if (!newCategoryName) {
      return null;
    }
    startTransition(async () => {
      await addBrandCategory({
        brandId: selectedBrand?.id || "",
        name: newCategoryName,
      });
    });
    router.refresh();
  };
  const handleAddProduct = async () => {
    if (!newProductName) {
      return null;
    }
    startTransition(async () => {
      await addBrandProduct({
        categoryId: selectedCategory?.id || "",
        name: newProductName,
      });
    });
    router.refresh();
  };

  const handlePreDeviceToggle = (key: keyof LastStepValues) => {
    setLastStepValues((prevValues) => ({
      ...prevValues,
      [key]:
        prevValues[key] === "null"
          ? "true"
          : prevValues[key] === "true"
          ? "false"
          : "null", // Cycles through "null" -> "true" -> "false" -> "null"
    }));
  };

  const form = useForm<z.infer<typeof createOrderSchema>>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      name: "",
      device: "",
      imei: "",
      address: "",
      email: "",
      contactNumber: "",
      trxId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createOrderSchema>) {
    if (items.length < 1) {
      return alert("Please add items to the cart");
    }
    const res = await createOrder({ ...values, cartItems: items });
    if (res?.success) {
      clearCart();
      form.reset();
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="absolute top-[34px] left-2 w-[50%] p-4 flex items-center justify-between mb-2">
          <p className="font-semibold">Walkin Customer</p>
          <Dialog>
            <DialogTrigger asChild>
              <span className="p-2 rounded-md bg-primary-400 cursor-pointer flex items-center gap-2 text-white">
                Add Customer
                <Plus color="#fff" />
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader></DialogHeader>
              <DialogContent className="w-full lg:w-[60%]">
                <div className="p-4">
                  <p>Add Customer Detail Here</p>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                        <TextInput
                          label="Name"
                          name="name"
                          control={form.control}
                          hideLabel={true}
                        />
                        <TextInput
                          label="Device"
                          name="device"
                          control={form.control}
                          hideLabel={true}
                        />
                        <TextInput
                          label="IMEI / SERIAL NO #"
                          name="imei"
                          control={form.control}
                          hideLabel={true}
                        />
                        <TextInput
                          label="Address"
                          name="address"
                          control={form.control}
                          hideLabel={true}
                        />
                        <TextInput
                          label="Email"
                          name="email"
                          type="email"
                          control={form.control}
                          hideLabel={true}
                        />
                        <TextInput
                          label="Contact Number"
                          name="contactNumber"
                          control={form.control}
                          hideLabel={true}
                        />
                        <TextInput
                          label="TRX ID (Optional)"
                          name="trxId"
                          control={form.control}
                          hideLabel={true}
                        />
                      </div>

                      <div className="flex justify-center my-4">
                        <FormSubmitButton
                          title="Create Ticket"
                          disabled={
                            form.formState.isSubmitting || items.length < 1
                          }
                          loading={form.formState.isSubmitting}
                          className="w-fit"
                        />
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogContent>
              {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>
        {lastStep ? (
          <div className="px-4">
            <div className="">
              <div className="w-full py-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Pre Device Condition</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader></DialogHeader>
                    <DialogContent className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p>Power Button</p>
                        <div
                          onClick={() => handlePreDeviceToggle("powerButton")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.powerButton === "null"
                              ? "bg-gray-300"
                              : lastStepValues.powerButton === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.powerButton === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.powerButton === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <p>Touch Functionality</p>
                        <div
                          onClick={() =>
                            handlePreDeviceToggle("touchFunctionality")
                          }
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.touchFunctionality === "null"
                              ? "bg-gray-300"
                              : lastStepValues.touchFunctionality === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.touchFunctionality === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.touchFunctionality === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Water Damage</p>
                        <div
                          onClick={() => handlePreDeviceToggle("waterDamage")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.waterDamage === "null"
                              ? "bg-gray-300"
                              : lastStepValues.waterDamage === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.waterDamage === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.waterDamage === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Back is Broke</p>
                        <div
                          onClick={() => handlePreDeviceToggle("backIsBroke")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.backIsBroke === "null"
                              ? "bg-gray-300"
                              : lastStepValues.backIsBroke === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.backIsBroke === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.backIsBroke === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Laptop Battery Checkup</p>
                        <div
                          onClick={() =>
                            handlePreDeviceToggle("laptopBatteryCheckUp")
                          }
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.laptopBatteryCheckUp === "null"
                              ? "bg-gray-300"
                              : lastStepValues.laptopBatteryCheckUp === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.laptopBatteryCheckUp === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.laptopBatteryCheckUp ===
                                  "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Volume Button</p>
                        <div
                          onClick={() => handlePreDeviceToggle("volumeButton")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.volumeButton === "null"
                              ? "bg-gray-300"
                              : lastStepValues.volumeButton === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.volumeButton === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.volumeButton === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Proximity Sensor</p>
                        <div
                          onClick={() =>
                            handlePreDeviceToggle("proximitySensor")
                          }
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.proximitySensor === "null"
                              ? "bg-gray-300"
                              : lastStepValues.proximitySensor === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.proximitySensor === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.proximitySensor === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Test Condition</p>
                        <div
                          onClick={() => handlePreDeviceToggle("testCondition")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.testCondition === "null"
                              ? "bg-gray-300"
                              : lastStepValues.testCondition === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.testCondition === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.testCondition === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>No Battery</p>
                        <div
                          onClick={() => handlePreDeviceToggle("noBattery")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.noBattery === "null"
                              ? "bg-gray-300"
                              : lastStepValues.noBattery === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.noBattery === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.noBattery === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Mute Switch</p>
                        <div
                          onClick={() => handlePreDeviceToggle("muteSwitch")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.muteSwitch === "null"
                              ? "bg-gray-300"
                              : lastStepValues.muteSwitch === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.muteSwitch === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.muteSwitch === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Home Button</p>
                        <div
                          onClick={() => handlePreDeviceToggle("homeButton")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.homeButton === "null"
                              ? "bg-gray-300"
                              : lastStepValues.homeButton === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.homeButton === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.homeButton === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Scratches</p>
                        <div
                          onClick={() => handlePreDeviceToggle("scratches")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.scratches === "null"
                              ? "bg-gray-300"
                              : lastStepValues.scratches === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.scratches === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.scratches === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <p>Laptop Checkup</p>
                        <div
                          onClick={() => handlePreDeviceToggle("laptopCheckup")}
                          className={`w-[60px] h-[20px] ${
                            lastStepValues.laptopCheckup === "null"
                              ? "bg-gray-300"
                              : lastStepValues.laptopCheckup === "true"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } rounded-full cursor-pointer relative`}
                        >
                          <div
                            className={`h-[20px] w-[20px] rounded-full bg-gray-500 absolute transition-all duration-300 ease-in-out ${
                              lastStepValues.laptopCheckup === "true"
                                ? "translate-x-[40px]"
                                : lastStepValues.laptopCheckup === "false"
                                ? "translate-x-[20px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                    </DialogContent>
                    {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter> */}
                  </DialogContent>
                </Dialog>

                <div className="mt-2 space-y-4">
                  <Input
                    placeholder="IMEI / Serial No #"
                    value={lastStepValues.imei}
                    onChange={(e) =>
                      setLastStepValues({
                        ...lastStepValues,
                        imei: e.target.value,
                      })
                    }
                  />
                  <div className="my-1">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <Label>Assigned To</Label>
                        <select
                          onChange={(e) =>
                            setLastStepValues({
                              ...lastStepValues,
                              assignedTo: e.target.value,
                            })
                          }
                          name=""
                          id=""
                          className="w-[80%] p-2 rounded-md"
                        >
                          <option value="">Select</option>
                          <option value="Name 1">Name 1</option>
                          <option value="Name 2">Name 2</option>
                          <option value="Name 3">Name 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Input
                      placeholder="Security Code"
                      value={lastStepValues.securityCode}
                      onChange={(e) =>
                        setLastStepValues({
                          ...lastStepValues,
                          securityCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {/* <Label>Customer Comments</Label> */}
                    <Input
                      placeholder="Customer Comments"
                      onChange={(e) =>
                        setLastStepValues({
                          ...lastStepValues,
                          customerComments: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {/* <Label>Staff Comments</Label> */}
                    <Input
                      placeholder="Staff Comments"
                      onChange={(e) =>
                        setLastStepValues({
                          ...lastStepValues,
                          staffComments: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {/* <Label>Due On</Label> */}
                    <Input
                      placeholder="Due On"
                      type="date"
                      onChange={(e) =>
                        setLastStepValues({
                          ...lastStepValues,
                          dueOn: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      handleAddToCart(
                        selectedService,
                        selectedService.type === "screen"
                          ? "screen"
                          : selectedService.type === "battery"
                          ? "battery"
                          : selectedService.type === "charging"
                          ? "charging"
                          : "service"
                      );
                      setLastStepValues({
                        imei: "",
                        assignedTo: "",
                        securityCode: "",
                        customerComments: "",
                        staffComments: "",
                        price: "",
                        dueOn: "",
                        powerButton: "null",
                        touchFunctionality: "null",
                        waterDamage: "null",
                        backIsBroke: "null",
                        laptopBatteryCheckUp: "null",
                        volumeButton: "null",
                        proximitySensor: "null",
                        testCondition: "null",
                        noBattery: "null",
                        muteSwitch: "null",
                        homeButton: "null",
                        scratches: "null",
                        laptopCheckup: "null",
                      });
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">
              Add New Repairing Product
            </h1>

            {/* Show brands (only when no brand is selected) */}
            {!selectedBrand && !selectedCategory && !selectedProduct ? (
              <>
                <form
                  onSubmit={handleAddBrand}
                  className="flex flex-col lg:flex-row items-center gap-4 mb-2"
                >
                  <Input
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="Add new Brand"
                  />
                  <Button disabled={!newBrandName}>
                    {isPending ? "Loading..." : "Add New"}
                  </Button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {brands?.map((brand) => (
                    <div
                      key={brand.id}
                      className="bg-white text-center rounded-md hover:scale-105 duration-300 transition-all cursor-pointer p-4 flex flex-col items-center justify-center gap-2 shadow-lg text-xs font-semibold"
                      onClick={() => handleBrandClick(brand)}
                    >
                      <Smartphone />
                      {brand.name}
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {/* Show categories (only when a brand is selected) */}
            {selectedBrand && !selectedCategory && !selectedProduct ? (
              <div>
                <button
                  className="mb-4 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setSelectedBrand(null)} // Go back to brand selection
                >
                  Back to Brands
                </button>

                <h2 className="text-2xl font-bold mb-4">
                  {selectedBrand.name} Categories
                </h2>
                <form
                  onSubmit={handleAddCategory}
                  className="flex flex-col lg:flex-row items-center gap-4 mb-2"
                >
                  <Input
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Add new Category"
                  />
                  <Button disabled={!newCategoryName}>
                    {isPending ? "Loading..." : "Add New"}
                  </Button>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedBrand.repairCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white text-center rounded-md hover:scale-105 duration-300 transition-all cursor-pointer p-4 flex flex-col items-center justify-center gap-2 shadow-lg text-xs font-semibold"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <Smartphone />
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Show products (only when a category is selected) */}
            {selectedCategory && !selectedProduct ? (
              <div>
                <button
                  className="mb-4 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setSelectedCategory(null)} // Go back to category selection
                >
                  Back to Categories
                </button>

                <h3 className="text-xl font-bold mb-4">
                  {selectedCategory.name} Products
                </h3>
                <form
                  onSubmit={handleAddProduct}
                  className="flex flex-col lg:flex-row items-center gap-4 mb-2"
                >
                  <Input
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Add new Product"
                  />
                  <Button disabled={!newProductName}>
                    {isPending ? "Loading..." : "Add New"}
                  </Button>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCategory.repairProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white text-center rounded-md hover:scale-105 duration-300 transition-all cursor-pointer p-4 flex flex-col items-center justify-center gap-2 shadow-lg text-xs font-semibold"
                      onClick={() => handleProductClick(product)}
                    >
                      <Smartphone />
                      {product.name}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Show services for the selected product */}
            {selectedProduct ? (
              <div>
                <button
                  className="mb-4 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setSelectedProduct(null)} // Go back to product selection
                >
                  Back to Products
                </button>

                <h3 className="text-xl font-bold mb-4">
                  Services for {selectedProduct.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProduct.repairServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white text-center rounded-md hover:scale-105 duration-300 transition-all cursor-pointer p-4 flex flex-col items-center justify-center gap-2 shadow-lg text-xs font-semibold"
                      onClick={() => {
                        setSelectedService(service);
                        setLastStep(true);
                      }}
                    >
                      <Cog />
                      <span>{service.name}</span>
                      <span className="font-semibold">${service.price}</span>
                      {/* <span className="ml-2">${service.price.toFixed(2)}</span> */}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <Link
          href="/dashboard"
          className="p-2 bg-primary-600 text-white rounded-md"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/orders"
          className="p-2 bg-primary-600 text-white rounded-md"
        >
          View Tickets
        </Link>
        <Button onClick={clearCart} className="bg-green-500 text-white">
          Clear Cart
        </Button>
      </div>
    </>
  );
}
