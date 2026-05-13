"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Locale, getT } from "@/lib/i18n";

const CATEGORIES = [
  { slug: "IT", icon: "💻" },
  { slug: "DESIGN", icon: "🎨" },
  { slug: "ARCHITECTURE", icon: "🏛️" },
  { slug: "CONSTRUCTION", icon: "🔨" },
  { slug: "EDUCATION", icon: "📚" },
  { slug: "MEDICINE", icon: "🩺" },
  { slug: "LAW", icon: "⚖️" },
  { slug: "FINANCE", icon: "💰" },
  { slug: "BEAUTY", icon: "💅" },
  { slug: "OTHER", icon: "✨" },
] as const;

const STATS = [
  { value: "500+", labelTk: "Hünärmen", labelRu: "Специалистов" },
  { value: "10", labelTk: "Ugur", labelRu: "Категорий" },
  { value: "5", labelTk: "Şäher", labelRu: "Городов" },
  { value: "1000+", labelTk: "Müşderi", labelRu: "Клиентов" },
];

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("tk");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const t = getT(locale);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div>
      {/* Language toggle (page-level for demo; in prod this would be global context) */}
      <div className="max-w-6xl mx-auto px-4 pt-4 flex justify-end gap-2">
        <button onClick={() => setLocale("tk")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "tk" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>TK</button>
        <button onClick={() => setLocale("ru")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "ru" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>RU</button>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg opacity-90 mb-8">{t.hero.subtitle}</p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="btn-accent px-6 py-3 rounded-xl font-semibold whitespace-nowrap">
              {t.hero.searchBtn}
            </button>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.value}>
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{locale === "tk" ? s.labelTk : s.labelRu}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t.categories.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const label = t.categories[cat.slug.toLowerCase() as keyof typeof t.categories] as string;
            return (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}`}
                className="card flex flex-col items-center gap-3 p-5 hover:border-primary hover:shadow-md transition-all group cursor-pointer"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-semibold text-center text-gray-700 group-hover:text-primary transition-colors leading-tight">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA for professionals */}
      <section className="bg-accent/10 border-t border-accent/20 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {locale === "tk" ? "Siz hünärmenmi?" : "Вы специалист?"}
          </h2>
          <p className="text-gray-600 mb-6">
            {locale === "tk"
              ? "Profilinizi döredip, täze müşderileri tapyň."
              : "Создайте профиль и находите новых клиентов."}
          </p>
          <Link href="/auth/register" className="btn-accent inline-block px-8 py-3 rounded-xl font-semibold text-sm">
            {t.nav.forProfessionals}
          </Link>
        </div>
      </section>
    </div>
  );
}
