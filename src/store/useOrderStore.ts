// store/useOrderStore.ts
import { create } from "zustand";
import { Order } from "@/types";
import { persist } from "zustand/middleware";

interface OrderState {
  orderDetails: Order | null;
  setOrderDetails: (order: Order) => void;
  clearOrderDetails: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orderDetails: null,
      setOrderDetails: (order) => set({ orderDetails: order }),
      clearOrderDetails: () => set({ orderDetails: null }),
    }),
    {
      name: "order-storage",
    },
  ),
);
