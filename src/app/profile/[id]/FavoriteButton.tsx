"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function FavoriteButton({ id }: { id: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId: string) => favId !== id);
      setIsFavorite(false);
    } else {
      newFavorites = [...favorites, id];
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <button 
      onClick={toggleFavorite}
      className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-bold uppercase text-xs ${
        isFavorite 
        ? "bg-pink-500/20 border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Heart size={18} className={isFavorite ? "fill-pink-500" : ""} />
      {isFavorite ? "Favorilerde" : "Favoriye Ekle"}
    </button>
  );
}
