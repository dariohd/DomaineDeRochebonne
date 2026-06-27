import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Users, Bed, Droplets, Check } from "lucide-react";
import {
  accommodationMeta,
  getLocalizedAccommodation,
} from "@/lib/data/content";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return accommodationMeta.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const acc = await getLocalizedAccommodation(slug);
  if (!acc) return { title: "404" };
  return {
    title: acc.name,
    description: acc.description,
  };
}

export default async function AccommodationPage({ params }: Props) {
  const { slug } = await params;
  const acc = await getLocalizedAccommodation(slug);
  const t = await getTranslations("common");

  if (!acc) notFound();

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={acc.image}
          alt={acc.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="image-overlay absolute inset-0" />
        <div className="relative z-10 flex h-full items-end pb-12 pt-32">
          <div className="container-wide px-6 md:px-10 lg:px-16">
            <AnimatedSection>
              {acc.featured && (
                <span className="mb-4 inline-block rounded-full bg-gold px-4 py-1 text-sm font-medium text-forest">
                  {t("featured")}
                </span>
              )}
              <h1 className="max-w-3xl font-serif text-4xl text-cream md:text-6xl">
                {acc.name}
              </h1>
              <div className="mt-6 flex flex-wrap gap-6 text-cream/80">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {acc.guests} {t("persons")}
                </span>
                <span className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  {acc.bedrooms} {t("bedrooms")}
                </span>
                {acc.privatePool && (
                  <span className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    {t("privatePool")}
                  </span>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-serif text-2xl text-forest md:text-3xl">
                  {t("description")}
                </h2>
                <p className="mt-4 text-stone leading-relaxed">{acc.description}</p>

                <h3 className="mt-10 font-serif text-xl text-forest">{t("highlights")}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {acc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-stone">
                      <Check className="h-5 w-5 shrink-0 text-gold" />
                      {h}
                    </li>
                  ))}
                </ul>

                {acc.images.length > 1 && (
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {acc.images.slice(1).map((img) => (
                      <ImagePlaceholder
                        key={img}
                        label={t("photoPlaceholder")}
                        rounded="xl"
                      />
                    ))}
                  </div>
                )}
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection delay={0.2}>
                <div className="sticky top-28 rounded-2xl border border-forest/5 bg-white p-8 shadow-xl shadow-forest/5">
                  <p className="text-sm text-stone">{t("from")}</p>
                  <p className="font-serif text-3xl text-forest">{t("onRequest")}</p>
                  <p className="mt-1 text-sm text-stone">{t("seasonalRates")}</p>
                  <div className="mt-6 space-y-3">
                    <Button href={`/reservation?hebergement=${acc.slug}`} className="w-full" size="lg">
                      {t("bookNow")}
                    </Button>
                    <Button href="/contact" variant="ghost" className="w-full">
                      {t("requestQuote")}
                    </Button>
                  </div>
                  <div className="mt-8 space-y-3 border-t border-forest/5 pt-6 text-sm text-stone">
                    <p>{t("checkIn")} 15h</p>
                    <p>{t("checkOut")} 10h</p>
                    <p>{t("petsAllowed")}</p>
                    <p>{t("freeWifi")}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
