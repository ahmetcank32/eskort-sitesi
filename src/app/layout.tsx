import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Çanakkale Escort | Çanakkale Eskort Bayanlar | VIP Elit Eskort Kiralama",
  description: "Çanakkale escort bayanlar ve elit eskort kızlar. Gerçek resimli, VIP, masaj ve üniversiteli eskort hizmetleri. Çanakkale'de unutulmaz deneyim için hemen inceleyin.",
  keywords: "Çanakkale escort, Çanakkale eskort, Çanakkale escort bayan, Çanakkale eskort kızlar, Çanakkale vip escort, Çanakkale elit escort, Çanakkale masaj escort, Çanakkale üniversiteli escort, Çanakkale gerçek resimli escort, Çanakkale eskort kiralama, Biga escort, Lapseki escort, Gelibolu escort",
  openGraph: {
    title: "Çanakkale Escort | VIP Elit Eskort Bayanlar",
    description: "Çanakkale'nin en seçkin ve özel escort bayanlarını keşfedin. Unutulmaz anlar için hemen inceleyin.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Çanakkale Escort | VIP Elit Eskort Bayanlar",
    description: "Çanakkale'nin en seçkin ve özel escort bayanlarını keşfedin.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Çanakkale Escort | VIP Elit Eskort Bayanlar",
    "description": "Çanakkale escort bayanlar ve elit eskort kızlar. Gerçek resimli, VIP, masaj ve üniversiteli eskort hizmetleri.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Çanakkale",
      "addressCountry": "TR"
    },
    "areaServed": ["Çanakkale", "Biga", "Gelibolu", "Lapseki", "Bozcaada"],
    "priceRange": "$$$"
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Çanakkale escort hizmetleri nasıl çalışır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Çanakkale escort hizmetleri için profilimizi inceleyebilir, beğendiğiniz eskort ile iletişime geçebilirsiniz. Tüm profiller gerçek resimli ve doğrulanmıştır."
        }
      },
      {
        "@type": "Question",
        "name": "Güvenlik ve gizlilik nasıl sağlanır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tüm görüşmeler tamamen gizlidir. Kişisel bilgileriniz asla paylaşılmaz ve korunmaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi bölgelerde hizmet veriyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Çanakkale merkez, Biga, Gelibolu, Lapseki ve Bozcaada bölgelerinde hizmet vermekteyiz."
        }
      },
      {
        "@type": "Question",
        "name": "Randevu nasıl alabilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beğendiğiniz profilin WhatsApp numarasından veya iletişim formundan randevu talebinizi iletebilirsiniz."
        }
      }
    ]
  };

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f1016] text-[#ededed]">
        {children}
      </body>
    </html>
  );
}
