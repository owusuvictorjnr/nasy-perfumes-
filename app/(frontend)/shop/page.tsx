/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import CategoryList from "@/features/products/components/CategoryList";

type ApiResp = {
  data: any[];
  page: number;
  limit: number;
  total: number;
};

export default function ProductList() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
        const json: ApiResp = await res.json();
        if (!mounted) return;
        setItems((s) => [...s, ...json.data]);
        setTotal(json.total);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [page, limit]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            // stop if we've loaded everything
            if (total !== null && items.length >= total) return;
            setPage((p) => p + 1);
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef.current, loading, total, items.length]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>

      <CategoryList products={items} />

      <div className="mt-6 flex items-center justify-center">
        {loading ? (
          <div className="text-sm text-gray-600">Loading...</div>
        ) : total !== null && items.length >= total ? (
          <div className="text-sm text-gray-600">No more products</div>
        ) : (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded"
          >
            Load more
          </button>
        )}
      </div>

      {/* sentinel for intersection observer */}
      <div ref={sentinelRef} />
    </main>
  );
}
