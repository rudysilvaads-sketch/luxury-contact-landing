import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Perfumes incríveis com preço justo. O atendimento é impecável — sempre me ajudam a escolher a fragrância perfeita.",
    name: "Mariana S.",
    since: "cliente desde 2024",
    stars: 5,
  },
  {
    quote: "Comprei o Sauvage e fiquei impressionado com a durabilidade. Recebo elogios o dia inteiro. Já virei cliente fiel!",
    name: "Rafael M.",
    since: "cliente desde 2023",
    stars: 5,
  },
  {
    quote: "Melhor loja de perfumes importados que já encontrei. Entrega rápida, embalagem impecável e fragrâncias 100% originais.",
    name: "Camila R.",
    since: "cliente desde 2024",
    stars: 5,
  },
  {
    quote: "Atendimento VIP de verdade! Me indicaram o Baccarat Rouge e foi amor à primeira borrifada. Super recomendo.",
    name: "Juliana P.",
    since: "cliente desde 2023",
    stars: 5,
  },
  {
    quote: "Presente perfeito! Comprei o La Vivacité pra minha esposa e ela amou. A embalagem chegou impecável, parecia presente de grife.",
    name: "Lucas T.",
    since: "cliente desde 2024",
    stars: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, "left");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute -left-2 sm:-left-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border/40 bg-card/60 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-gold hover:border-primary/40 transition-all duration-300 active:scale-95"
        aria-label="Depoimento anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute -right-2 sm:-right-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border/40 bg-card/60 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-gold hover:border-primary/40 transition-all duration-300 active:scale-95"
        aria-label="Próximo depoimento"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="overflow-hidden px-8 sm:px-12">
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${direction === "right" ? "-30px" : "30px"})`
              : "translateX(0)",
            filter: isAnimating ? "blur(4px)" : "blur(0px)",
          }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-primary text-primary"
              />
            ))}
          </div>

          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-light italic text-foreground/90 leading-relaxed">
            "{t.quote}"
          </blockquote>
          <p className="font-body text-xs sm:text-sm text-muted-foreground mt-4">
            — {t.name}, {t.since}
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
