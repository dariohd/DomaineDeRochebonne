"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    const subjectType = data.get("subject-type") as string;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Adresse email invalide.");
      return;
    }
    const body = encodeURIComponent(
      `Contact - ${name} (${subjectType})\nNom: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.open(`${siteConfig.whatsapp}?text=${body}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section className="section-padding bg-cream pt-32">
      <div className="container-wide">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone">{tc("contactUs")}</p>
          <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-stone">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <AnimatedSection className="lg:col-span-2" direction="left">
            <div className="space-y-8">
              <div className="rounded-2xl bg-forest p-8 text-cream">
                <h2 className="font-serif text-2xl">{t("hostsTitle")}</h2>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed">{t("hostsText")}</p>
              </div>

              <div className="space-y-6">
                {[
                  { label: tc("firstName"), phone: siteConfig.phone },
                  { label: tc("lastName"), phone: siteConfig.phoneSecondary },
                ].map((item) => (
                  <a
                    key={item.phone}
                    href={`tel:${item.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-4 rounded-xl border border-forest/5 bg-white p-5 transition-all hover:border-gold/30 hover:shadow-lg"
                  >
                    <div className="rounded-lg bg-gold/10 p-3">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-stone">{item.label}</p>
                      <p className="font-medium text-forest">{item.phone}</p>
                    </div>
                  </a>
                ))}

                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-forest/5 bg-white p-5 transition-all hover:border-gold/30 hover:shadow-lg"
                >
                  <div className="rounded-lg bg-gold/10 p-3">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-stone">WhatsApp</p>
                    <p className="font-medium text-forest">{siteConfig.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-xl border border-forest/5 bg-white p-5">
                  <div className="rounded-lg bg-gold/10 p-3">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-stone">{tc("address")}</p>
                    <p className="font-medium text-forest">
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.zip} {siteConfig.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-3" direction="right" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-forest/5 bg-white p-8 shadow-xl shadow-forest/5 md:p-10"
            >
              <h2 className="font-serif text-2xl text-forest">{t("formTitle")}</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 rounded-xl bg-forest/5 p-6 text-center"
                >
                  <p className="text-forest">{t("formSent")}</p>
                </motion.div>
              ) : (
                <div className="mt-8 space-y-5">
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
                    <label htmlFor="subject-type" className="mb-2 block text-sm text-stone">{tc("subject")}</label>
                    <select id="subject-type" name="subject-type" className="w-full rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                      <option value="reservation">{tc("subjectReservation")}</option>
                      <option value="groupe">{tc("subjectGroup")}</option>
                      <option value="evenement">{tc("subjectEvent")}</option>
                      <option value="autre">{tc("subjectOther")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm text-stone">{tc("message")}</label>
                    <textarea id="message" name="message" required rows={5} className="w-full resize-none rounded-xl border border-forest/10 bg-cream/50 px-4 py-3 text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    {tc("sendMessage")}
                  </Button>
                </div>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
