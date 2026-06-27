"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, Bed, ArrowUpRight, Droplets } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedAccommodation } from "@/lib/data/content";
import { AnimatedSection, StaggerContainer, staggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type Props = {
  items: LocalizedAccommodation[];
  showAll?: boolean;
  showImages?: boolean;
};

export function AccommodationsGrid({ items, showAll = false, showImages = true }: Props) {
  const t = useTranslations("accommodations");
  const tc = useTranslations("common");

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-wide">
        {!showAll && (
          <AnimatedSection className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone">{t("sectionLabel")}</p>
              <h2 className="mt-3 font-serif text-3xl text-forest md:text-5xl">{t("title")}</h2>
              <p className="mt-4 max-w-xl text-stone">{t("subtitle")}</p>
            </div>
            <Button href="/hebergements" variant="ghost" className="shrink-0">
              {tc("seeAll")}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </AnimatedSection>
        )}

        {showAll && (
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-stone">{t("sectionLabel")}</p>
            <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">{t("pageTitle")}</h1>
            <p className="mt-4 text-stone">{t("pageSubtitle")}</p>
          </AnimatedSection>
        )}

        <StaggerContainer className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showAll ? "mt-16" : "mt-12"}`}>
          {items.map((acc) => (
            <motion.div key={acc.slug} variants={staggerItem}>
              <Link
                href={`/hebergements/${acc.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10"
              >
                {showImages ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={acc.image}
                      alt={acc.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {acc.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-medium text-forest">
                        {tc("featured")}
                      </span>
                    )}
                    {acc.privatePool && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-forest backdrop-blur-sm">
                        <Droplets className="h-3 w-3" />
                        {tc("privatePool")}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <ImagePlaceholder label={tc("photoPlaceholder")} />
                    {acc.featured && (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-medium text-forest">
                        {tc("featured")}
                      </span>
                    )}
                    {acc.privatePool && (
                      <span className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-forest backdrop-blur-sm">
                        <Droplets className="h-3 w-3" />
                        {tc("privatePool")}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-forest">{acc.shortName}</h3>
                  <div className="mt-3 flex items-center gap-4 text-sm text-stone">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {acc.guests} {tc("pers")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="h-4 w-4" />
                      {acc.bedrooms} {tc("ch")}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone/80">
                    {acc.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
