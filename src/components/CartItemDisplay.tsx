"use client";
import Image from "next/image";
import { CartItem } from "@/types";

interface CartItemDisplayProps extends CartItem {
  mode?: "interactive" | "readonly-checkout" | "readonly-receipt";
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number) => void;
}

export function CartItemDisplay({
  id,
  image,
  title,
  price,
  quantity,
  mode = "interactive",
  onQuantityChange,
  onRemove,
}: CartItemDisplayProps) {
  const isInteractive = mode === "interactive";
  const isReadonly =
    mode === "readonly-checkout" || mode === "readonly-receipt";
  const isReceipt = mode === "readonly-receipt";

  // Interactive mode - full display
  if (isInteractive) {
    return (
      <div className="flex items-center gap-3 p-3 border rounded bg-gray-50 shadow-sm">
        <Image
          src={image}
          alt={title}
          width={64}
          height={64}
          className="object-contain w-16 h-16 rounded"
        />
        <div className="flex-1 ">
          <h2 className="font-semibold text-sm line-clamp-3">{title}</h2>
          <p className="text-gray-600 text-xs">${price.toFixed(2)}</p>
        </div>
        <div className="flex  gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange?.(id, quantity - 1)}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-xs min-w-5 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange?.(id, quantity + 1)}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove?.(id)}
            className="btn-danger px-2 py-1 text-xs"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  // Readonly modes - compact display with small images
  const containerClass = isReceipt
    ? "py-2 border-b last:border-b-0"
    : "border rounded-lg p-3 bg-gray-50";

  return (
    <div className={`${containerClass} flex justify-between gap-3`}>
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={title}
          width={40}
          height={40}
          className="object-contain rounded"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{title}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {quantity > 1 && (
          <span className="text-sm font-semibold text-gray-700">
            {quantity}x
          </span>
        )}
        <span className="text-sm text-gray-600">${price.toFixed(2)}</span>
        {quantity > 1 && (
          <span className="text-sm font-medium ml-1">
            = ${(price * quantity).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
