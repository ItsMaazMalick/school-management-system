"use client";
import { addBrand, addBrandCategory, addBrandProduct } from "@/actions/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store";
import { useState, useTransition } from "react";

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
    addItem({
      id: item.id,
      name: `${type !== "mobile" && `${selectedProduct?.name} - `}${item.name}`,
      price: item.price,
      type: type,
    });
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

  return (
    <div className="container mx-auto px-4 py-8">
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
                onClick={() =>
                  handleAddToCart(
                    service,
                    service.type === "screen"
                      ? "screen"
                      : service.type === "battery"
                      ? "battery"
                      : service.type === "charging"
                      ? "charging"
                      : "service"
                  )
                }
              >
                <span>{service.name}</span>
                {/* <span className="ml-2">${service.price.toFixed(2)}</span> */}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
