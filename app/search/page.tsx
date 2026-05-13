"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { type Locale, getT } from "@/lib/i18n";
import ProfessionalCard from "@/components/professional/ProfessionalCard";

const CATEGORIES = ["IT", "DESIGN", "ARCHITECTURE", "CONSTRUCTION", "EDUCATION", "MEDICINE", "LAW", "FINANCE", "BEAUTY", "OTHER"] as const;
const CITIES = ["ASHGABAT", "TURKMENABAT", "DASHOGUZ", "MARY", "BALKANABAT", "TURKMENBASHI"] as const;

function SearchInner() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<Locale>("tk");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = getT(locale);

  const fetchProfessionals = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category) params.set("category", category);
      if (city) params.set("city", city);
      params.set("sort", sortBy);
      const res = await fetch(`/api/professionals?${params}`);
      const data = await res.json();
      setProfessionals(Array.isArray(data) ? data : []);
    } catch {
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  }, [query, category, city, sortBy]);

  useEffect(() => {
    const timer = setTimeout(fetchProfessionals, 300);
    return () => clearTimeout(timer);
  }, [fetchProfessionals]);

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
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.hero.searchPlaceholder} className="input text-sm" />
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">{t.search.category}</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input text-sm">
                <option value="">— {t.search.category} —</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{t.categories[c.toLowerCase() as keyof typeof t.categories]}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">{t.search.city}</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="input text-sm">
                <option value="">— {t.search.city} —</option>
                {CITIES.map((c) => <option key={c} value={c}>{t.cities[c.toLowerCase() as keyof typeof t.cities]}</option>)}
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
              <button onClick={() => { setCategory(""); setCity(""); setQuery(""); }} className="text-xs text-gray-400 hover:text-red-500 transition-colors">✕ {t.common.cancel}</button>
            )}
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="card h-40 animate-pulse bg-gray-100" />)}
            </div>
          ) : professionals.length === 0 ? (
            <div className="card p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>{t.search.noResults}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{professionals.length} {t.search.results}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionals.map((pro) => <ProfessionalCard key={pro.id} professional={pro} t={t} locale={locale} />)}
              </div>
            </>
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
