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

import { IProductInput } from "@/types";

// limitations under the License.
export const groupByCategory = (products: IProductInput[]) => {
  const grouped: {
    [category: string]: { [subcategory: string]: IProductInput[] };
  } = {};

  products.forEach((product) => {
    if (!grouped[product.category]) grouped[product.category] = {};
    if (!grouped[product.category][product.subcategory]) {
      grouped[product.category][product.subcategory] = [];
    }
    grouped[product.category][product.subcategory].push(product);
  });
  return grouped;
};
