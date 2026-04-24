"use client";

import { useState } from "react";
import { updateSetting } from "@/app/actions/settings";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

export default function SettingsForm({ initialWhatsApp }: { initialWhatsApp: string }) {
  const [whatsapp, setWhatsapp] = useState(initialWhatsApp);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await updateSetting("whatsapp_number", whatsapp);

    if (result.success) {
      setMessage({ type: 'success', text: 'Ayarlar başarıyla kaydedildi!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Bir hata oluştu.' });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-200' : 'bg-red-500/10 border border-red-500/50 text-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <p>{message.text}</p>
        </div>
      )}

      <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="space-y-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">İlan Başvuru WhatsApp Numarası</label>
          <div className="relative">
            <input 
              type="text" 
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500 pl-12" 
              placeholder="90555..." 
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">+</div>
          </div>
          <p className="text-gray-600 text-xs ml-1">Ziyaretçilerin "İlan Ver" butonuna tıkladığında yönlendirileceği numara.</p>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? "Kaydediliyor..." : (
            <>
              <Save size={20} />
              AYARLARI KAYDET
            </>
          )}
        </button>
      </div>
    </form>
  );
}
