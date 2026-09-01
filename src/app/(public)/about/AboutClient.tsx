'use client';

import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Building2,
  Users,
  Layers,
  Shirt,
  Scissors,
  Eye,
  Target,
  Crown,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutClient({ settings }: { settings: any }) {
  const { t } = useLanguage();
  const brandName = settings?.brandName || process.env.NEXT_PUBLIC_STORE_NAME || 'Store';

  const fabricTypes = [
    {
      name: t('about.fabric.cotton.name') as string || 'Pure Cotton & Lawn',
      desc: t('about.fabric.cotton.desc') as string || 'Ultra-soft, breathable, and skin-friendly natural cotton tailored for all-day comfort in tropical weather.',
      grade: t('about.fabric.cotton.grade') as string || 'Daily Elegance',
    },
    {
      name: t('about.fabric.silk.name') as string || 'Pure Silk, Georgette & Organza',
      desc: t('about.fabric.silk.desc') as string || 'Opulent drape, lustrous sheen, and delicate textures crafted for statement party wear and festive events.',
      grade: t('about.fabric.silk.grade') as string || 'Luxury Festive',
    },
    {
      name: t('about.fabric.muslin.name') as string || 'Dhakai Muslin & Chiffon',
      desc: t('about.fabric.muslin.desc') as string || 'Featherlight, ethereal hand-feel providing effortless elegance and royal heritage appeal.',
      grade: t('about.fabric.muslin.grade') as string || 'Heritage Royal',
    },
    {
      name: t('about.fabric.linen.name') as string || 'Premium Linen & Khadi',
      desc: t('about.fabric.linen.desc') as string || 'Naturally cooling, textured weaves ideal for modern minimalist kurtis and sophisticated workwear.',
      grade: t('about.fabric.linen.grade') as string || 'Minimal Chic',
    },
    {
      name: t('about.fabric.viscose.name') as string || 'Viscose & Modal Satin',
      desc: t('about.fabric.viscose.desc') as string || 'Silky smooth with fluid movement, perfect for contemporary fusion dresses and chic co-ords.',
      grade: t('about.fabric.viscose.grade') as string || 'Contemporary Glam',
    },
    {
      name: t('about.fabric.velvet.name') as string || 'Micro-Velvet & Jamdani Weave',
      desc: t('about.fabric.velvet.desc') as string || 'Plush, opulent, and enriched with hand-embroidered artisanal motifs for winter and wedding occasions.',
      grade: t('about.fabric.velvet.grade') as string || 'Haute Couture',
    },
  ];

  const clothingCategories = [
    { name: t('about.clothing.threepiece.name') as string || 'Designer Three-Piece & Salwar Kameez', desc: t('about.clothing.threepiece.desc') as string || 'Intricate embroidery, digital prints, and matching chiffon/organza dupattas.' },
    { name: t('about.clothing.kurtis.name') as string || 'Single Kurtis & Tunics', desc: t('about.clothing.kurtis.desc') as string || 'Trendy cuts, contemporary prints, and smart silhouettes for work and casual outings.' },
    { name: t('about.clothing.sarees.name') as string || 'Exclusive Sarees', desc: t('about.clothing.sarees.desc') as string || 'Jamdani, Silk, Georgette, Organza, and festive party sarees for timeless grace.' },
    { name: t('about.clothing.partywear.name') as string || 'Party Gowns & Lehengas', desc: t('about.clothing.partywear.desc') as string || 'Glamorous silhouettes with zardozi, sequins, and handcrafted detailing.' },
    { name: t('about.clothing.coords.name') as string || 'Co-Ord Sets & Fusion Wear', desc: t('about.clothing.coords.desc') as string || 'Modern two-piece matched sets, crop tops, and palazzo combinations.' },
    { name: t('about.clothing.abayas.name') as string || 'Modest Wear & Abayas', desc: t('about.clothing.abayas.desc') as string || 'Elegant abayas, borkhas, and premium chiffon hijabs with sophisticated cuts.' },
    { name: t('about.clothing.western.name') as string || 'Tops, Shirts & Dresses', desc: t('about.clothing.western.desc') as string || 'Chic Western wear, casual tops, midi dresses, and denim designed for modern women.' },
    { name: t('about.clothing.bottoms.name') as string || 'Pants, Palazzos & Skirts', desc: t('about.clothing.bottoms.desc') as string || 'Cigarette pants, tulip pants, flowy palazzos, and tailored culottes.' },
    { name: t('about.clothing.sleepwear.name') as string || 'Nightwear & Loungewear', desc: t('about.clothing.sleepwear.desc') as string || 'Comfortable satin and cotton nightsuits, kaftans, and loungewear.' },
    { name: t('about.clothing.custom.name') as string || 'Bridal & Custom Tailoring', desc: t('about.clothing.custom.desc') as string || 'Bespoke bridal outfits, customized fitting, and bulk festive orders.' },
  ];

  const coreValues = [
    {
      icon: Crown,
      title: t('about.values.sourcing.title') as string || 'Finest Fabric Sourcing',
      desc: t('about.values.sourcing.desc') as string || 'We handpick pure cotton, rich silks, and breathable linens, ensuring every piece feels luxurious against the skin.',
    },
    {
      icon: Scissors,
      title: t('about.values.craftsmanship.title') as string || 'Exquisite Craftsmanship',
      desc: t('about.values.craftsmanship.desc') as string || 'From intricate hand-embroidery to precision digital printing, our master artisans craft each piece with utmost care.',
    },
    {
      icon: ShieldCheck,
      title: t('about.values.quality.title') as string || 'Perfect Fit & Quality',
      desc: t('about.values.quality.desc') as string || 'Garments tailored to flatter diverse silhouettes with strict colorfastness and stitch durability standards.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent py-20 md:py-32 border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            <Shirt className="h-3 w-3" /> {t('about.hero.badge') as string || 'Bangladesh\'s Premier Women\'s Fashion & Lifestyle Brand'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
            {t('about.hero.title_start') as string || 'About'} <span className="text-primary">{brandName}</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t('about.hero.desc_start') as string || 'Celebrating womanhood and timeless grace through exquisite ethnic elegance and modern chic fashion — '}{' '}
            <strong className="text-primary">{brandName}</strong> {t('about.hero.desc_end') as string || 'offers curated collections of three-pieces, kurtis, sarees, modest wear, and party collections crafted for the modern woman.'}
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 bg-card/30 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10+', label: t('about.stats.years') as string || 'Years in Garments & Fashion' },
              { value: '500K+', label: t('about.stats.produced') as string || 'Garments Produced' },
              { value: '64', label: t('about.stats.districts') as string || 'Districts Delivery Coverage' },
              { value: '100%', label: t('about.stats.cotton') as string || 'Quality & Comfort Guarantee' },
            ].map((s) => (
              <div key={s.label} className="p-4 space-y-1">
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story & Mission ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t('about.story.title1') as string || 'The Art of Fashion.'} <br />
                <span className="text-primary">{t('about.story.title2') as string || 'The Comfort of Quality.'}</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                <strong>{brandName}</strong> {t('about.story.p1') as string || 'was founded with a simple yet passionate vision: to offer modern, high-grade apparel that looks sharp, feels luxurious, and stands the test of time. We bridge the gap between global fashion trends and everyday affordability.'}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t('about.story.p2') as string || 'From thoughtfully selected yarns and comfortable cuts to precision stitching and contemporary finishes, each collection is created to celebrate individuality. Whether you are dressing for work, leisure, or special occasions, we ensure you always step out in style.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t('about.mission.title') as string || 'Our Mission'}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t('about.mission.desc') as string || 'To empower fashion lovers with premium-grade apparel, ethical craftsmanship, and accessible lifestyle choices.'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t('about.vision.title') as string || 'Our Vision'}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t('about.vision.desc') as string || 'To be Bangladesh\'s most iconic and trusted apparel brand, renowned for uncompromising fabric quality and timeless aesthetics.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote panel */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary-foreground/30 p-1 shadow-2xl">
              <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative flex flex-col justify-end p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_10%,transparent_10.1%)] bg-[length:20px_20px]" />
                <div className="relative z-20 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md self-start inline-block">
                    {t('about.promise.badge') as string || 'Our Promise'}
                  </span>
                  <blockquote className="text-lg md:text-xl font-bold leading-relaxed italic">
                    &quot;{t('about.promise.quote') as string || 'Style is a way to say who you are without having to speak. We craft garments that speak quality.'}&quot;
                  </blockquote>
                  <p className="text-xs text-slate-300 font-medium">— {t('about.promise.team') as string || 'The'} {brandName} {t('about.promise.team2') as string || 'Team'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 md:py-24 bg-primary/5 border-t border-b border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{t('about.values.title') as string || `Why Choose ${brandName}?`}</h2>
            <p className="text-muted-foreground text-sm">
              {t('about.values.desc') as string || `Three core pillars that ensure every ${brandName} piece delivers effortless comfort and standout style.`}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="bg-background p-8 rounded-2xl border shadow-sm space-y-4 text-center flex flex-col items-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-[280px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fabrics Section ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" /> {t('about.fabrics.badge') as string || 'Our Premium Fabrics'}
            </span>
            <h2 className="text-3xl font-bold tracking-tight">{t('about.fabrics.title') as string || 'Fabrics Engineered for Comfort'}</h2>
            <p className="text-muted-foreground text-sm">
              {t('about.fabrics.desc') as string || 'We source and blend only the highest grade natural and performance fabrics to provide superior breathability and a luxurious hand-feel.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fabricTypes.map((f) => (
              <div
                key={f.name}
                className="relative rounded-2xl border bg-card p-6 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Shirt className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    {f.grade}
                  </span>
                </div>
                <h3 className="font-bold text-base text-foreground">{f.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Categories ── */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Layers className="h-3 w-3" /> {t('about.wardrobe.badge') as string || 'Apparel Collections'}
            </span>
            <h2 className="text-3xl font-bold tracking-tight">{t('about.wardrobe.title') as string || 'Comprehensive Wardrobe Essentials'}</h2>
            <p className="text-muted-foreground text-sm">
              {t('about.wardrobe.desc') as string || 'From casual everyday staples to sophisticated formal wear — explore the diversity of our modern collections.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {clothingCategories.map((c) => (
              <div
                key={c.name}
                className="bg-background rounded-2xl border p-5 space-y-2 hover:shadow-md hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shirt className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm text-foreground leading-tight">{c.name}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nationwide Delivery & Service ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border bg-card p-8 space-y-4 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">{t('about.experience.title') as string || 'Showrooms & Flagship Stores'}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong>{brandName}</strong> {t('about.experience.desc') as string || 'invites you to experience our full collections in person. Feel our fabrics, test the fit, and receive personalized style guidance from our fashion specialists.'}
              </p>
              <Link href="/contact" passHref>
                <Button variant="outline" size="sm" className="rounded-full mt-2">
                  {t('about.experience.btn') as string || 'Store Locator & Contact'}
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl border bg-card p-8 space-y-4 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <HeartHandshake className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">{t('about.wholesale.title') as string || 'Bulk & Custom Orders'}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('about.wholesale.desc') as string || 'Looking for custom company uniforms, institutional merchandise, or private label manufacturing? We provide premium OEM/ODM solutions at wholesale scale.'}
              </p>
              <Link href="/contact" passHref>
                <Button variant="outline" size="sm" className="rounded-full mt-2">
                  {t('about.wholesale.btn') as string || 'Inquire for Bulk Orders'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Highlights ── */}
      <section className="py-12 bg-primary/5 border-t border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: '50K+', label: t('about.highlights.customers') as string || 'Happy Customers' },
              { icon: Shirt, value: '1,000+', label: t('about.highlights.designs') as string || 'Unique Designs' },
              { icon: Star, value: '4.9/5', label: t('about.highlights.rating') as string || 'Customer Satisfaction' },
              { icon: ShieldCheck, value: '100%', label: t('about.highlights.returns') as string || 'Authentic & Verified' },
            ].map((s) => (
              <div key={s.label} className="p-4 space-y-2 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology Partner ── */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-y border-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15)_1px,transparent_1px)] bg-[length:16px_16px]" />
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
            <span>{t('about.tech.badge') as string || 'Technology Partner'}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            {t('about.tech.title') as string || 'Crafted by Jia Pixel'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {t('about.tech.desc_start') as string || 'This high-performance e-commerce platform is designed, built, and optimized by'}{' '}
            <a
              href="https://www.jiapixel.com"
              target="_blank"
              rel="noopener"
              className="text-primary font-semibold hover:underline transition-all"
            >
              Jia Pixel
            </a>
            , {t('about.tech.desc_mid') as string || 'the Leading Digital Agency In Bangladesh — delivering next-generation digital retail experiences for iconic brands like'} <strong>{brandName}</strong>.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            {t('about.cta.title_start') as string || 'Elevate Your Style with'} <span className="text-primary">{brandName}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            {t('about.cta.desc') as string || 'Explore our latest collections and find the perfect wardrobe additions that match your personality.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/shop" passHref>
              <Button
                size="lg"
                className="rounded-full px-8 py-6 font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {t('about.cta.browse') as string || 'Shop Latest Collection'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 font-bold text-sm transition-all hover:bg-muted/50"
              >
                {t('about.cta.contact') as string || 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
