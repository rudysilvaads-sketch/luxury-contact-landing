import { useEffect, useRef, useState } from "react";
import { MessageCircle, Instagram, ChevronDown, Star, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";
import logoLgs from "@/assets/logo-lgs.png";
import imgSalvo from "@/assets/perfume-salvo.jpg";
import imgNo2Men from "@/assets/perfume-no2men.jpg";
import imgLeonie from "@/assets/perfume-leonie.jpg";
import imgAsad from "@/assets/perfume-asad.jpg";
import imgVivacite from "@/assets/perfume-vivacite.jpg";

const WHATSAPP_NUMBER = "5511988742967";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de ver o catálogo completo de perfumes.")}`;

const products = [
  {
    name: "Salvo",
    brand: "Maison Alhambra",
    image: imgSalvo,
    category: "Oriental Fougère",
    topNotes: "Bergamota",
    heartNotes: "Lavanda, Pimenta de Szechuan, Anis Estrelado e Noz-moscada",
    baseNotes: "Ambroxan e Baunilha",
    pricePix: "R$ 205,00",
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
    topNotes: "Pimenta Preta, Tabaco e Abacaxi",
    heartNotes: "Patchouli, Café e Íris",
    baseNotes: "Baunilha, Âmbar, Madeira Seca, Benjoim e Ládano",
    pricePix: "R$ 240,00",
    priceCredit: "R$ 266,40",
    inspiration: "Sauvage",
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
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return offset;
}

const GoldDivider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
    <Sparkles className="w-3 h-3 text-gold/40" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
  </div>
);

const Index = () => {
  const productsRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const scrollY = useParallax();

  return (
    <div className="min-h-screen bg-background relative">
      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden grain-overlay">
        {/* Parallax BG */}
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="animate-hero-1">
            <p className="font-body text-[11px] tracking-[0.5em] uppercase text-gold/80 mb-8">
              Catálogo Digital Exclusivo
            </p>
          </div>

          <div className="animate-hero-2">
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-light text-foreground leading-[0.85] mb-2" style={{ letterSpacing: '-0.02em' }}>
              LGs
            </h1>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light italic gold-gradient-text leading-tight mb-6" style={{ letterSpacing: '0.1em' }}>
              Perfumes
            </h1>
          </div>

          <div className="animate-hero-line flex justify-center mb-8">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          </div>

          <div className="animate-hero-3">
            <p className="font-body text-sm sm:text-base text-foreground/60 max-w-md mx-auto mb-12 leading-relaxed tracking-wide">
              Fragrâncias importadas selecionadas com exclusividade.
              <br />
              <span className="text-gold/70">Elegância que marca presença.</span>
            </p>
          </div>

          <div className="animate-hero-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_4px_40px_hsl(42_65%_52%/0.4)] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <MessageCircle className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Fale Conosco</span>
            </a>
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/30 text-gold font-body text-sm tracking-wider uppercase transition-all duration-400 hover:bg-primary/10 hover:border-primary/50 active:scale-[0.97]"
            >
              Ver Catálogo
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <ChevronDown className="w-5 h-5 text-gold/40" />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative py-12 border-y border-border/30 bg-surface-elevated" ref={statsRef}>
        <div className="container">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center"
                data-reveal
                data-delay={String(i * 120)}
              >
                <p className="font-display text-3xl sm:text-4xl font-semibold gold-gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="font-body text-xs sm:text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCT ===== */}
      <section className="py-24 sm:py-32 relative overflow-hidden" ref={useScrollReveal()}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-elevated/50 to-background" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <div className="relative rounded-xl overflow-hidden glow-gold aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <img src={imgAsad} alt="Asad - Lattafa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="font-body text-xs text-foreground/70">Mais vendido do mês</p>
                </div>
              </div>
            </div>
            <div data-reveal data-delay="200" className="space-y-6 text-center lg:text-left">
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
                Destaque da Coleção
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-light text-foreground leading-[0.9]">
                Asad
              </h2>
              <p className="font-display text-xl italic text-gold-light">Lattafa Perfumes</p>
              <GoldDivider />
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Uma fragrância oriental poderosa e sofisticada. Notas de Pimenta Preta e Tabaco no topo,
                Patchouli e Café no coração, com uma base envolvente de Baunilha e Âmbar. Inspirado no icônico Sauvage.
              </p>
              <div className="pt-2">
                <p className="font-display text-4xl font-semibold gold-gradient-text mb-1">R$ 240,00</p>
                <p className="font-body text-xs text-muted-foreground">no pix · ou R$ 266,40 em 2x sem juros</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Tenho interesse no perfume Asad - Lattafa. Poderia me dar mais informações?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase transition-all duration-500 hover:shadow-[0_4px_40px_hsl(42_65%_52%/0.4)] active:scale-[0.97]"
              >
                <MessageCircle className="w-4 h-4" />
                Garantir o meu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALL PRODUCTS ===== */}
      <section id="catalogo" className="py-24 sm:py-32" ref={productsRef}>
        <div className="container">
          <div className="text-center mb-20 space-y-4" data-reveal>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
              Coleção Exclusiva
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-foreground leading-tight">
              Nossos Perfumes
            </h2>
            <GoldDivider />
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
              Cada fragrância é selecionada a dedo para oferecer uma experiência olfativa única e marcante.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div key={product.name} data-reveal data-delay={String(i * 100)}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="py-20 bg-surface-elevated relative overflow-hidden" ref={useScrollReveal()}>
        <div className="absolute inset-0 animate-shimmer-gold" />
        <div className="container relative text-center space-y-6" data-reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
            O que nossos clientes dizem
          </p>
          <blockquote className="font-display text-2xl sm:text-3xl font-light italic text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            "Perfumes incríveis com preço justo. O atendimento é impecável — sempre me ajudam a escolher a fragrância perfeita."
          </blockquote>
          <p className="font-body text-sm text-muted-foreground">— Mariana S., cliente desde 2024</p>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-28 sm:py-36 relative" ref={ctaRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="container relative text-center space-y-8" data-reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold">
            Pronto para encontrar sua fragrância?
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-light text-foreground leading-tight">
            Fale com a gente
          </h2>
          <GoldDivider />
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Atendimento personalizado via WhatsApp. Tire suas dúvidas, conheça nosso catálogo completo e garanta sua fragrância favorita.
          </p>
          <div className="pt-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-500 animate-pulse-glow hover:shadow-[0_4px_50px_hsl(42_65%_52%/0.5)] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10">WhatsApp (11) 98874-2967</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t border-border/30">
        <div className="container flex flex-col items-center gap-6 text-center">
          <div>
            <p className="font-display text-2xl gold-gradient-text mb-1">LGs Perfumes</p>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Fragrâncias Importadas</p>
          </div>
          <a
            href="https://instagram.com/lgs.perfumes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <Instagram className="w-4 h-4" />
            @lgs.perfumes
          </a>
          <p className="font-body text-[11px] text-muted-foreground/50">
            © 2026 LGs Perfumes — Todos os direitos reservados
          </p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" style={{ color: 'white' }} />
      </a>
    </div>
  );
};

export default Index;
