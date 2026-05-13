"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type Locale, getT } from "@/lib/i18n";
import ProfessionalCard from "@/components/professional/ProfessionalCard";

const CATEGORIES = ["IT", "DESIGN", "ARCHITECTURE", "CONSTRUCTION", "EDUCATION", "MEDICINE", "LAW", "FINANCE", "BEAUTY", "OTHER"] as const;
const CITIES = ["ASHGABAT", "TURKMENABAT", "DASHOGUZ", "MARY", "BALKANABAT", "TURKMENBASHI"] as const;

const MOCK_PROFESSIONALS = [
  { id: "1", user: { name: "Plany Planyyewa" }, category: "DESIGN", city: "ASHGABAT", bio: "UI/UX dizaýner. 6 ýyl tejribe.", bioRu: "UI/UX дизайнер. 6 лет опыта.", hourlyRate: 80, yearsExp: 6, isVerified: true, isBoosted: true, avatarUrl: null, _count: { reviews: 12 }, avgRating: 4.8 },
  { id: "2", user: { name: "Plany Planyyew" }, category: "IT", city: "ASHGABAT", bio: "Full-stack developer. React, Node.js, PostgreSQL.", bioRu: "Full-stack разработчик. React, Node.js, PostgreSQL.", hourlyRate: 120, yearsExp: 4, isVerified: true, isBoosted: false, avatarUrl: null, _count: { reviews: 8 }, avgRating: 4.6 },
  { id: "3", user: { name: "Artist Artistow" }, category: "EDUCATION", city: "TURKMENABAT", bio: "Matematika we fizika mugallymy. 10 ýyl tejribe.", bioRu: "Преподаватель математики и физики. 10 лет опыта.", hourlyRate: 40, yearsExp: 10, isVerified: false, isBoosted: false, avatarUrl: null, _count: { reviews: 25 }, avgRating: 5.0 },
  { id: "4", user: { name: "Pokgi Pokgiyew" }, category: "CONSTRUCTION", city: "MARY", bio: "Gurluşyk inženeri. Ýaşaýyş jaý we söwda desgalary.", bioRu: "Инженер строитель. Жилые и коммерческие объекты.", hourlyRate: 60, yearsExp: 8, isVerified: true, isBoosted: false, avatarUrl: null, _count: { reviews: 5 }, avgRating: 4.2 },
  { id: "5", user: { name: "Yalta Yaltayewa" }, category: "MEDICINE", city: "ASHGABAT", bio: "Kardiolog. Klinik işi we maslahat berme.", bioRu: "Кардиолог. Клиническая практика и консультации.", hourlyRate: 100, yearsExp: 12, isVerified: true, isBoosted: false, avatarUrl: null, _count: { reviews: 30 }, avgRating: 4.9 },
  { id: "6", user: { name: "Yatma Yatmayew" }, category: "ARCHITECTURE", city: "ASHGABAT", bio: "Arhitektor. Ýaşaýyş we täjirçilik taslamalary.", bioRu: "Архитектор. Жилые и коммерческие проекты.", hourlyRate: 90, yearsExp: 7, isVerified: false, isBoosted: true, avatarUrl: null, _count: { reviews: 9 }, avgRating: 4.5 },
];

function SearchInner() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<Locale>("tk");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const t = getT(locale);

  const filtered = useMemo(() => {
    let result = [...MOCK_PROFESSIONALS];
    if (query) result = result.filter((p) => p.user.name.toLowerCase().includes(query.toLowerCase()) || p.bio.toLowerCase().includes(query.toLowerCase()));
    if (category) result = result.filter((p) => p.category === category);
    if (city) result = result.filter((p) => p.city === city);
    if (sortBy === "rating") result.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
    if (sortBy === "reviews") result.sort((a, b) => (b._count?.reviews ?? 0) - (a._count?.reviews ?? 0));
    result.sort((a, b) => Number(b.isBoosted) - Number(a.isBoosted));
    return result;
  }, [query, category, city, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900">{t.search.title}</h1>
        <div className="flex gap-2">
          <button onClick={() => setLocale("tk")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "tk" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>TK</button>
          <button onClick={() => setLocale("ru")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "ru" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>RU</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0">
          <div className="card p-4 space-y-5">
            <h2 className="font-semibold text-sm text-gray-700">{t.search.filterBy}</h2>

            <div>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.hero.searchPlaceholder} className="input text-sm" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">{t.search.category}</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input text-sm">
                <option value="">— {t.search.category} —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{t.categories[c.toLowerCase() as keyof typeof t.categories]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">{t.search.city}</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="input text-sm">
                <option value="">— {t.search.city} —</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{t.cities[c.toLowerCase() as keyof typeof t.cities]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">{t.search.sortBy}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input text-sm">
                <option value="rating">{t.search.sortRating}</option>
                <option value="reviews">{t.search.sortReviews}</option>
                <option value="newest">{t.search.sortNewest}</option>
              </select>
            </div>

            {(category || city || query) && (
              <button onClick={() => { setCategory(""); setCity(""); setQuery(""); }} className="text-xs text-gray-400 hover:text-red-500 transition-colors w-full text-left">
                ✕ {t.common.cancel}
              </button>
            )}
          </div>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">{filtered.length} {t.search.results}</p>
          {filtered.length === 0 ? (
            <div className="card p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>{t.search.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((pro) => (
                <ProfessionalCard key={pro.id} professional={pro} t={t} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-gray-400">Ýüklenýär...</div>}>
      <SearchInner />
    </Suspense>
  );
}
