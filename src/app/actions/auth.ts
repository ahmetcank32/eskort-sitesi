"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
  try {
    const password = formData.get("password") as string;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return { error: "Admin şifresi ayarlanmamış!" };
    }

    // Check if the password is already hashed (starts with $2a$ or $2b$)
    const isHashed = adminPassword.startsWith("$2a$") || adminPassword.startsWith("$2b$");

    let isValid = false;

    if (isHashed) {
      // Compare with hashed password
      isValid = await bcrypt.compare(password, adminPassword);
    } else {
      // For backward compatibility, also support plain text comparison
      // In production, you should hash your password and use bcrypt.compare
      isValid = password === adminPassword;
    }

    if (isValid) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "lax",
      });
      return { success: true };
    }

    return { error: "Hatalı şifre!" };
  } catch (err: any) {
    console.error("Login error:", err);
    return { error: "Giriş hatası oluştu." };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
  } catch (err: any) {
    console.error("Logout error:", err);
    redirect("/admin/login");
  }
}
