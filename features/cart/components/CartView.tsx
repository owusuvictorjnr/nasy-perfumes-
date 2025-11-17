"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/features/cart/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartView() {
  const {
    items,
    itemsPrice,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartContext();

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.clientId}
              className="flex items-center gap-4 border p-4 rounded"
            >
              <div className="w-24 h-24 relative">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.slug}</p>
                <p className="text-sm mt-1">{formatCurrency(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.clientId, Number(e.target.value))
                    }
                    className="border rounded p-1 w-20"
                  />
                  <Button
                    variant={"destructive"}
                    onClick={() => removeItem(item.clientId)}
                    className="text-sm cursor-pointer"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 border p-4 rounded">
          <h2 className="font-semibold mb-4">Order summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>{formatCurrency(itemsPrice)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">{formatCurrency(totalPrice)}</span>
          </div>

          <Link href="/checkout" className="w-full block">
            <button className="w-full bg-red-600 text-white py-3 rounded mb-2">
              Proceed to Checkout
            </button>
          </Link>
          <button onClick={clearCart} className="w-full border py-3 rounded">
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
