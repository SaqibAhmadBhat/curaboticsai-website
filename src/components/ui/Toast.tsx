"use client";

export function Toast({ message, type = "info" }: { message: string; type?: "info" | "success" | "error" }) {
  const colors = {
    info: "bg-brand-600",
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 animate-slide-up rounded-lg ${colors[type]} px-4 py-3 text-sm text-white shadow-lg`}>
      {message}
    </div>
  );
}
