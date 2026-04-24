"use client";

import { deleteProfile } from "@/app/actions/profile";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    const result = await deleteProfile(id);
    if (result.error) {
      setError(result.error);
      setTimeout(() => setError(""), 3000);
    }
    setLoading(false);
    setShowConfirm(false);
  }

  return (
    <div className="relative">
      {showConfirm && (
        <div className="absolute right-0 top-12 bg-black/90 border border-red-500/50 rounded-xl p-4 min-w-[200px] z-50">
          <p className="text-white text-sm mb-3">Bu ilanı silmek istediğinize emin misiniz?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Siliniyor..." : "Evet"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20"
            >
              İptal
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute right-0 top-12 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl px-3 py-2 text-xs font-bold z-50 whitespace-nowrap">
          {error}
        </div>
      )}
      <button
        onClick={() => setShowConfirm(!showConfirm)}
        disabled={loading}
        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
