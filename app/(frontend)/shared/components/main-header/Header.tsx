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
import Cart from "@/app/(frontend)/cart/page";
import Navbar from "@/app/(frontend)/shared/components/main-header/Navbar";
import Search from "@/app/(frontend)/shared/components/main-header/Search";
import Login from "@/features/auth/components/Login/page";

export default function Header() {
  return (
    <div className="min-h-16 bg-[#ffffff] border-b border-[#eeeeee]">
      <div className="">
        <div className="flex items-center justify-center gap-4 mx-auto px-8 py-4 space-x-60">
          <Search />
          <Login />
        </div>
        <div className="">
          <Cart />
        </div>
      </div>

      <Navbar />
    </div>
  );
}
