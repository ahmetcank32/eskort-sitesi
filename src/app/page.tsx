import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Heart, MessageCircle } from "lucide-react";
import Header from "@/components/Header";

export const dynamic = 'force-dynamic';

async function getProfiles(vipOnly?: boolean, ids?: string[]) {
  const where: any = {};
  if (vipOnly) where.vip = true;
  if (ids && ids.length > 0) where.id = { in: ids };

  return await prisma.profile.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
}

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const vipOnly = params.vip === 'true';
  const favsRaw = params.favs as string;
  const favoriteIds = favsRaw ? favsRaw.split(',') : [];

  const profiles = await getProfiles(vipOnly, favoriteIds);

  const whatsapp = await prisma.setting.findUnique({ where: { key: "whatsapp_number" } });
  const whatsappValue = whatsapp?.value || "905554443322";

  return (
    <>
      <Header whatsapp={whatsappValue} />
      <main className="min-h-screen w-full bg-[#050204]">

        {/* Banner Title Section - Compact & Elegant */}
        <section className="w-full px-8 md:px-24 pt-20 pb-4 border-l-[10px] border-pink-500 bg-[#0d050a]">
          <h1 className="text-sm md:text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
            ÇANAKKALE <span className="text-pink-500 italic">ESCORT</span>
            <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={16} />
          </h1>
          <p className="text-pink-300/30 text-[8px] md:text-[10px] font-black tracking-[0.6em] uppercase mt-1">VIP ELİT SEÇKİN BAYANLAR</p>
        </section>

        {/* Vertical List of High-End Banners - Edge to Edge */}
        <section className="w-full">
          {profiles.map((profile: any) => (
            <div key={profile.id} className="relative w-full h-[25vh] md:h-[30vh] min-h-[200px] overflow-hidden border-b border-white/5 bg-black group">

              {/* Image Grid Area - Full Coverage */}
              <div className="grid grid-cols-5 absolute inset-0 z-0 h-full">
                {[profile.coverImage, profile.image2, profile.image3, profile.image4, profile.image5].map((img: string | null, idx: number) => (
                  <div key={idx} className="relative h-full w-full overflow-hidden border-r border-black/20">
                    <img
                      src={img || profile.coverImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"}
                      alt={`${profile.name}-${idx}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  </div>
                ))}
              </div>

              {/* VIP Badge - Top Right */}
              {profile.vip && (
                <div className="absolute top-4 right-4 z-30 flex items-center gap-1 bg-pink-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  <Heart size={10} className="fill-white" />
                  VIP
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:px-12 md:py-8 flex flex-col justify-end pointer-events-none">
                <div className="w-full flex flex-col md:flex-row items-end justify-between gap-6">
                  {/* Name & Data */}
                  <div className="space-y-1 text-left w-full md:w-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.8] tracking-tighter drop-shadow-2xl uppercase">
                      {profile.name} <span className="text-xl md:text-2xl text-pink-500 font-light ml-1">{profile.age}</span>
                    </h2>
                    <div className="flex items-center text-pink-200/50 gap-1.5 text-[10px] font-black tracking-widest uppercase mt-2">
                      <MapPin size={12} className="text-pink-500" />
                      {profile.location}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center gap-1.5 pointer-events-auto w-full md:w-auto">
                    {profile.phone && (
                      <a
                        href={`https://wa.me/${profile.phone}?text=Merhaba ${profile.name}, ilanınızı inceledim.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-black px-3 py-1.5 rounded-md hover:bg-white hover:text-black transition-all shadow-md text-[9px] uppercase tracking-tighter"
                      >
                        <MessageCircle size={12} />
                        WHATSAPP
                      </a>
                    )}
                    <Link
                      href={`/profile/${profile.id}`}
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-pink-500 text-white font-black px-3.5 py-1.5 rounded-md border-2 border-pink-500 hover:bg-transparent hover:text-pink-500 transition-all text-[9px] uppercase tracking-tighter"
                    >
                      İNCELE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Whole Banner Clickable Area */}
              <Link href={`/profile/${profile.id}`} className="absolute inset-0 z-10" />
            </div>
          ))}
        </section>
      </main>

      <footer className="py-16 border-t border-pink-500/10 bg-[#050204]">
        <div className="max-w-7xl mx-auto px-8 text-center space-y-4">
          <div className="text-3xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-2">
            ÇANAKKALE <span className="text-pink-500 italic">ESCORT</span> <Heart className="fill-pink-500 text-pink-500" size={20} />
          </div>
          <p className="text-pink-300/20 text-[10px] tracking-[0.5em] uppercase font-bold">
            All Rights Reserved &copy; 2026
          </p>
        </div>
      </footer>
    </>
  );
}
