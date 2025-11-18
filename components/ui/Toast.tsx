"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type Toast = {
  id: string;
  message: string;
  thumbnail?: string;
  action?: { label: string; href?: string; onClick?: () => void };
};

type ToastContextType = {
  addToast: (
    message: string,
    opts?: {
      thumbnail?: string;
      label?: string;
      href?: string;
      onClick?: () => void;
    }
  ) => string;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    message: string,
    opts?: {
      thumbnail?: string;
      label?: string;
      href?: string;
      onClick?: () => void;
    }
  ) => {
    const id = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
    const t: Toast = {
      id,
      message,
      thumbnail: opts?.thumbnail,
      action: opts?.label
        ? { label: opts.label, href: opts.href, onClick: opts.onClick }
        : undefined,
    };
    setToasts((s) => [t, ...s]);
    // auto remove
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3500);
    return id;
  };

  const removeToast = (id: string) =>
    setToasts((s) => s.filter((x) => x.id !== id));

  const value = useMemo(() => ({ addToast, removeToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow-lg rounded-lg p-3 max-w-xs border flex gap-3 items-start"
            role="status"
          >
            {t.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={t.thumbnail}
                alt="thumb"
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="text-sm text-gray-900">{t.message}</div>
              {t.action && (
                <div className="mt-2 flex items-center gap-2">
                  {t.action.href ? (
                    <a
                      href={t.action.href}
                      className="text-xs text-indigo-600 underline"
                    >
                      {t.action.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        try {
                          t.action?.onClick?.();
                        } finally {
                          removeToast(t.id);
                        }
                      }}
                      className="text-xs text-indigo-600 underline"
                    >
                      {t.action.label}
                    </button>
                  )}
                  <button
                    onClick={() => removeToast(t.id)}
                    className="text-xs text-gray-500 ml-2"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
