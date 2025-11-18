/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { IProductInput } from "@/types";
import { useCartContext } from "@/features/cart/context/CartProvider";
import { useToast } from "@/components/ui/Toast";

export default function AddToCartButton({
  product,
}: {
  product: IProductInput;
}) {
  const { addItem } = useCartContext();
  const toast = useToast();
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  function onAdd() {
    const clientId = `${product.slug}_${size || "_"}_${color || "_"}`;

    addItem(product, { quantity, size, color });

    try {
      toast.addToast(`Added ${product.name} to cart`, {
        thumbnail: product.images?.[0] ?? undefined,
        label: "Undo",
        onClick: () => {
          const state = (useCartContext as any).getState();
          const cur = state.items.find((i: any) => i.clientId === clientId);
          if (!cur) return;
          const newQty = (cur.quantity ?? 0) - quantity;
          if (newQty > 0) {
            state.updateQuantity(clientId, newQty);
          } else {
            state.removeItem(clientId);
          }
        },
      });
    } catch {
      // ignore if toast provider missing
    }
  }

  return (
    <div className="space-y-3">
      {product.sizes?.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <select
            value={size ?? ""}
            onChange={(e) => setSize(e.target.value || undefined)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select size</option>
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      {product.colors?.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <select
            value={color ?? ""}
            onChange={(e) => setColor(e.target.value || undefined)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select color</option>
            {product.colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number(e.target.value || 1)))
          }
          className="border rounded p-2 w-28"
        />
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full border py-3 rounded-lg font-medium hover:bg-gray-100"
      >
        Add to Cart
      </button>
    </div>
  );
}
