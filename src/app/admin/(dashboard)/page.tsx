import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Trash2, ExternalLink, Edit2 } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { checkAuth } from "@/lib/auth-check";

export default async function AdminPage() {
  await checkAuth();

  const profiles = await prisma.profile.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">ÇANAKKALE ESCORT İLAN YÖNETİMİ</h1>
          <p className="text-gray-500 mt-1">Çanakkale escort ilanlarını buradan yönetebilirsiniz</p>
        </div>
        <Link
          href="/admin/add"
          className="flex items-center gap-2 bg-pink-500 hover:bg-yellow-400 text-black font-black px-6 py-3 rounded-xl transition-all shadow-xl active:scale-95"
        >
          <PlusCircle size={20} />
          YENİ İLAN EKLE
        </Link>
      </div>

      <div className="grid gap-4">
        {profiles.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-white/5">
            <p className="text-gray-500">Henüz hiç ilan eklenmemiş.</p>
          </div>
        ) : (
          profiles.map((profile: any) => (
            <div key={profile.id} className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5">
                  <img src={profile.coverImage} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase">{profile.name}, {profile.age}</h3>
                  <p className="text-gray-500 text-sm tracking-widest uppercase">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/profile/${profile.id}`}
                  target="_blank"
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <ExternalLink size={20} />
                </Link>
                <Link
                  href={`/admin/edit/${profile.id}`}
                  className="p-3 text-blue-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <Edit2 size={20} />
                </Link>
                <DeleteButton id={profile.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
