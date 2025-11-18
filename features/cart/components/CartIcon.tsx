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

import { SHOPPING_BAG_ICON } from "@/constant/assets";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/features/cart/context/CartProvider";

export default function CartIcon() {
  const items = useCartContext((s) => s.items);
  const count = items?.length ?? 0;
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center w-10 h-10"
      aria-label="View cart"
    >
      <Image src={SHOPPING_BAG_ICON} alt="cart icon" width={28} height={28} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 shadow">
          {count}
        </span>
      )}
    </Link>
  );
}
