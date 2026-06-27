import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { FeaturesGrid } from "@/components/home/highlights";
import { CtaSection } from "@/components/home/about-preview";
import { getLocalizedHighlights } from "@/lib/data/content";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "discover" });
  return {
    title: t("heroTitle"),
    description: t("section1p1"),
  };
}

export default async function DecouvrirPage() {
  const t = await getTranslations("discover");
  const tc = await getTranslations("common");
  const highlights = await getLocalizedHighlights();

  return (
    <>
      <section className="relative flex min-h-[50vh] items-end pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://l.icdbcdn.com/oh/ef3765af-d04f-4097-ad51-91253d1c80b5.jpg?w=1600"
            alt="Domaine de Rochebonne"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="image-overlay absolute inset-0" />
        </div>
        <div className="section-padding relative container-wide pb-16">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-gold-light">{t("heroLabel")}</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl text-cream md:text-6xl">{t("heroTitle")}</h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">{t("section1Title")}</h2>
              <div className="mt-6 space-y-4 text-stone leading-relaxed">
                <p>{t("section1p1")}</p>
                <p>{t("section1p2")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="right">
              <ImagePlaceholder label={tc("photoPlaceholder")} rounded="2xl" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FeaturesGrid items={highlights} />

      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <ImagePlaceholder label={tc("photoPlaceholder")} rounded="2xl" />
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">{t("facilitiesTitle")}</h2>
              <div className="mt-6 space-y-4 text-stone leading-relaxed">
                <p>{t("facilitiesp1")}</p>
                <p>{t("facilitiesp2")}</p>
                <p>{t("facilitiesp3")}</p>
              </div>
              <Button href="/region" className="mt-8">{tc("exploreRegion")}</Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{t("hostsTitle")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-stone leading-relaxed">{t("hostsText")}</p>
            <Button href="/contact" variant="ghost" className="mt-8">{tc("contactUs")}</Button>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
