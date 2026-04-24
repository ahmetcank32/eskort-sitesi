import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, MapPin, Star, Sparkles, Phone, MessageCircle, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import FavoriteButton from "./FavoriteButton";

export const dynamic = 'force-dynamic';

async function getProfile(id: string) {
  return await prisma.profile.findUnique({
    where: { id }
  });
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getProfile(id);

  if (!profile) {
    notFound();
  }

  const whatsappLink = profile.phone ? `https://wa.me/${profile.phone}?text=Merhaba, profilinizi inceledim.` : '#';

  return (
    <main className="min-h-screen bg-[var(--background)] pb-20">
      {/* Top Banner & Cover Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-top"
          style={{ backgroundImage: `url(${profile.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-black/40 to-black/20" />
        </div>

        {/* Back Button */}
        <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
          <div className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/60 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Listeye Dön</span>
          </div>
        </Link>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-12">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-white/10 pb-8">
            <div>
              {profile.vip && (
                <div className="inline-flex items-center gap-1 bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-pink-500/30">
                  <Heart size={14} className="fill-pink-400" />
                  PREMIUM VIP
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold font-sans text-white mb-2 flex items-baseline gap-3">
                {profile.name} <span className="text-2xl text-gray-400 font-normal">{profile.age}</span>
              </h1>
              <div className="flex items-center text-gray-400 text-lg gap-2">
                <MapPin size={20} className="text-pink-500" />
                {profile.location}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
              {profile.phone ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/40 text-[#25D366] px-6 py-3 rounded-xl transition-colors font-medium border border-[#25D366]/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              ) : (
                <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 text-gray-400 px-6 py-3 rounded-xl font-medium border border-white/10 cursor-not-allowed">
                  <MessageCircle size={20} />
                  No Number
                </div>
              )}

              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] px-8 py-3 rounded-xl transition-transform active:scale-95 font-semibold uppercase tracking-tighter">
                <Phone size={20} />
                Ara
              </button>

              <FavoriteButton id={profile.id} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: About & Attributes */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Hakkımda <Heart size={18} className="inline text-pink-500 fill-pink-500" /></h2>
                <div className="prose prose-invert text-gray-300 leading-relaxed max-w-none">
                  {profile.bio.split('\n').map((para, idx) => (
                    <p key={idx} className="mb-4">{para}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">Hizmetler</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 bg-pink-500/5 border border-pink-500/10 px-4 py-2 rounded-full text-pink-100 text-sm">
                      <Sparkles size={14} className="text-pink-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Fake Gallery / More Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">Detaylar</h2>
              <div className="bg-black/40 rounded-2xl p-6 border border-pink-500/5 space-y-4">
                {(profile as any).availability && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Müsaitlik</span>
                    <span className="text-pink-100 font-medium font-sans uppercase text-xs">{(profile as any).availability}</span>
                  </div>
                )}
                {(profile as any).hairColor && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Saç Rengi</span>
                    <span className="text-white font-medium">{(profile as any).hairColor}</span>
                  </div>
                )}
                {(profile as any).height && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Boy</span>
                    <span className="text-white font-medium">{(profile as any).height}</span>
                  </div>
                )}
                {(profile as any).weight && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Kilo</span>
                    <span className="text-white font-medium">{(profile as any).weight}</span>
                  </div>
                )}
              </div>

              {/* Sample Contact Box */}
              <div className="mt-8 bg-gradient-to-br from-pink-500/10 to-fuchsia-600/10 rounded-2xl p-6 border border-pink-500/20 text-center">
                <h3 className="text-pink-400 font-black mb-2 uppercase tracking-tighter text-xl">Buluşmaya Hazır Mısın?</h3>
                <p className="text-pink-200/60 text-sm mb-4 font-bold">Hemen ulaş, maceranı başlat.</p>
                <div className="text-2xl font-black text-white tracking-[0.2em]">
                  {profile.phone ? `+${profile.phone}` : "GİZLİ NUMARA"}
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery (Real Data) */}
          <section className="mt-16 pt-16 border-t border-white/10">
            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">FOTOĞRAF GALERİSİ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[(profile as any).coverImage, (profile as any).image2, (profile as any).image3, (profile as any).image4, (profile as any).image5]
                .filter(Boolean)
                .map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 group cursor-zoom-in">
                    <img
                      src={img}
                      alt={`${profile.name}-${idx}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
