"use client";
import { useState } from "react";
import { addService } from "@/actions/service";
import { services } from "@/constants/repairing-data";

// Define types for the structure of the data coming from the backend
interface RepairProduct {
  id: string;
  name: string;
}

interface RepairCategory {
  id: string;
  name: string;
  repairProducts: RepairProduct[];
}

interface RepairBrand {
  id: string;
  name: string;
  repairCategories: RepairCategory[];
}

export type Service = {
  id: number;
  name: string;
};

export function AddRepairingForm({ brands }: { brands: RepairBrand[] }) {
  // States to store the selected brand, category, product, and services
  const [selectedBrand, setSelectedBrand] = useState<RepairBrand | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<RepairCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<RepairProduct | null>(
    null
  );
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [servicePrices, setServicePrices] = useState<{ [key: number]: number }>(
    {}
  );
  const [serviceStock, setServiceStock] = useState<{ [key: number]: number }>(
    {}
  );

  // Handle brand click
  const handleBrandClick = (brand: RepairBrand) => {
    setSelectedBrand(brand);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedServices([]);
    setServicePrices({});
  };

  // Handle category click
  const handleCategoryClick = (category: RepairCategory) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setSelectedServices([]);
    setServicePrices({});
  };

  // Handle product click
  const handleProductClick = (product: RepairProduct) => {
    setSelectedProduct(product);
    setSelectedServices([]);
    setServicePrices({});
  };

  // Toggle service selection
  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  // Handle price input for a selected service
  const handlePriceChange = (serviceId: number, price: number) => {
    setServicePrices((prevPrices) => ({
      ...prevPrices,
      [serviceId]: price,
    }));
  };

  const handleStockChange = (serviceId: number, stock: number) => {
    setServiceStock((prevStock) => ({
      ...prevStock,
      [serviceId]: stock,
    }));
  };

  // Handle form submission (for demo purposes)
  const handleSubmit = async () => {
    if (selectedProduct && selectedBrand && selectedCategory) {
      const serviceData = selectedServices
        .map((serviceId) => {
          // Find the service in the static list or dynamically generated list
          const service = services.find((service) => service.id === serviceId);

          // If no service is found, skip this entry
          if (!service) {
            return null; // or you can handle this case differently if needed
          }

          return {
            productId: selectedProduct.id,
            service: service, // We know it's defined now
            price: servicePrices[serviceId],
            inStock: serviceStock[serviceId],
          };
        })
        .filter((serviceData) => serviceData !== null);

      console.log("Submitted data for product:", selectedProduct.name);
      console.log("Selected services and prices:", serviceData);

      if (serviceData.length > 0) {
        const res = await addService({
          productId: selectedProduct.id,
          services: serviceData as any, // Type assertion to bypass TypeScript check
        });
        console.log(res);
      }
    } else {
      console.log("Please select a product, brand, and category.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Repairing Product</h1>

      {/* Show brands (only when no brand is selected) */}
      {!selectedBrand && !selectedCategory && !selectedProduct ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands?.map((brand) => (
            <div
              key={brand.id}
              className="bg-gradient-to-br from-primary-400 to-secondary-400 h-[150px] flex justify-center items-center text-xl font-bold text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer"
              onClick={() => handleBrandClick(brand)}
            >
              {brand.name}
            </div>
          ))}
        </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedBrand.repairCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gradient-to-br from-primary-400 to-secondary-400 h-[150px] flex justify-center items-center text-xl font-bold text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedCategory.repairProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-primary-400 to-secondary-400 h-[150px] flex justify-center items-center text-xl font-bold text-white rounded-md hover:scale-105 duration-300 transition-all cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Show services and prices form for the selected product */}
      {selectedProduct ? (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => setSelectedProduct(null)} // Go back to product selection
          >
            Back to Products
          </button>

          <h3 className="text-xl font-bold mb-4">
            Add Services for {selectedProduct.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`service-${service.id}`}
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                />
                <label
                  htmlFor={`service-${service.id}`}
                  className="font-semibold"
                >
                  {service.name}
                </label>
                {selectedServices.includes(service.id) && (
                  <>
                    <input
                      type="number"
                      className="block ml-4 p-2 border rounded-md"
                      placeholder="Price"
                      value={servicePrices[service.id] || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          service.id,
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <input
                      type="number"
                      className="block ml-4 p-2 border rounded-md"
                      placeholder="Stock"
                      value={serviceStock[service.id] || ""}
                      onChange={(e) =>
                        handleStockChange(
                          service.id,
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
}
