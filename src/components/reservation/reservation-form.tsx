"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Calendar, Send } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { accommodationMeta } from "@/lib/data/content";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

export default function ReservationForm() {
  const t = useTranslations("reservation");
  const tc = useTranslations("common");
  const ta = useTranslations("accommodations");
  const searchParams = useSearchParams();
  const preselected = searchParams.get("hebergement") ?? "";
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const accommodation = data.get("accommodation") as string;
    const arrival = data.get("arrival") as string;
    const departure = data.get("departure") as string;
    const guests = data.get("guests") as string;
    const message = data.get("message") as string;

    if (arrival && departure && departure <= arrival) {
      alert("La date de départ doit être après l'arrivée.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Adresse email invalide.");
      return;
    }

    const body = encodeURIComponent(
      `Réservation - ${name}\nNom: ${name}\nEmail: ${email}\nHébergement: ${accommodation}\nArrivée: ${arrival}\nDépart: ${departure}\nPersonnes: ${guests}\n\n${message}`,
    );
    window.open(`${siteConfig.whatsapp}?text=${body}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section className="section-padding min-h-[80vh] bg-cream pt-32">
      <div className="container-wide">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone">{tc("onlineBooking")}</p>
          <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-stone">{t("subtitle")}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-2xl border border-forest/5 bg-white p-8 shadow-xl shadow-forest/5 md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                <Calendar className="h-7 w-7 text-gold" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-forest">{t("cardTitle")}</h2>
                <p className="text-sm text-stone">{t("cardText")}</p>
              </div>
            </div>

            <p className="mb-6 text-sm text-stone">{t("formIntro")}</p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-forest/5 p-6 text-center"
              >
                <p className="text-forest">{tc("sentConfirmation")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-stone">{tc("name")}</label>
                    <input id="name" name="name" required className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-stone">Email</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                  </div>
                </div>

                <div>
                  <label htmlFor="accommodation" className="mb-2 block text-sm text-stone">{t("accommodationLabel")}</label>
                  <select
                    id="accommodation"
                    name="accommodation"
                    defaultValue={preselected}
                    required
                    className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  >
                    <option value="" disabled>{t("accommodationLabel")}</option>
                    {accommodationMeta.map((acc) => (
                      <option key={acc.slug} value={acc.slug}>
                        {ta(`${acc.slug}.shortName`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="arrival" className="mb-2 block text-sm text-stone">{t("arrivalLabel")}</label>
                    <input id="arrival" name="arrival" type="date" required className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                  </div>
                  <div>
                    <label htmlFor="departure" className="mb-2 block text-sm text-stone">{t("departureLabel")}</label>
                    <input id="departure" name="departure" type="date" required className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="mb-2 block text-sm text-stone">{t("guestsLabel")}</label>
                  <input id="guests" name="guests" type="number" min={1} max={68} required className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-stone">{tc("message")}</label>
                  <textarea id="message" name="message" rows={4} className="w-full resize-none rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" />
                  {t("submitRequest")}
                </Button>
              </form>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mx-auto mt-8 max-w-2xl text-center text-sm text-stone">
          <p>
            {t("preferPhone")}{" "}
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-forest underline">
              {siteConfig.phone}
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
