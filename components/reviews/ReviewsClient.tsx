"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Review = {
  rating: number;
  title: string;
  comment: string;
};

export default function ReviewsClient({
  reviews,
  initialCount = 3,
}: {
  reviews: Review[];
  initialCount?: number;
}) {
  const [open, setOpen] = useState(false);

  const shown = reviews.slice(0, initialCount);
  const remaining = reviews.length - shown.length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {shown.map((review, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
              <h4 className="font-semibold text-lg">{review.title}</h4>

              <div className="flex text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}

          {remaining > 0 && (
            <div className="mt-2" onClick={() => setOpen(true)}>
              <Button
                onClick={() => setOpen(true)}
                className="bg-white text-black border shadow hover:bg-white cursor-pointer"
              >
                Read ({remaining} more)
              </Button>
            </div>
          )}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">All Reviews</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close reviews modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <h4 className="font-semibold text-lg">{review.title}</h4>
                  <div className="flex text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
