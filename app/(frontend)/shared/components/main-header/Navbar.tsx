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

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="hidden md:block">
      <nav className="">
        <ul className="flex space-x-8 justify-center items-center py-2 uppercase font-medium">
          <Link href={"/"}>
            <li className="hover:text-blue-400">home</li>
          </Link>
          <Link href={"/fine-fragrances"}>
            <li className="hover:text-blue-400">fine fragrances</li>
          </Link>
          <Link href={"/body-hair-face"}>
            <li className="hover:text-blue-400">body-hair-face</li>
          </Link>
          <Link href={"/grooming"}>
            <li className="hover:text-blue-400">grooming</li>
          </Link>
          <Link href={"/home-creations"}>
            <li className="hover:text-blue-400">home creations</li>
          </Link>
          <Link href={"/gifts"}>
            <li className="hover:text-blue-400">gift</li>
          </Link>
          <Link href={"/samples"}>
            <li className="hover:text-blue-400">samples</li>
          </Link>
          <Link href={"/about-us"}>
            <li className="hover:text-blue-400">About Us</li>
          </Link>
          <Link href={"/contact-us"}>
            <li className="hover:text-blue-400">Contact</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
