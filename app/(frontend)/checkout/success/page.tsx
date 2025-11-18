/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function CheckoutSuccess() {
  const raw =
    typeof window !== "undefined"
      ? localStorage.getItem("nasy_last_order")
      : null;
  const order = raw ? JSON.parse(raw) : null;

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <p>
          Your order could not be found. If you think this is a mistake, please
          contact support.
        </p>
        <Link href="/">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Thank you — order placed</h1>
      <p className="mb-4">
        Order ID: <span className="font-mono">{order.id}</span>
      </p>

      <div className="border p-4 rounded mb-4 space-y-2">
        <h2 className="font-semibold mb-2">Delivery Information</h2>
        <div>
          <h1 className="font-medium">
            First Name:{" "}
            <span className="font-normal">{order.customer.firstName} </span>
          </h1>

          <h1 className="font-medium">
            Middle Name:{" "}
            <span className="font-normal">{order.customer.middleName} </span>
          </h1>

          <h1 className="font-medium">
            Last Name:{" "}
            <span className="font-normal">{order.customer.lastName}</span>
          </h1>
        </div>

        <div>
          <h1 className="font-medium">
            Email: <span className="font-normal">{order.customer.email}</span>
          </h1>
        </div>

        <div>
          <h1 className="font-medium">
            Address:{" "}
            <span className="font-normal">{order.customer.address}</span>
          </h1>
        </div>

        <div>
          <h1 className="font-medium">
            City: <span className="font-normal">{order.customer.city}</span>
          </h1>
          <h1 className="font-medium">
            Postal Code:{" "}
            <span className="font-normal">{order.customer.postal}</span>
          </h1>
        </div>

        <div>
          <h1 className="font-medium">
            GPS:{" "}
            <span className="font-normal">{order.customer.gpsAddress}</span>
          </h1>
          <h1 className="font-medium">
            Phone: <span className="font-normal">{order.customer.phone}</span>
          </h1>
        </div>
      </div>

      <div className="border p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Payment</h2>
        {/* <div>Provider: {order.payment?.provider ?? "paystack"}</div> */}
        <div>
          Method: {order.payment?.method ?? order.paymentMethod ?? "card"}
        </div>
        <div className="mt-2">Status: {order.paymentStatus ?? "pending"}</div>
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Items</h2>
        {order.items.map((it: any) => (
          <div key={it.clientId} className="flex items-center gap-3 mb-2">
            <Image
              src={it.image}
              height={500}
              width={500}
              alt={it.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-gray-600">
                {it.quantity} x {formatCurrency(it.price)}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(order.totalPrice)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
