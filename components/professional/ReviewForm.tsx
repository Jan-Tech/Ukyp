"use client";

import { useState } from "react";
import { type Translations } from "@/lib/i18n";

type Props = {
  t: Translations;
  locale: "tk" | "ru";
  professionalId: string;
  onReviewAdded?: (review: any) => void;
};

export default function ReviewForm({ t, locale, professionalId, onReviewAdded }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professionalId, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? (locale === "tk" ? "Ýalňyşlyk" : "Ошибка"));
      } else {
        setSubmitted(true);
        onReviewAdded?.(data);
      }
    } catch {
      setError(locale === "tk" ? "Tor ýalňyşlygy" : "Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return (
    <div className="card p-6 text-center text-green-600 font-medium">✓ {t.review.success}</div>
  );

  return (
    <div className="card p-6 mt-4">
      <h3 className="font-semibold text-gray-800 mb-4">{t.review.title}</h3>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">{t.review.rating}</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}>
                <svg className={`w-7 h-7 transition-colors ${star <= (hovered || rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">{t.review.comment}</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t.review.commentPlaceholder} rows={3} className="input resize-none" />
        </div>
        <button type="submit" disabled={!rating || loading} className="btn-primary w-full py-2.5 flex items-center justify-center gap-2">
          {loading ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> : null}
          {t.review.submit}
        </button>
      </form>
    </div>
  );
}
