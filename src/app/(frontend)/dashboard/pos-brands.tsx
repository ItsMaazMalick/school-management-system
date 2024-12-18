"use client";
import { addBrand, addBrandCategory, addBrandProduct } from "@/actions/brand";
import TextInput from "@/components/inputs/text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store";
import { useState, useTransition } from "react";
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

export function PosBrands({ brands }: { brands: RepairBrand[] }) {
  // States to store the selected brand, category, product, and cart
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
  const [selectedService, setSelectedService] = useState<any>(null);
  const [lastStepValues, setLastStepValues] = useState({
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
    type: "mobile" | "service" | "screen" | "battery" | "charging"
  ) => {
    // Create a new cart item with the selected service and last step values
    const cartItem = {
      id: item.id,
      name: `${type !== "mobile" && `${selectedProduct?.name} - `}${item.name}`,
      price: item.price,
      type: type,
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
  };

  const handleLastStepValuesChange = (
    e: string,
    key: keyof typeof lastStepValues
  ) => {
    setLastStepValues({
      ...lastStepValues,
      [key]: e,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {lastStep ? (
        <div className="px-4">
          <div className="">
            <div className="w-full py-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Pre Device Condition</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    {/* <DialogTitle>Edit profile</DialogTitle> */}
                    {/* <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription> */}
                  </DialogHeader>
                  <DialogContent>
                    <DeviceConditionRadioGroup
                      label="Power Button"
                      value={lastStepValues.powerButton}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "powerButton")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Touch Functionality"
                      value={lastStepValues.touchFunctionality}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "touchFunctionality")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Water Damage"
                      value={lastStepValues.waterDamage}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "waterDamage")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Back is Broke"
                      value={lastStepValues.backIsBroke}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "backIsBroke")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Laptop Battery Checkup"
                      value={lastStepValues.laptopBatteryCheckUp}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "laptopBatteryCheckUp")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Volume Button"
                      value={lastStepValues.volumeButton}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "volumeButton")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Proximity Sensor"
                      value={lastStepValues.proximitySensor}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "proximitySensor")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Test Condition"
                      value={lastStepValues.testCondition}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "testCondition")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="No Battery"
                      value={lastStepValues.noBattery}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "noBattery")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Mute Switch"
                      value={lastStepValues.muteSwitch}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "muteSwitch")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Home Button"
                      value={lastStepValues.homeButton}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "homeButton")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Scratches"
                      value={lastStepValues.scratches}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "scratches")
                      }
                    />
                    <DeviceConditionRadioGroup
                      label="Laptop Checkup"
                      value={lastStepValues.laptopCheckup}
                      onChange={(e) =>
                        handleLastStepValuesChange(e, "laptopCheckup")
                      }
                    />
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
                      <RadioGroup
                        onValueChange={(value) =>
                          setLastStepValues({
                            ...lastStepValues,
                            assignedTo: value,
                          })
                        }
                        className="flex items-center gap-4"
                        value={lastStepValues.assignedTo}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Name 1" id="r1" />
                          <Label htmlFor="r1">Name 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Name 2" id="r2" />
                          <Label htmlFor="r2">Name 2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Name 3" id="r3" />
                          <Label htmlFor="r3">Name 3</Label>
                        </div>
                      </RadioGroup>
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
                  onClick={() =>
                    handleAddToCart(
                      selectedService,
                      selectedService.type === "screen"
                        ? "screen"
                        : selectedService.type === "battery"
                        ? "battery"
                        : selectedService.type === "charging"
                        ? "charging"
                        : "service"
                    )
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Add New Repairing Product</h1>

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
                    className="bg-gradient-to-br from-primary-400 to-secondary-400 text-center text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer py-2"
                    onClick={() => handleBrandClick(brand)}
                  >
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
                    className="bg-gradient-to-br from-primary-400 to-secondary-400 py-2 text-center text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
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
                    className="bg-gradient-to-br from-primary-400 to-secondary-400 py-2 text-center text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
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
                    className="bg-gradient-to-br from-primary-400 to-secondary-400 py-2 text-center text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedService(service);
                      setLastStep(true);
                    }}
                  >
                    <span>{service.name}</span>
                    {/* <span className="ml-2">${service.price.toFixed(2)}</span> */}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
