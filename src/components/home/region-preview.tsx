"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedRegionSpot } from "@/lib/data/content";
import { AnimatedSection, StaggerContainer, staggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function RegionPreview({ spots }: { spots: LocalizedRegionSpot[] }) {
  const t = useTranslations("region");
  const tc = useTranslations("common");

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <AnimatedSection className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone">{t("sectionLabel")}</p>
            <h2 className="mt-3 font-serif text-3xl text-forest md:text-5xl">{t("title")}</h2>
            <p className="mt-4 max-w-xl text-stone">{t("subtitle")}</p>
          </div>
          <Button href="/region" variant="ghost">{tc("exploreRegion")}</Button>
        </AnimatedSection>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spots.slice(0, 3).map((spot) => (
            <motion.div key={spot.key} variants={staggerItem}>
              <Link
                href="/region"
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-xs text-gold-light">
                      <MapPin className="h-3 w-3" />
                      {spot.distance}
                    </div>
                    <h3 className="mt-1 font-serif text-xl text-cream">{spot.name}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function RegionGrid({ spots, showImages = false }: { spots: LocalizedRegionSpot[]; showImages?: boolean }) {
  const t = useTranslations("region");
  const tc = useTranslations("common");

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone">{t("sectionLabel")}</p>
          <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-4 text-stone">{t("pageSubtitle")}</p>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <motion.div
              key={spot.key}
              variants={staggerItem}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {showImages ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
              ) : (
                <ImagePlaceholder
                  label={tc("photoPlaceholder")}
                  aspectClassName="aspect-[16/10]"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gold">
                  <MapPin className="h-4 w-4" />
                  {spot.distance}
                </div>
                <h3 className="mt-2 font-serif text-xl text-forest">{spot.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{spot.description}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <AnimatedSection className="mt-16 rounded-2xl bg-forest p-8 text-cream md:p-12">
          <h2 className="font-serif text-2xl md:text-3xl">{t("onDomain")}</h2>
          <p className="mt-4 max-w-2xl text-cream/70 leading-relaxed">{t("onDomainText")}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
