"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditForm({ profile }: { profile: any }) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(profile.id, formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess("Profil başarıyla güncellendi!");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    }
    
    setLoading(false);
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">İlanı Düzenle</h1>
          <p className="text-gray-500">"{profile.name}" profilini güncelleyin</p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-6 rounded-2xl mb-8 flex gap-3 items-center">
          <AlertCircle size={20} className="text-red-400" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-200 p-6 rounded-2xl mb-8 flex gap-3 items-center">
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-10 rounded-3xl space-y-10 border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">İsim</label>
            <input 
              name="name" 
              defaultValue={profile.name}
              required 
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" 
              placeholder="Örn. Ece" 
            />
          </div>
          
          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Yaş</label>
            <input 
              type="number" 
              name="age" 
              defaultValue={profile.age}
              required 
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" 
              placeholder="Örn. 24" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Konum</label>
            <input 
              name="location" 
              defaultValue={profile.location}
              required 
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" 
              placeholder="Örn. İstanbul, Türkiye" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">WhatsApp No</label>
            <input 
              name="phone" 
              defaultValue={profile.phone || ""}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" 
              placeholder="90555..." 
            />
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Fotoğraflar (5 Adet)</label>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input name="coverImage" defaultValue={profile.coverImage} type="url" required className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="Foto 1" />
            <input name="image2" defaultValue={profile.image2 || ""} type="url" className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="Foto 2" />
            <input name="image3" defaultValue={profile.image3 || ""} type="url" className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="Foto 3" />
            <input name="image4" defaultValue={profile.image4 || ""} type="url" className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="Foto 4" />
            <input name="image5" defaultValue={profile.image5 || ""} type="url" className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="Foto 5" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Hizmetler (Virgülle ayırın)</label>
          <input 
            name="features" 
            defaultValue={profile.features ? profile.features.join(", ") : ""}
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" 
            placeholder="Örn. Akşam Yemeği, Sohbet, Şehir Turu" 
          />
        </div>

        <div className="space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Hakkında & Biyografi</label>
          <textarea 
            name="bio" 
            defaultValue={profile.bio}
            required 
            rows={4} 
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" 
            placeholder="..." 
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            name="vip" 
            id="vip" 
            defaultChecked={profile.vip}
            className="w-6 h-6 accent-pink-500 rounded-lg" 
          />
          <label htmlFor="vip" className="text-pink-500 font-black uppercase tracking-tighter cursor-pointer">VIP OLARAK İŞARETLE</label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-yellow-400 text-black font-black py-6 rounded-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 text-xl tracking-tighter"
        >
          {loading ? "Güncelleniyor..." : "DEĞİŞİKLİKLERİ KAYDET"}
        </button>
      </form>
    </div>
  );
}
