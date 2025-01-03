import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ProductType =
  | "mobile"
  | "service"
  | "screen"
  | "battery"
  | "charging";

type PreDeviceCondition = "null" | "true" | "false";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: ProductType;
  productId?: string;
  imei?: String;
  assignedTo?: String;
  securityCode?: String;
  customerComments?: String;
  staffComments?: String;
  dueOn?: Date;
  powerButton?: PreDeviceCondition;
  touchFunctionality?: PreDeviceCondition;
  waterDamage?: PreDeviceCondition;
  backIsBroke?: PreDeviceCondition;
  laptopBatteryCheckUp?: PreDeviceCondition;
  volumeButton?: PreDeviceCondition;
  proximitySensor?: PreDeviceCondition;
  testCondition?: PreDeviceCondition;
  noBattery?: PreDeviceCondition;
  muteSwitch?: PreDeviceCondition;
  homeButton?: PreDeviceCondition;
  scratches?: PreDeviceCondition;
  laptopCheckup?: PreDeviceCondition;
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
  updateItemPrice: (id: number, newPrice: number) => void;
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
      updateItemPrice: (id, newPrice) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, price: newPrice } : item
          ),
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
