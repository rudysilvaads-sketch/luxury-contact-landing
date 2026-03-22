import { useEffect, useRef, useState } from "react";
import { MessageCircle, Instagram, ChevronDown, Star, Sparkles, Phone, MapPin, Clock, Shield, Truck, Award, HeartHandshake } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import GoldParticles from "@/components/GoldParticles";
import heroBg from "@/assets/hero-bg.jpg";
import logoLgs from "@/assets/logo-lgs.png";
import imgSalvo from "@/assets/perfume-salvo-bg.jpg";
import imgNo2Men from "@/assets/perfume-no2men-bg.jpg";
import imgLeonie from "@/assets/perfume-leonie-bg.jpg";
import imgAsad from "@/assets/perfume-asad-bg.jpg";
import imgVivacite from "@/assets/perfume-vivacite-bg.jpg";
import imgComo from "@/assets/como-moiselle-bg2.jpg";
import imgYara from "@/assets/perfume-yara-bg.jpg";
import imgFakhar from "@/assets/perfume-fakhar-bg.jpg";
import imgVictorioso from "@/assets/perfume-victorioso-bg.jpg";
import imgAttar from "@/assets/perfume-attar-bg.jpg";
import imgSabah from "@/assets/sabah-al-ward-bg.jpg";
import { Helmet } from "react-helmet-async";

const WHATSAPP_NUMBER = "5511988742967";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de ver o catálogo completo de perfumes.")}`;

const products = [
  {
    name: "Salvo",
    brand: "Maison Alhambra",
    image: imgSalvo,
    category: "Oriental Fougère",
    gender: "masculino" as const,
    topNotes: "Bergamota",
    heartNotes: "Lavanda, Pimenta de Szechuan, Anis Estrelado e Noz-moscada",
    baseNotes: "Ambroxan e Baunilha",
    pricePix: "R$ 205,00",
    stock: 4,
    priceCredit: "R$ 227,55",
    inspiration: "Sauvage",
    accords: [
      { name: "fresco especiado", color: "#7cb87a" },
      { name: "cítrico", color: "#d4c36a" },
      { name: "lavanda", color: "#a890c4" },
      { name: "âmbar", color: "#d4a04a" },
      { name: "aromático", color: "#8cb87a" },
    ],
  },
  {
    name: "No. 2 Men",
    brand: "Maison Alhambra",
    image: imgNo2Men,
    category: "Aromático Masculino",
    gender: "masculino" as const,
    topNotes: "Bergamota e Lavanda",
    heartNotes: "Gengibre e Cardamomo",
    baseNotes: "Vetiver, Incenso, Almíscar, Sândalo, Ládano e Madeira Guaiac",
    pricePix: "R$ 200,00",
    priceCredit: "R$ 222,00",
    inspiration: "212 VIP",
    accords: [
      { name: "fresco especiado", color: "#7cb87a" },
      { name: "cítrico", color: "#d4c36a" },
      { name: "aromático", color: "#8cb87a" },
      { name: "amadeirado", color: "#b8956a" },
      { name: "lavanda", color: "#a890c4" },
    ],
  },
  {
    name: "Léonie",
    brand: "Maison Alhambra",
    image: imgLeonie,
    category: "Floral",
    gender: "feminino" as const,
    topNotes: "Lavanda, Mandarina, Petitgrain e Groselha Preta",
    heartNotes: "Flor de Laranjeira, Lavanda e Jasmim",
    baseNotes: "Almíscar, Baunilha, Cedro e Âmbar Cinzento",
    pricePix: "R$ 200,00",
    priceCredit: "R$ 222,00",
    accords: [
      { name: "floral branco", color: "#d8ccb0" },
      { name: "cítrico", color: "#d4c36a" },
      { name: "lavanda", color: "#a890c4" },
      { name: "almiscarado", color: "#c8a898" },
      { name: "baunilha", color: "#d4c090" },
    ],
  },
  {
    name: "Asad",
    brand: "Lattafa Perfumes",
    image: imgAsad,
    category: "Oriental",
    gender: "masculino" as const,
    topNotes: "Pimenta Preta, Tabaco e Abacaxi",
    heartNotes: "Patchouli, Café e Íris",
    baseNotes: "Baunilha, Âmbar, Madeira Seca, Benjoim e Ládano",
    pricePix: "R$ 240,00",
    priceCredit: "R$ 266,40",
    inspiration: "Sauvage Elixir",
    accords: [
      { name: "âmbar", color: "#d4a04a" },
      { name: "fresco especiado", color: "#7cb87a" },
      { name: "amadeirado", color: "#b8956a" },
      { name: "baunilha", color: "#d4c090" },
      { name: "doce", color: "#d4908a" },
    ],
  },
  {
    name: "La Vivacité",
    brand: "Maison Alhambra",
    image: imgVivacite,
    category: "Floral Frutado",
    gender: "feminino" as const,
    topNotes: "Groselha Preta e Pera",
    heartNotes: "Íris, Flor de Laranjeira e Jasmim",
    baseNotes: "Patchouli, Fava Tonka, Praliné e Baunilha",
    pricePix: "R$ 210,00",
    priceCredit: "R$ 233,10",
    inspiration: "La Vie Est Belle",
    accords: [
      { name: "doce", color: "#d4908a" },
      { name: "baunilha", color: "#d4c090" },
      { name: "patchouli", color: "#6a8a5a" },
      { name: "amadeirado", color: "#b8956a" },
      { name: "frutado", color: "#d4a878" },
    ],
  },
];

const sobEncomenda = [
  {
    name: "Como Moiselle",
    brand: "Maison Alhambra",
    image: imgComo,
    category: "Floral Cítrico",
    gender: "feminino" as const,
    topNotes: "Laranja, Mandarina, Bergamota e Flor de Laranjeira",
    heartNotes: "Rosa Turca, Jasmim, Mimosa e Ylang-Ylang",
    baseNotes: "Patchouli, Almíscar Branco, Baunilha, Vetiver, Fava Tonka e Opoponax",
    pricePix: "Sob consulta",
    priceCredit: "Sob consulta",
    inspiration: "Coco Mademoiselle",
    accords: [
      { name: "floral", color: "#d4908a" },
      { name: "cítrico", color: "#d4c36a" },
      { name: "almiscarado", color: "#c8a898" },
      { name: "baunilha", color: "#d4c090" },
    ],
  },
  {
    name: "Yara",
    brand: "Lattafa Perfumes",
    image: imgYara,
    category: "Oriental Gourmand",
    gender: "feminino" as const,
    topNotes: "Heliotrópio, Orquídea e Tangerina",
    heartNotes: "Notas Gourmand e Notas Tropicais",
    baseNotes: "Almíscar, Baunilha e Sândalo",
    pricePix: "Sob consulta",
    priceCredit: "Sob consulta",
    accords: [
      { name: "doce", color: "#d4908a" },
      { name: "cremoso", color: "#d4c090" },
      { name: "frutado", color: "#d4a878" },
      { name: "gourmand", color: "#c8a898" },
      { name: "floral", color: "#a890c4" },
    ],
  },
  {
    name: "Fakhar",
    brand: "Lattafa Perfumes",
    image: imgFakhar,
    category: "Floral Frutado",
    gender: "feminino" as const,
    topNotes: "Pêssego, Pera, Laranja, Maçã e Groselha Preta",
    heartNotes: "Flor de Laranjeira, Rosa e Jasmim Sambac",
    baseNotes: "Baunilha, Patchouli, Sândalo e Almíscar",
    pricePix: "Sob consulta",
    priceCredit: "Sob consulta",
    accords: [
      { name: "frutado", color: "#d4a878" },
      { name: "floral", color: "#d4908a" },
      { name: "almiscarado", color: "#c8a898" },
      { name: "doce", color: "#d4908a" },
      { name: "amadeirado", color: "#b8956a" },
    ],
  },
  {
    name: "Victorioso Victory",
    brand: "Maison Alhambra",
    image: imgVictorioso,
    category: "Amadeirado Aromático",
    gender: "masculino" as const,
    topNotes: "Pimenta Rosa e Limão",
    heartNotes: "Olíbano e Lavanda",
    baseNotes: "Fava Tonka e Âmbar",
    pricePix: "Sob consulta",
    priceCredit: "Sob consulta",
    inspiration: "Invictus Victory",
    accords: [
      { name: "âmbar", color: "#d4a04a" },
      { name: "aromático", color: "#8cb87a" },
      { name: "baunilha", color: "#d4c090" },
      { name: "doce", color: "#d4908a" },
      { name: "amadeirado", color: "#b8956a" },
    ],
  },
  {
    name: "Attar Al Wesal",
    brand: "Al Wataniah",
    image: imgAttar,
    category: "Oriental Especiado",
    gender: "masculino" as const,
    topNotes: "Bergamota, Cítricos e Especiarias",
    heartNotes: "Rosa, Jasmim e Cedro",
    baseNotes: "Oud, Âmbar e Almíscar",
    pricePix: "Sob consulta",
    priceCredit: "Sob consulta",
    accords: [
      { name: "oud", color: "#8a6a4a" },
      { name: "âmbar", color: "#d4a04a" },
      { name: "especiado", color: "#c87a5a" },
      { name: "floral", color: "#d4908a" },
      { name: "amadeirado", color: "#b8956a" },
    ],
  },
  {
    name: "Sabah Al Ward",
    brand: "Al Wataniah",
    image: imgSabah,
    category: "Oriental Floral",
    gender: "feminino" as const,
    topNotes: "Rosa Damascena e Açafrão",
    heartNotes: "Oud, Jasmim e Patchouli",
    baseNotes: "Baunilha, Almíscar e Sândalo",
    pricePix: "Sob consulta",
    priceCredit: "Sob consulta",
    accords: [
      { name: "rosa", color: "#c47090" },
      { name: "oud", color: "#8a6a4a" },
      { name: "floral", color: "#d4908a" },
      { name: "amadeirado", color: "#b8956a" },
    ],
  },
];

const stats = [
  { value: "500+", label: "Clientes satisfeitos" },
  { value: "100%", label: "Originais importados" },
  { value: "2x", label: "Sem juros no cartão" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const children = ref.current?.querySelectorAll("[data-reveal]");
    children?.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setOffset(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return offset;
}

const GoldDivider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-primary/40" />
    <Sparkles className="w-3 h-3 text-gold/40" />
    <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-primary/40" />
  </div>
);

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "LGs Perfumes",
  "description": "Catálogo digital de perfumes importados com fragrâncias exclusivas. Atendimento personalizado via WhatsApp em São Paulo.",
  "url": "https://luxury-contact-landing.lovable.app",
  "telephone": "+5511988742967",
  "image": "https://luxury-contact-landing.lovable.app/og-image.jpg",
  "priceRange": "R$ 200 - R$ 300",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "makesOffer": products.map(p => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Product",
      "name": `${p.name} - ${p.brand}`,
      "category": "Perfumes Importados",
      "description": `Notas de topo: ${p.topNotes}. Coração: ${p.heartNotes}. Base: ${p.baseNotes}.`,
    },
    "price": p.pricePix.replace(/[^\d,]/g, '').replace(',', '.'),
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  }))
};

type GenderFilter = "todos" | "masculino" | "feminino";

const GenderTabs = ({ active, onChange }: { active: GenderFilter; onChange: (g: GenderFilter) => void }) => (
  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
    {([
      { key: "todos" as const, label: "Todos" },
      { key: "masculino" as const, label: "Masculino" },
      { key: "feminino" as const, label: "Feminino" },
    ]).map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-300 active:scale-95 cursor-pointer ${
          active === key
            ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_16px_hsl(42_65%_52%/0.3)]"
            : "bg-transparent text-muted-foreground border-border/40 hover:text-gold hover:border-primary/30"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

const Index = () => {
  const productsRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const scrollY = useParallax();
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("todos");
  const [genderFilterEncomenda, setGenderFilterEncomenda] = useState<GenderFilter>("todos");

  const filteredProducts = genderFilter === "todos" ? products : products.filter(p => p.gender === genderFilter);
  const filteredEncomenda = genderFilterEncomenda === "todos" ? sobEncomenda : sobEncomenda.filter(p => p.gender === genderFilterEncomenda);

  return (
    <div className="min-h-screen bg-background relative" style={{ backgroundImage: "linear-gradient(to bottom, hsl(30 10% 5% / 0.7), hsl(30 10% 5% / 0.6)), url('/images/marble-bg.jpg')", backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center" }}>
      <Helmet>
        <title>LGs Perfumes — Perfumes Importados em SP | Fragrâncias Exclusivas</title>
        <meta name="description" content="Compre perfumes importados originais em São Paulo. Lattafa, Maison Alhambra e mais. Preços a partir de R$200. Parcelamento em 2x. Atendimento via WhatsApp." />
        <link rel="canonical" href="https://luxury-contact-landing.lovable.app/" />
        <meta name="keywords" content="perfumes importados, perfumes árabes, lattafa, maison alhambra, perfumes originais, comprar perfume, perfume masculino, perfume feminino, são paulo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luxury-contact-landing.lovable.app/" />
        <meta property="og:title" content="LGs Perfumes — Perfumes Importados Exclusivos em SP" />
        <meta property="og:description" content="Catálogo de perfumes importados originais. Lattafa, Maison Alhambra. Preços a partir de R$200 no Pix. Atendimento via WhatsApp." />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LGs Perfumes — Perfumes Importados Exclusivos" />
        <meta name="twitter:description" content="Perfumes importados originais com atendimento personalizado via WhatsApp." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ===== FIXED NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between bg-background/60 backdrop-blur-xl border-b border-border/20" role="navigation" aria-label="Navegação principal">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={logoLgs} alt="LGs Perfumes" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" width={96} height={96} />
          <span className="font-display text-base sm:text-lg gold-gradient-text">LGs Perfumes</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#catalogo" className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors duration-300">
            Catálogo
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full bg-primary text-primary-foreground font-body text-[10px] sm:text-[11px] font-medium tracking-wider uppercase transition-all duration-400 hover:shadow-[0_2px_20px_hsl(42_65%_52%/0.35)] active:scale-[0.97]"
          >
            <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Contato</span>
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="relative h-[100svh] min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <img
            src={heroBg}
            alt="Fragrâncias importadas exclusivas"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
        {/* Gradient overlays — stronger for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        <div className="absolute inset-0 bg-background/25" />

        {/* Watermark — subtle brand presence */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <img
            src={logoLgs}
            alt=""
            aria-hidden="true"
            className="w-[60vw] sm:w-[50vw] md:w-[40vw] max-w-[600px] object-contain select-none"
            style={{
              opacity: 0.04,
              filter: 'grayscale(30%) brightness(1.3)',
              mixBlendMode: 'soft-light',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl w-full">
          {/* Logo only */}
          <div className="animate-hero-1 flex justify-center mb-6 sm:mb-8 mt-10 sm:mt-14">
            <img
              src={logoLgs}
              alt="LGs Perfumes"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-[0_0_50px_hsl(42_65%_52%/0.4)]"
              width={192}
              height={192}
            />
          </div>

          <div className="animate-hero-line flex justify-center my-5 sm:my-8">
            <div className="h-px w-28 sm:w-40 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          </div>

          <div className="animate-hero-3">
            <p className="font-display text-base sm:text-xl md:text-2xl italic text-foreground/80 max-w-sm sm:max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed tracking-wide" style={{ letterSpacing: '0.06em' }}>
              Fragrâncias selecionadas com exclusividade.
              <br />
              <span className="text-gold">Elegância que marca presença.</span>
            </p>
          </div>

          <div className="animate-hero-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 sm:gap-3 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-body text-xs sm:text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_4px_40px_hsl(42_65%_52%/0.4)] active:scale-[0.97] w-full sm:w-auto justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <MessageCircle className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Fale Conosco</span>
            </a>
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-primary/30 text-gold font-body text-xs sm:text-sm tracking-wider uppercase transition-all duration-400 hover:bg-primary/10 hover:border-primary/50 active:scale-[0.97] w-full sm:w-auto justify-center"
            >
              Ver Catálogo
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <ChevronDown className="w-5 h-5 text-gold/40" />
        </div>
      </header>

      {/* ===== STATS BAR ===== */}
      <section className="relative py-10 sm:py-14 border-y border-primary/15 bg-gradient-to-b from-surface-elevated to-background" ref={statsRef} aria-label="Estatísticas">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center relative"
                data-reveal
                data-delay={String(i * 120)}
              >
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gradient-to-b from-transparent via-primary/25 to-transparent hidden sm:block" />
                )}
                <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text mb-1 sm:mb-2 tracking-tight">
                  {stat.value}
                </p>
                <p className="font-body text-[10px] sm:text-xs md:text-sm text-foreground/60 tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCT ===== */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden" ref={useScrollReveal()} aria-label="Destaque">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-elevated/50 to-background" />
        <div className="container relative px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-reveal>
              <div className="relative rounded-xl overflow-hidden glow-gold aspect-[3/4] max-w-sm sm:max-w-md mx-auto lg:mx-0">
                <img src={imgAsad} alt="Asad - Lattafa Perfumes - Perfume Oriental Masculino" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="font-body text-[10px] sm:text-xs text-foreground/70">Mais vendido do mês</p>
                </div>
              </div>
            </div>
            <div data-reveal data-delay="200" className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
                Destaque da Coleção
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-[0.9]">
                Asad
              </h2>
              <p className="font-display text-lg sm:text-xl italic text-gold-light">Lattafa Perfumes</p>
              <GoldDivider />
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Uma fragrância oriental poderosa e sofisticada. Notas de Pimenta Preta e Tabaco no topo,
                Patchouli e Café no coração, com uma base envolvente de Baunilha e Âmbar. Inspirado no icônico Sauvage Elixir.
              </p>
              <div className="pt-2">
                <p className="font-display text-3xl sm:text-4xl font-semibold gold-gradient-text mb-1">R$ 240,00</p>
                <p className="font-body text-[10px] sm:text-xs text-muted-foreground">no pix · ou R$ 266,40 em 2x sem juros</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Tenho interesse no perfume Asad - Lattafa. Poderia me dar mais informações?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-body text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-500 hover:shadow-[0_4px_40px_hsl(42_65%_52%/0.4)] active:scale-[0.97]"
              >
                <MessageCircle className="w-4 h-4" />
                Garantir o meu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALL PRODUCTS ===== */}
      <section id="catalogo" className="py-16 sm:py-24 md:py-32 scroll-mt-20" ref={productsRef} aria-label="Catálogo de perfumes">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-4" data-reveal>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
              Coleção Exclusiva
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground leading-tight">
              Nossos Perfumes
            </h2>
            <GoldDivider />
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              Cada fragrância é selecionada a dedo para oferecer uma experiência olfativa única e marcante.
            </p>
          </div>

          <GenderTabs active={genderFilter} onChange={setGenderFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, i) => (
              <article key={product.name} data-reveal data-delay={String(i * 100)}>
                <ProductCard {...product} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE DIVIDER ===== */}
      <div className="relative py-8 sm:py-10 border-y border-primary/20 overflow-hidden">
        {/* Glow effect behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-16 bg-primary/8 blur-3xl rounded-full" />
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="font-display text-xl sm:text-3xl italic font-light shrink-0 flex items-center">
              <span className="gold-gradient-text mx-6 sm:mx-10 tracking-[0.2em] drop-shadow-[0_0_12px_hsl(42_65%_52%/0.3)]">
                LGs Perfumes Árabes
              </span>
              <span className="text-primary/50 text-sm mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-24 md:py-32 relative" ref={useScrollReveal()} aria-label="Perfumes sob encomenda">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-4" data-reveal>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
              Pedidos Sob Encomenda
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground leading-tight">
              Esgotados · Sob Encomenda
            </h2>
            <GoldDivider />
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              Fragrâncias temporariamente esgotadas. Faça sua encomenda via WhatsApp e garantimos a sua.
            </p>
          </div>

          <GenderTabs active={genderFilterEncomenda} onChange={setGenderFilterEncomenda} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {filteredEncomenda.map((product, i) => (
              <article key={product.name} data-reveal data-delay={String(i * 100)}>
                <ProductCard {...product} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="py-14 sm:py-20 bg-surface-elevated relative overflow-hidden" ref={useScrollReveal()} aria-label="Depoimentos">
        <div className="absolute inset-0 animate-shimmer-gold" />
        <div className="container relative text-center space-y-4 sm:space-y-6 px-4 sm:px-6" data-reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
            O que nossos clientes dizem
          </p>
          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-light italic text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            "Perfumes incríveis com preço justo. O atendimento é impecável — sempre me ajudam a escolher a fragrância perfeita."
          </blockquote>
          <p className="font-body text-xs sm:text-sm text-muted-foreground">— Mariana S., cliente desde 2024</p>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 md:py-36 relative" ref={ctaRef} aria-label="Contato">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="container relative text-center space-y-6 sm:space-y-8 px-4 sm:px-6" data-reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
            Pronto para encontrar sua fragrância?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground leading-tight">
            Fale com a gente
          </h2>
          <GoldDivider />
          <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Atendimento personalizado via WhatsApp. Tire suas dúvidas, conheça nosso catálogo completo e garanta sua fragrância favorita.
          </p>
          <div className="pt-2 sm:pt-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-body text-xs sm:text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-500 animate-pulse-glow hover:shadow-[0_4px_50px_hsl(42_65%_52%/0.5)] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              <span className="relative z-10 whitespace-nowrap">WhatsApp (11) 98874-2967</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 sm:py-12 border-t border-border/30" role="contentinfo">
        <div className="container flex flex-col items-center gap-4 sm:gap-6 text-center px-4 sm:px-6">
          <div className="flex flex-col items-center gap-2">
            <img src={logoLgs} alt="LGs Perfumes" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" width={64} height={64} loading="lazy" />
            <p className="font-display text-xl sm:text-2xl gold-gradient-text">LGs Perfumes</p>
            <p className="font-body text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Fragrâncias Importadas</p>
          </div>
          <a
            href="https://instagram.com/lgs.perfumes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-xs sm:text-sm text-muted-foreground hover:text-gold transition-colors duration-300"
            aria-label="Instagram @lgs.perfumes"
          >
            <Instagram className="w-4 h-4" />
            @lgs.perfumes
          </a>
          <p className="font-body text-[10px] sm:text-[11px] text-muted-foreground/50">
            © 2026 LGs Perfumes — Todos os direitos reservados
          </p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'white' }} />
      </a>
    </div>
  );
};

export default Index;
