import { prisma } from "@/lib/prisma";
import SettingsForm from "@/app/admin/(dashboard)/settings/SettingsForm";
import { checkAuth } from "@/lib/auth-check";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  await checkAuth();

  const whatsapp = await prisma.setting.findUnique({
    where: { key: "whatsapp_number" }
  });
  const whatsappValue = whatsapp?.value || "905554443322";

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">ÇANAKKALE ESCORT AYARLARI</h1>
        <p className="text-gray-500 mt-1">Çanakkale escort sitesi ayarlarını buradan güncelleyebilirsiniz</p>
      </div>

      <SettingsForm initialWhatsApp={whatsappValue} />
    </div>
  );
}
