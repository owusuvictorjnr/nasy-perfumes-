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

export default function Navbar() {
  return (
    <div className="hidden md:block">
      <nav className="">
        <ul className="flex space-x-8 justify-center items-center py-2 uppercase font-medium">
          <li className="hover:text-blue-400 cursor-pointer">fine fragrances</li>
          <li className="hover:text-blue-400 cursor-pointer">body-hair-face</li>
          <li className="hover:text-blue-400 cursor-pointer">grooming</li>
          <li className="hover:text-blue-400 cursor-pointer">home creations</li>
          <li className="hover:text-blue-400 cursor-pointer">gift</li>
          <li className="hover:text-blue-400 cursor-pointer">sampless</li>
          <li className="hover:text-blue-400 cursor-pointer">About Us</li>
          <li className="hover:text-blue-400 cursor-pointer">Contact</li>
        </ul>
      </nav>
    </div>
  );
}
