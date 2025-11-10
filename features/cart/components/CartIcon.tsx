// Copyright 2025 vitech
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use client";

import { useCartQuery } from "@/features/cart/hooks/queries/useCart";
import Link from "next/link";

export default function CartIcon() {
  const { data: cart, isLoading } = useCartQuery();
  return (
    <Link href="/cart" className="relative">
      <span className="font-medium">Cart</span>

      {!isLoading && cart?.item?.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {cart.item.length}
        </span>
      )}
    </Link>
  );
}
