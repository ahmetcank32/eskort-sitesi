"use client";

import { useState } from "react";
import { addProfile } from "@/app/actions/profile";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProfilePage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(["", "", "", "", ""]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(["", "", "", "", ""]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/admin/api/auth-check');
        if (!response.ok) {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
      setAuthChecked(true);
    }
    checkAuth();
  }, [router]);

  if (!authChecked) {
    return null;
  }

  async function handleUpload(file: File, index: number) {
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...previewUrls];
      newPreviews[index] = reader.result as string;
      setPreviewUrls(newPreviews);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/admin/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        const newUrls = [...imageUrls];
        newUrls[index] = data.url;
        setImageUrls(newUrls);
      } else {
        setError('Fotoğraf yüklenemedi');
      }
    } catch (err) {
      setError('Fotoğraf yüklenirken hata oluştu');
    }

    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    // Add image URLs to form data
    imageUrls.forEach((url, index) => {
      if (url) {
        const fieldName = index === 0 ? 'coverImage' : `image${index + 1}`;
        formData.append(fieldName, url);
      }
    });

    const result = await addProfile(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess("Profil başarıyla eklendi!");
      (e.target as HTMLFormElement).reset();
      setImageUrls(["", "", "", "", ""]);
      setPreviewUrls(["", "", "", "", ""]);
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
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">YENİ ÇANAKKALE ESCORT İLANI</h1>
          <p className="text-gray-500">Çanakkale escort vitrine yeni bir profil katın</p>
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
            <input name="name" required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" placeholder="Örn. Ece" />
          </div>

          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Yaş</label>
            <input type="number" name="age" required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" placeholder="Örn. 24" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Konum</label>
            <input name="location" required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" placeholder="Örn. İstanbul, Türkiye" />
          </div>

          <div className="space-y-4">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">WhatsApp No</label>
            <input name="phone" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" placeholder="90555..." />
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Fotoğraflar (5 Adet)</label>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="space-y-2">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file, index);
                    }}
                    disabled={uploading}
                    id={`file-${index}`}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-${index}`}
                    className="block bg-black/40 border-2 border-dashed border-white/20 hover:border-pink-500 rounded-xl p-4 text-center cursor-pointer transition-all group"
                  >
                    <div className="text-gray-400 group-hover:text-pink-500 transition-colors">
                      <div className="text-2xl mb-1">+</div>
                      <div className="text-xs font-bold uppercase tracking-wider">Fotoğraf Seç</div>
                    </div>
                  </label>
                </div>
                {(previewUrls[index] || imageUrls[index]) && (
                  <img
                    src={previewUrls[index] || imageUrls[index]}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg border border-white/10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Hizmetler (Virgülle ayırın)</label>
          <input name="features" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" placeholder="Örn. Akşam Yemeği, Sohbet, Şehir Turu" />
        </div>

        <div className="space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">Hakkında & Biyografi</label>
          <textarea name="bio" required rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500" placeholder="..." />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" name="vip" id="vip" className="w-6 h-6 accent-pink-500 rounded-lg" />
          <label htmlFor="vip" className="text-pink-500 font-black uppercase tracking-tighter cursor-pointer">VIP OLARAK İŞARETLE</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-yellow-400 text-black font-black py-6 rounded-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 text-xl tracking-tighter"
        >
          {loading ? "Kaydediliyor..." : "İLANIDIR YAYINLA"}
        </button>
      </form>
    </div>
  );
}
