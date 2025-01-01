"use client";

import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PosBrands, RepairBrand } from "./pos-brands";
import { useRouter } from "next/navigation";
import { getALLRepairingBrandsWithProduct } from "@/actions/service";

export function RepairingPos() {
  const [clientTotalPrice, setClientTotalPrice] = useState<number>(0); // State to store total price
  const [brands, setBrands] = useState<RepairBrand[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const brands = await getALLRepairingBrandsWithProduct();
      const safeBrands = brands ?? [];
      setBrands(safeBrands);
    };
    getData();
  }, []);

  const {
    items,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getTotalPrice,
    updateItemPrice,
  } = useCartStore();

  // Calculate the total price on client-side
  useEffect(() => {
    setClientTotalPrice(getTotalPrice());
  }, [items]); // Recalculate whenever items change

  const handlePriceChange = (id: number, newPrice: string) => {
    const parsedPrice = parseFloat(newPrice);
    if (!isNaN(parsedPrice) && parsedPrice > 0) {
      updateItemPrice(id, parsedPrice);
    }
  };

  return (
    <div className="bg-gray-100">
      <h1 className="mb-6 p-4 text-center font-bold text-primary-500">
        Add Repairing Service
      </h1>

      <div className=" w-full h-[calc(100dvh-128px)] flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex-1 max-h-[calc(100dvh-130px)] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Qty</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items
                  ?.filter((item) => item.type !== "mobile")
                  .map((product: any) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2 flex items-center gap-4">
                        <p
                          onClick={() => removeItem(product.id)}
                          className="p-1 bg-primary-500 rounded-full cursor-pointer text-white"
                        >
                          <X size={16} />
                        </p>
                        <p>{product.name}</p>
                      </td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">
                        {product.quantity * product.price}
                      </td>
                      <td>
                        <Input
                          onChange={(e) =>
                            handlePriceChange(product.id, e.target.value)
                          }
                          value={product.price}
                          placeholder="Price"
                          className="w-[80px]"
                          type="number"
                        />
                      </td>
                    </tr>
                  ))}
                <tr className="border-t font-bold">
                  <td className="">Total</td>
                  <td></td>
                  <td></td>
                  <td className="p-2 ">${clientTotalPrice.toFixed(2)}</td>
                  {/* <td>
                    <Button asChild>
                      <Link href={"/checkout"}>Checkout</Link>
                    </Button>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 max-h-[calc(100dvh-130px)] overflow-y-auto">
          <PosBrands brands={brands} />
        </div>
      </div>
    </div>
  );
}
