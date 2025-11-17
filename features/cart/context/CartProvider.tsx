"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IProductInput } from "@/types";

type CartOrderItem = {
  clientId: string;
  product: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  quantity: number;
  countInStock: number;
  image: string;
  price: number;
  size?: string;
  color?: string;
};

type CartStore = {
  items: CartOrderItem[];
  itemsPrice: number;
  totalPrice: number;
  addItem: (
    product: IProductInput,
    opts?: { quantity?: number; size?: string; color?: string }
  ) => void;
  removeItem: (clientId: string) => void;
  updateQuantity: (clientId: string, qty: number) => void;
  clearCart: () => void;
};

function computePrices(items: CartOrderItem[]) {
  const itemsPrice = items.reduce(
    (s, it) => s + Number(it.price) * it.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const totalPrice = itemsPrice + shipping + tax;
  return { itemsPrice, shippingPrice: shipping, taxPrice: tax, totalPrice };
}

export const useCartContext = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemsPrice: 0,
      totalPrice: 0,
      addItem: (
        product: IProductInput,
        opts?: { quantity?: number; size?: string; color?: string }
      ) => {
        const quantity = opts?.quantity ?? 1;
        const size = opts?.size;
        const color = opts?.color;
        const clientId = `${product.slug}_${size || "_"}_${color || "_"}`;

        const items = get().items as CartOrderItem[];
        const existing = items.find((i) => i.clientId === clientId);
        let nextItems: CartOrderItem[];
        if (existing) {
          nextItems = items.map((i) =>
            i.clientId === clientId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          const item: CartOrderItem = {
            clientId,
            product: product.slug,
            name: product.name,
            slug: product.slug,
            category: product.category,
            subcategory: product.subcategory,
            quantity,
            countInStock: product.countInStock,
            image: product.images?.[0] ?? "",
            price: Number(product.listPrice ?? product.price ?? 0),
            size,
            color,
          };
          nextItems = [...items, item];
        }

        const prices = computePrices(nextItems);
        set({
          items: nextItems,
          itemsPrice: prices.itemsPrice,
          totalPrice: prices.totalPrice,
        });
      },
      removeItem: (clientId: string) => {
        const items = (get().items as CartOrderItem[]).filter(
          (i) => i.clientId !== clientId
        );
        const prices = computePrices(items);
        set({
          items,
          itemsPrice: prices.itemsPrice,
          totalPrice: prices.totalPrice,
        });
      },
      updateQuantity: (clientId: string, qty: number) => {
        const items = (get().items as CartOrderItem[]).map((i) =>
          i.clientId === clientId ? { ...i, quantity: qty } : i
        );
        const prices = computePrices(items);
        set({
          items,
          itemsPrice: prices.itemsPrice,
          totalPrice: prices.totalPrice,
        });
      },
      clearCart: () => {
        set({ items: [], itemsPrice: 0, totalPrice: 0 });
      },
    }),
    {
      name: "nasy_cart_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartContext;
