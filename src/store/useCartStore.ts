import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStoreBase = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return { cart: state.cart.filter((item) => item.id !== productId) };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" },
  ),
);

export const useCartStore = () => {
  const store = useCartStoreBase();
  const total = store.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { ...store, total };
};
