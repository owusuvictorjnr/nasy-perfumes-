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

import Navbar from "@/app/(frontend)/shared/components/main-header/Navbar";
import Search from "@/app/(frontend)/shared/components/main-header/Search";
import Sidebar from "@/app/(frontend)/shared/components/main-header/Sidebar";
import Login from "@/features/auth/components/Login/page";
import CartIcon from "@/features/cart/components/CartIcon";
import React, { useState } from "react";

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="min-h-16 bg-[#ffffff] border-b border-[#eeeeee]">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* left: hamburger on mobile */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded"
            aria-label="Open menu"
            onClick={() => setShowMobileNav(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="hidden md:block">
            <Search />
          </div>
        </div>

        {/* center: search on small screens as icon only */}
        <div className="md:hidden">
          <Search />
        </div>

        {/* right: login & cart - on small screens keep them visible in top-right */}
        <div className="flex items-center space-x-3">
          <div className="order-2 md:order-0">
            <Login />
          </div>
          <div className="order-3 md:order-0">
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Desktop navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile slide-over nav */}
      {showMobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 z-10"
            onClick={() => setShowMobileNav(false)}
          />
          <div className="ml-0 w-72 bg-white h-full p-4 overflow-auto z-50">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold">Menu</div>
              <button
                onClick={() => setShowMobileNav(false)}
                className="text-gray-600 rounded-full w-6  h-6 flex items-center justify-center"
              >
                x
              </button>
            </div>
            <div className="">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
