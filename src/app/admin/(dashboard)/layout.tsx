"use client";

import Link from "next/link";
import { Settings, Users, PlusCircle, Home, LogOut, Heart } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f1016] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-black/40 border-r border-pink-500/10 md:min-h-screen p-6 flex flex-col">
        <h2 className="text-xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-tighter">
          <div className="p-2 bg-pink-500 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            <Settings size={18} className="text-white" />
          </div>
          ADMİN <Heart size={16} className="text-pink-500 fill-pink-500" />
        </h2>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 text-gray-400 hover:text-pink-500 hover:bg-pink-500/5 px-4 py-3 rounded-xl transition-all font-medium">
            <Users size={18} />
            Profiller
          </Link>
          <Link href="/admin/add" className="flex items-center gap-3 text-gray-400 hover:text-pink-500 hover:bg-pink-500/5 px-4 py-3 rounded-xl transition-all font-medium">
            <PlusCircle size={18} />
            Yeni İlan
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 text-gray-400 hover:text-pink-500 hover:bg-pink-500/5 px-4 py-3 rounded-xl transition-all font-medium">
            <Settings size={18} />
            Ayarlar
          </Link>
        </nav>

        <div className="pt-6 mt-6 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center gap-3 text-gray-500 hover:text-pink-400 px-4 py-3 rounded-xl transition-all">
            <Home size={18} />
            Siteye Git
          </Link>
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-3 text-pink-700 hover:text-pink-500 hover:bg-pink-500/10 px-4 py-3 rounded-xl transition-all text-left"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
