import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, email, currency = "GHS" } = body;

    if (!amount || !email) {
      return NextResponse.json(
        { error: "Missing amount or email" },
        { status: 400 }
      );
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfigured: PAYSTACK_SECRET_KEY missing" },
        { status: 500 }
      );
    }

    // Paystack expects amount in the smallest currency unit (e.g. pesewas/kobo)
    const amountInSmallest = Math.round(Number(amount) * 100);

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amountInSmallest, email, currency }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Paystack init failed", details: data },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
