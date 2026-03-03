// store/useOrderStore.ts
import { create } from "zustand";
import { CartItem, Order } from "@/types";
import { persist } from "zustand/middleware";

interface OrderState {
  order: Order | null;
  orderDetails: CartItem[];
  setOrder: (order: Order) => void;
  setOrderDetails: (cartItems: CartItem[]) => void;
  clearOrderDetails: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      order: null,
      orderDetails: [],
      setOrder: (order) => set({ order: order }),
      setOrderDetails: (cartItems) => set({ orderDetails: cartItems }),
      clearOrderDetails: () => set({ orderDetails: [] }),
    }),
    {
      name: "order-storage",
    },
  ),
);
