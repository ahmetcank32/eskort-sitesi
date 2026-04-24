"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1016] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-pink-500/10 border border-pink-500/20 mb-6 shadow-[0_0_50px_rgba(236,72,153,0.1)]">
            <Heart className="text-pink-500 fill-pink-500" size={40} />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Yönetim Paneli</h1>
          <p className="text-pink-300/40 mt-2 font-bold uppercase tracking-widest text-xs">Lütfen devam etmek için şifrenizi girin</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6 border border-pink-500/10">
          {error && (
            <div className="bg-pink-500/10 border border-pink-500/50 text-pink-400 p-4 rounded-xl text-sm text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-pink-300/40 text-xs font-bold uppercase tracking-widest ml-1">Şifre</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-400 text-white font-black py-4 rounded-2xl shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all active:scale-95 disabled:opacity-50 tracking-widest"
          >
            {loading ? "Giriş yapılıyor..." : "GİRİŞ YAP"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-xs uppercase tracking-[0.2em]">
          Çanakkale Escort &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
