"use client";

import Link from "next/link";
import { Settings, Home, Heart, Star, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ whatsapp }: { whatsapp?: string }) {
  const router = useRouter();
  const waNumber = whatsapp || "905554443322";
  const [showMessage, setShowMessage] = useState(false);

  const handleFavoritesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.length === 0) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }
    router.push(`/?favs=${favorites.join(',')}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050204]/80 backdrop-blur-xl border-b border-pink-500/10">
      {showMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-pink-500/10 border border-pink-500/50 text-pink-400 px-6 py-3 rounded-xl text-sm font-bold animate-pulse">
          Henüz favori ilanınız bulunmuyor.
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Heart size={24} className="text-pink-500 fill-pink-500 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-black text-white uppercase tracking-tighter">
            ÇANAKKALE <span className="text-pink-500">ESCORT</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <Link href="/" className="hover:text-pink-500 transition-colors flex items-center gap-2">
            <Home size={14} /> Ana Sayfa
          </Link>
          <Link href="/?vip=true" className="hover:text-pink-500 transition-colors flex items-center gap-2">
            <Heart size={14} /> VIP
          </Link>
          <button
            onClick={handleFavoritesClick}
            className="hover:text-pink-500 transition-colors flex items-center gap-2 uppercase font-black"
          >
            <Heart size={14} className="fill-pink-500" /> Favoriler
          </button>
        </nav>

        <div className="flex items-center gap-4 border-l border-white/5 pl-6 ml-2">
          <Link
            href="/admin"
            className="p-2 text-gray-500 hover:text-pink-500 transition-colors"
            title="Yönetim"
          >
            <Settings size={18} />
          </Link>
          <a
            href={`https://wa.me/${waNumber}?text=Merhaba, ilan vermek istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 text-white px-5 py-2 rounded-lg text-[10px] font-black shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform active:scale-95 whitespace-nowrap uppercase tracking-tighter"
          >
            İLAN VER
          </a>
        </div>
      </div>
    </header>
  );
}
