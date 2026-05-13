"use client";

import { useState } from "react";
import Link from "next/link";
import { type Locale, getT } from "@/lib/i18n";

type Role = "CLIENT" | "PROFESSIONAL";

const CATEGORIES = ["IT", "DESIGN", "ARCHITECTURE", "CONSTRUCTION", "EDUCATION", "MEDICINE", "LAW", "FINANCE", "BEAUTY", "OTHER"] as const;
const CITIES = ["ASHGABAT", "TURKMENABAT", "DASHOGUZ", "MARY", "BALKANABAT", "TURKMENBASHI"] as const;

export default function RegisterPage() {
  const [locale, setLocale] = useState<Locale>("tk");
  const [role, setRole] = useState<Role>("CLIENT");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "", category: "", city: "", bio: "" });
  const t = getT(locale);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) return alert(locale === "tk" ? "Açar sözler deň däl" : "Пароли не совпадают");
    // TODO: POST /api/auth/register
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Language toggle */}
        <div className="flex justify-end gap-2 mb-6">
          <button onClick={() => setLocale("tk")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "tk" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>TK</button>
          <button onClick={() => setLocale("ru")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "ru" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>RU</button>
        </div>

        <div className="card p-8">
          <div className="text-center mb-6">
            <Link href="/" className="text-2xl font-bold text-primary">Ukyp</Link>
            <h1 className="text-xl font-semibold text-gray-800 mt-2">{t.auth.registerTitle}</h1>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(["CLIENT", "PROFESSIONAL"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${role === r ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                {r === "CLIENT" ? `👤 ${t.auth.asClient}` : `🏆 ${t.auth.asProfessional}`}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.name}</label>
                <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.phone}</label>
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input" placeholder="+993" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.email}</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className="input" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.password}</label>
                <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required className="input" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.confirmPassword}</label>
                <input type="password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} required className="input" />
              </div>
            </div>

            {/* Professional-only fields */}
            {role === "PROFESSIONAL" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">{t.search.category}</label>
                    <select value={form.category} onChange={(e) => set("category", e.target.value)} required className="input">
                      <option value="">— seçiň —</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{t.categories[c.toLowerCase() as keyof typeof t.categories]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">{t.search.city}</label>
                    <select value={form.city} onChange={(e) => set("city", e.target.value)} required className="input">
                      <option value="">— seçiň —</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{t.cities[c.toLowerCase() as keyof typeof t.cities]}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">{t.profile.about}</label>
                  <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={3} className="input resize-none" placeholder={locale === "tk" ? "Özüňiz hakynda ýazyň..." : "Напишите о себе..."} />
                </div>
              </>
            )}

            <button type="submit" className="btn-primary w-full py-2.5 mt-2">{t.auth.registerBtn}</button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t.auth.alreadyHave}{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">{t.auth.loginBtn}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
