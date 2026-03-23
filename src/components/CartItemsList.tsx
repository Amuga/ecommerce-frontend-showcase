"use client";
import { CartItemDisplay } from "./CartItemDisplay";
import { CartItem } from "@/types";

interface CartItemsListProps {
  items: CartItem[];
  mode?: "interactive" | "readonly-checkout" | "readonly-receipt";
  emptyMessage?: string;
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number) => void;
}

export function CartItemsList({
  items,
  mode = "interactive",
  emptyMessage = "No items",
  onQuantityChange,
  onRemove,
}: CartItemsListProps) {
  if (items.length === 0) {
    return <p className="text-gray-500 text-center py-8">{emptyMessage}</p>;
  }

  const isReceipt = mode === "readonly-receipt";
  const containerClass = isReceipt
    ? "divide-y divide-gray-200"
    : "flex flex-col gap-4";

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <CartItemDisplay
          key={item.id}
          id={item.id}
          image={item.image}
          category=""
          description=""
          rating={{}}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          mode={mode}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
