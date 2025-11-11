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

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await axios.get(`/api/products/search?q=${query}`);
      if (!res.data) throw new Error("Failed to search products");
      return res.data;
    },
    enabled: !!query, // Only run the query if there's a search query
  });
}
