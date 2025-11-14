/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { Input } from "@/components/ui/input";
import { useSearchProducts } from "@/features/products/hooks/queries/useSearchProducts";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data } = useSearchProducts(query);
  return (
    <div className="">
      {/* <div className="absolute right-0 top-0 mt-2 mr-2 order-2">
        <Image
          src={SEARCH_ICON}
          alt="Search"
          height={20}
          width={20}
          className="bg--500 "
        />
      </div> */}
      <div className="relative  w-full max-w-md">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 w-full"
          placeholder="Search  perfumes..."
        />
        {query && data && (
          <ul className="absolute bg-white border w-full rounded-lg mt-2 z-10">
            {data.map((product: any) => (
              <li
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
