"use client";

import { useState } from "react";
import Image from "next/image";
import { type Locale, getT } from "@/lib/i18n";
import ReviewForm from "@/components/professional/ReviewForm";

// Placeholder data — replace with prisma fetch in production
const MOCK_PROFESSIONAL = {
  id: "1",
  user: { name: "Aýgül Meredowa", email: "ayg@example.com", phone: "+993 65 123456" },
  category: "DESIGN",
  city: "ASHGABAT",
  bio: "Grafik we UI/UX dizaýner. 6 ýyllyk tejribe. Web saýtlar, logotiplar, brendirleme.",
  bioRu: "Графический и UI/UX дизайнер. 6 лет опыта. Сайты, логотипы, брендинг.",
  hourlyRate: 80,
  yearsExp: 6,
  isVerified: true,
  isBoosted: false,
  skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
  skillsRu: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
  avatarUrl: null,
  portfolio: [
    { id: "p1", title: "Brend logotipi", titleRu: "Логотип бренда", imageUrl: null, description: "Gurluşyk kompaniýasy üçin logotip", descriptionRu: "Логотип для строительной компании" },
    { id: "p2", title: "Restoran saýty", titleRu: "Сайт ресторана", imageUrl: null, description: "Aşgabat restoranyna UI dizaýn", descriptionRu: "UI дизайн для ресторана в Ашхабаде" },
    { id: "p3", title: "Mobil applikasiýa", titleRu: "Мобильное приложение", imageUrl: null, description: "E-commerce mobil dizaýny", descriptionRu: "Мобильный дизайн e-commerce" },
  ],
  reviews: [
    { id: "r1", author: { name: "Merdan A." }, rating: 5, comment: "Gaty gowy iş! Wagtynda we hil bilen ýerine ýetirdi.", createdAt: "2026-04-10" },
    { id: "r2", author: { name: "Ogulgerek B." }, rating: 4, comment: "Professional we düşünjeli dizaýner.", createdAt: "2026-03-22" },
  ],
};

function StarRating({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => onChange?.(star) : undefined}
          onMouseEnter={interactive ? () => setHovered(star) : undefined}
          onMouseLeave={interactive ? () => setHovered(0) : undefined}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <svg className={`w-5 h-5 ${star <= (hovered || rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProfessionalProfilePage() {
  const [locale, setLocale] = useState<Locale>("tk");
  const [activeTab, setActiveTab] = useState<"about" | "portfolio" | "reviews">("about");
  const t = getT(locale);
  const p = MOCK_PROFESSIONAL;

  const avgRating = p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Language toggle */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setLocale("tk")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "tk" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>TK</button>
        <button onClick={() => setLocale("ru")} className={`px-3 py-1 rounded text-xs font-bold border ${locale === "ru" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>RU</button>
      </div>

      {/* Header card */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
            {p.avatarUrl ? (
              <Image src={p.avatarUrl} alt={p.user.name} width={96} height={96} className="object-cover" />
            ) : (
              <span className="text-4xl font-bold text-primary">{p.user.name.charAt(0)}</span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{p.user.name}</h1>
              {p.isVerified && (
                <span className="badge-verified">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {t.profile.verified}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-3 flex-wrap text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <StarRating rating={avgRating} />
                <span>{avgRating.toFixed(1)} ({p.reviews.length} {t.card.reviews})</span>
              </div>
              <span>📍 {p.city}</span>
              <span>⏱ {p.yearsExp} {t.profile.years} {t.profile.experience}</span>
              {p.hourlyRate && <span className="font-semibold text-primary">{p.hourlyRate} {t.card.perHour}</span>}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(locale === "ru" ? p.skillsRu : p.skills).map((skill) => (
                <span key={skill} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 shrink-0">
            <a href={`tel:${p.user.phone}`} className="btn-primary px-5 py-2 rounded-xl text-sm text-center">
              📞 {t.profile.contact}
            </a>
            <a href={`mailto:${p.user.email}`} className="btn-secondary px-5 py-2 rounded-xl text-sm text-center">
              ✉️ Email
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 gap-1">
        {(["about", "portfolio", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {t.profile[tab]}
            {tab === "reviews" && ` (${p.reviews.length})`}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "about" && (
        <div className="card p-6">
          <h2 className="font-semibold text-gray-800 mb-3">{t.profile.about}</h2>
          <p className="text-gray-600 leading-relaxed">
            {locale === "ru" ? p.bioRu : p.bio}
          </p>
        </div>
      )}

      {activeTab === "portfolio" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {p.portfolio.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 h-40 flex items-center justify-center">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.title} width={300} height={160} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-4xl">🎨</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900">{locale === "ru" ? item.titleRu : item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{locale === "ru" ? item.descriptionRu : item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {p.reviews.length === 0 ? (
            <div className="card p-8 text-center text-gray-400">{t.profile.noReviews}</div>
          ) : (
            p.reviews.map((r) => (
              <div key={r.id} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {r.author.name.charAt(0)}
                    </div>
                    <span className="font-medium text-sm">{r.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={r.rating} />
                    <span className="text-xs text-gray-400">{r.createdAt}</span>
                  </div>
                </div>
                {r.comment && <p className="text-sm text-gray-600 mt-2">{r.comment}</p>}
              </div>
            ))
          )}

          <ReviewForm t={t} locale={locale} professionalId={p.id} />
        </div>
      )}
    </div>
  );
}
