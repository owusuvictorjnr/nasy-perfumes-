"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/features/cart/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemsPrice, totalPrice, clearCart } = useCartContext();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [gpsAddress, setGpsAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [showOrderSidebar, setShowOrderSidebar] = useState(false);

  function validate() {
    if (!items || items.length === 0) return "Cart is empty";
    if (!firstName || !lastName) return "Please provide first and last name";
    if (!email) return "Please provide an email address";
    // basic email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return "Please provide a valid email";
    if (!address || !city || !postal || !gpsAddress)
      return "Please fill required fields";
    // payment details validation
    if (paymentMethod === "card") {
      const num = cardNumber.replace(/\s+/g, "");
      if (!/^[0-9]{13,19}$/.test(num))
        return "Please enter a valid card number";
      if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(cardExpiry))
        return "Please enter a valid expiry (MM/YY)";
      if (!/^[0-9]{3,4}$/.test(cardCvc)) return "Please enter a valid CVC";
    } else if (paymentMethod === "momo") {
      const m = momoNumber.replace(/\s+/g, "");
      if (m.length < 9) return "Please enter a valid mobile money number";
    }
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitOrder();
  }

  async function submitOrder() {
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);

    try {
      // mask/store only safe payment details locally
      const paymentDetails =
        paymentMethod === "card"
          ? { cardLast4: cardNumber.replace(/\D/g, "").slice(-4) }
          : { momoMasked: momoNumber.slice(-4) };

      const order = {
        id: `ORD_${Date.now()}`,
        createdAt: new Date().toISOString(),
        customer: {
          firstName,
          middleName,
          lastName,
          email,
          address,
          city,
          postal,
          gpsAddress,
          phone,
        },
        payment: {
          method: paymentMethod,
          provider: "paystack",
          details: paymentDetails,
        },
        paymentStatus: "pending",
        items,
        itemsPrice,
        totalPrice,
      } as const;

      localStorage.setItem("nasy_last_order", JSON.stringify(order));

      // Clear the cart and navigate to success page
      clearCart();
      router.push(`/checkout/success`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  }

  const OrderSummary = (
    <>
      <h2 className="font-semibold mb-4">Order summary</h2>
      {(!items || items.length === 0) && <div>Your cart is empty</div>}
      {items && items.length > 0 && (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.clientId} className="flex items-center gap-3">
              <Image
                src={it.image}
                alt={it.name}
                height={500}
                width={500}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">
                  {it.quantity} x {formatCurrency(it.price)}
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{formatCurrency(itemsPrice)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Payment method</span>
                <span className="text-sm text-gray-900">
                  {paymentMethod === "card" ? "Card " : "Mobile money "}
                </span>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => submitOrder()}
                  disabled={submitting}
                  className="w-full bg-green-600 text-white py-3 rounded"
                >
                  {submitting ? "Placing order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={onSubmit} className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Middle name (optional)
              </label>
              <input
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Postal code</label>
              <input
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                GPS address (e.g. GS-xxx-xxx)
              </label>
              <input
                value={gpsAddress}
                onChange={(e) => setGpsAddress(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Payment selection moved into the main form for mobile UX */}
          <div className="border rounded p-3 mt-4 bg-white">
            <label className="block text-sm font-medium mb-1">
              Choose payment
            </label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span className="ml-2">Card</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                />
                <span className="ml-2">Mobile money</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="border rounded p-3 mt-3">
                <h3 className="font-medium mb-2">Card details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">
                      Card number
                    </label>
                    <input
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm text-gray-700">
                        Expiry (MM/YY)
                      </label>
                      <input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="mt-1 block w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700">CVC</label>
                      <input
                        inputMode="numeric"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="mt-1 block w-full border rounded p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "momo" && (
              <div className="border rounded p-3 mt-3">
                <h3 className="font-medium mb-2">Mobile money</h3>
                <div>
                  <label className="block text-sm text-gray-700">
                    Mobile money number
                  </label>
                  <input
                    inputMode="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="024XXXXXXXX"
                    className="mt-1 block w-full border rounded p-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the mobile number to be charged via Paystack (Ghana
                    mobile money).
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && <div className="text-red-600">{error}</div>}
        </form>

        <aside className=" lg:block border p-4 rounded">{OrderSummary}</aside>

        {/* Mobile / medium sidebar toggle */}
        {/* <div className="lg:hidden">
          <button
            onClick={() => setShowOrderSidebar(true)}
            className="fixed bottom-4 right-4 z-50 bg-white border p-3 rounded-full shadow-lg"
            aria-label="View order summary"
          >
            View order
          </button>
        </div> */}

        {/* Slide-over for small/medium screens */}
        {showOrderSidebar && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowOrderSidebar(false)}
            />
            <div className="ml-auto w-full sm:w-96 bg-white h-full p-4 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Order summary</h3>
                <button
                  onClick={() => setShowOrderSidebar(false)}
                  className="text-gray-600"
                >
                  Close
                </button>
              </div>
              {OrderSummary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
