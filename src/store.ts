import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ProductType = "mobile" | "repair" | "backglass" | "screen";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: ProductType;
};

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.type === item.type
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.type === item.type
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      incrementItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrementItem: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
