"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Locale, getT } from "@/lib/i18n";

export default function LoginPage() {
  const [locale, setLocale] = useState<Locale>("tk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const t = getT(locale);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? (locale === "tk" ? "Ýalňyşlyk ýüze çykdy" : "Произошла ошибка"));
      } else {
        router.push("/");
      }
    } catch {
      setError(locale === "tk" ? "Tor ýalňyşlygy. Gaýtadan synanyşyň." : "Ошибка сети. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-end gap-2 mb-6">
          <button onClick={() => setLocale("tk")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "tk" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>TK</button>
          <button onClick={() => setLocale("ru")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "ru" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>RU</button>
        </div>

        <div className="card p-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-primary">Ukyp</Link>
            <h1 className="text-xl font-semibold text-gray-800 mt-2">{t.auth.loginTitle}</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">{t.auth.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {locale === "tk" ? "Garaşyň..." : "Подождите..."}
                </>
              ) : t.auth.loginBtn}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t.auth.noAccount}{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">{t.auth.registerBtn}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
