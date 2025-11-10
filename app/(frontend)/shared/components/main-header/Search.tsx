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
import { Input } from "@/components/ui/input";
import { SEARCH_ICON } from "@/constant/assets";
import Image from "next/image";

export default function Search() {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 mt-2 mr-2 order-2">
        <Image
          src={SEARCH_ICON}
          alt="Search"
          height={20}
          width={20}
          className="bg--500 "
        />
      </div>
      <div className="w-100 md:w-160 pl-32">
        <Input
          type="text"
          className="border-3 active:border-red-400 bg-gray-400"
          placeholder="Search nasty perfumes..."
        />
      </div>
    </div>
  );
}
