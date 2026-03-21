import { useEffect, useRef } from "react";
import { MessageCircle, Instagram } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";
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
    accords: [
      { name: "fresco especiado", color: "#a8d5a2" },
      { name: "cítrico", color: "#f5e6a3" },
      { name: "lavanda", color: "#c8b4e0" },
      { name: "âmbar", color: "#e8a855" },
      { name: "aromático", color: "#b8d4a8" },
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
    accords: [
      { name: "fresco especiado", color: "#a8d5a2" },
      { name: "cítrico", color: "#f5e6a3" },
      { name: "aromático", color: "#b8d4a8" },
      { name: "amadeirado", color: "#c4a87c" },
      { name: "lavanda", color: "#c8b4e0" },
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
      { name: "floral branco", color: "#f0e8d8" },
      { name: "cítrico", color: "#f5e6a3" },
      { name: "lavanda", color: "#c8b4e0" },
      { name: "almiscarado", color: "#e8d0c0" },
      { name: "baunilha", color: "#f5e0b8" },
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
    accords: [
      { name: "âmbar", color: "#e8a855" },
      { name: "fresco especiado", color: "#a8d5a2" },
      { name: "amadeirado", color: "#c4a87c" },
      { name: "baunilha", color: "#f5e0b8" },
      { name: "doce", color: "#f0b0b0" },
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
    accords: [
      { name: "doce", color: "#f0b0b0" },
      { name: "baunilha", color: "#f5e0b8" },
      { name: "patchouli", color: "#8a9a6a" },
      { name: "amadeirado", color: "#c4a87c" },
      { name: "frutado", color: "#f0c0a0" },
    ],
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const children = ref.current?.querySelectorAll("[data-reveal]");
    children?.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const Index = () => {
  const productsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 text-center px-6 max-w-2xl animate-fade-up">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-light mb-6">
            Catálogo Digital
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[0.95] mb-4">
            LGs Perfumes
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
            Fragrâncias importadas selecionadas com exclusividade. Elegância que marca presença.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_hsl(40_60%_50%/0.35)] active:scale-[0.97]"
          >
            <MessageCircle className="w-4 h-4" />
            Fale Conosco
          </a>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 sm:py-28" ref={productsRef}>
        <div className="container">
          <div className="text-center mb-16" data-reveal>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
              Coleção Exclusiva
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-foreground">
              Nossos Perfumes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div key={product.name} data-reveal style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard {...product} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-elevated" ref={ctaRef}>
        <div className="container text-center" data-reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-4">
            Ficou com interesse?
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto mb-8">
            Entre em contato pelo WhatsApp e garanta sua fragrância favorita com atendimento personalizado.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-md bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_hsl(40_60%_50%/0.35)] active:scale-[0.97]"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp (11) 98874-2967
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container flex flex-col items-center gap-4 text-center">
          <p className="font-display text-xl text-gold">LGs Perfumes</p>
          <a
            href="https://instagram.com/lgs.perfumes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @lgs.perfumes
          </a>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 LGs Perfumes — Todos os direitos reservados
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default Index;
