import Link from "next/link";
import Image from "next/image";
import { type Translations } from "@/lib/i18n";

type Props = {
  professional: {
    id: string;
    user: { name: string };
    avatarUrl?: string | null;
    category: string;
    city: string;
    bio?: string | null;
    bioRu?: string | null;
    hourlyRate?: number | null;
    isVerified: boolean;
    isBoosted: boolean;
    yearsExp: number;
    _count?: { reviews: number };
    avgRating?: number | null;
  };
  t: Translations;
  locale: "tk" | "ru";
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProfessionalCard({ professional: p, t, locale }: Props) {
  return (
    <div className={`card flex flex-col hover:shadow-md transition-shadow ${p.isBoosted ? "ring-2 ring-accent/40" : ""}`}>
      {p.isBoosted && (
        <div className="bg-accent/10 px-3 py-1 flex items-center gap-1">
          <span className="text-xs">⭐</span>
          <span className="text-xs font-semibold text-amber-700">{t.card.boosted}</span>
        </div>
      )}

      <div className="p-4 flex gap-3 flex-1">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
          {p.avatarUrl ? (
            <Image src={p.avatarUrl} alt={p.user.name} width={56} height={56} className="object-cover w-full h-full" />
          ) : (
            <span className="text-xl font-bold text-primary">{p.user.name.charAt(0)}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{p.user.name}</h3>
            {p.isVerified && (
              <span className="badge-verified">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {t.card.verified}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {p.avgRating != null && (
              <div className="flex items-center gap-1">
                <StarRating rating={p.avgRating} />
                <span className="text-xs text-gray-500">
                  {p.avgRating.toFixed(1)} ({p._count?.reviews ?? 0} {t.card.reviews})
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {locale === "ru" ? (p.bioRu ?? p.bio) : p.bio}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between gap-2 border-t border-gray-50 pt-3 mt-auto">
        <div className="text-xs text-gray-500">
          📍 {p.city} &middot; {p.yearsExp} {t.profile.years}
          {p.hourlyRate && <span className="ml-2 font-semibold text-primary">{p.hourlyRate} {t.card.perHour}</span>}
        </div>
        <Link href={`/professionals/${p.id}`} className="btn-primary text-xs py-1.5 px-3 rounded-lg shrink-0">
          {t.card.viewProfile}
        </Link>
      </div>
    </div>
  );
}
