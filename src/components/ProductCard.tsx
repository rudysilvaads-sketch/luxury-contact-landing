import { useRef, useState, useCallback } from "react";
import { MessageCircle, Sparkles } from "lucide-react";

interface Accord {
  name: string;
  color: string;
}

interface ProductCardProps {
  name: string;
  brand: string;
  image: string;
  category: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  pricePix: string;
  priceCredit: string;
  accords: Accord[];
  inspiration?: string;
}

const WHATSAPP_NUMBER = "5511988742967";

const ProductCard = ({
  name,
  brand,
  image,
  category,
  topNotes,
  heartNotes,
  baseNotes,
  pricePix,
  priceCredit,
  accords,
  inspiration,
}: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * -14;
    const tiltY = (x - 0.5) * 14;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no perfume ${name} - ${brand}. Poderia me dar mais informações?`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div
      className="group"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-xl overflow-hidden bg-card border border-border/40 will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.3s ease"
            : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease",
          boxShadow: isHovered
            ? `0 20px 60px hsl(42 65% 52% / 0.12), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 hsl(42 65% 52% / 0.1)`
            : `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 hsl(42 65% 52% / 0.05)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic glare/light reflection */}
        <div
          className="absolute inset-0 z-30 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
            transition: isHovered ? "none" : "opacity 0.6s ease",
          }}
        />

        {/* Edge highlight that follows tilt */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(${135 + tilt.y * 3}deg, hsl(42 65% 52% / ${isHovered ? 0.08 : 0}) 0%, transparent 50%)`,
            transition: isHovered ? "none" : "all 0.6s ease",
          }}
        />

        {/* Image with 3D depth layer */}
        <div className="relative overflow-hidden aspect-[3/4] sm:aspect-[4/5]" style={{ transformStyle: "preserve-3d" }}>
          <img
            src={image}
            alt={`Perfume ${name} - ${brand}`}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              transform: `translateZ(0) scale(${isHovered ? 1.06 : 1})`,
              transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-70" />

          {/* Floating category badge — sits "above" card plane */}
          <div
            className="absolute top-4 left-4 z-10"
            style={{
              transform: `translateZ(30px) translateX(${tilt.y * 0.5}px) translateY(${tilt.x * -0.5}px)`,
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span className="font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md text-gold border border-gold/20 shadow-lg">
              {category}
            </span>
          </div>

          {inspiration && (
            <div
              className="absolute bottom-4 right-4 z-10"
              style={{
                transform: `translateZ(25px) translateX(${tilt.y * 0.3}px) translateY(${tilt.x * -0.3}px)`,
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="font-body text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-md text-gold-light flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" />
                Insp. {inspiration}
              </span>
            </div>
          )}
        </div>

        {/* Content — also subtly parallax */}
        <div
          className="p-4 sm:p-6 space-y-4 sm:space-y-5 relative"
          style={{
            transform: `translateZ(10px)`,
          }}
        >
          <div>
            <h3 className="font-display text-3xl font-medium text-foreground leading-none tracking-tight">
              {name}
            </h3>
            <p className="font-body text-sm text-gold-muted mt-1 tracking-wide">{brand}</p>
          </div>

          {/* Olfactive pyramid */}
          <div className="space-y-2.5 font-body text-[13px] text-secondary-foreground/75 leading-relaxed">
            <div className="flex gap-3">
              <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-medium w-16 shrink-0 pt-0.5">Topo</span>
              <span>{topNotes}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-medium w-16 shrink-0 pt-0.5">Coração</span>
              <span>{heartNotes}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-medium w-16 shrink-0 pt-0.5">Fundo</span>
              <span>{baseNotes}</span>
            </div>
          </div>

          {/* Accords */}
          <div className="flex flex-wrap gap-1.5">
            {accords.map((accord) => (
              <span
                key={accord.name}
                className="text-[10px] font-body font-medium tracking-wide px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${accord.color}18`,
                  color: accord.color,
                  border: `1px solid ${accord.color}30`,
                }}
              >
                {accord.name}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-border/40">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Preço no Pix</p>
                <span className="font-display text-3xl font-semibold gold-gradient-text">{pricePix}</span>
              </div>
              <div className="text-right">
                <p className="font-body text-xs text-muted-foreground">{priceCredit}</p>
                <p className="font-body text-[10px] text-muted-foreground/60">2x sem juros</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-center gap-2.5 w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase relative overflow-hidden transition-all duration-400 hover:shadow-[0_4px_30px_hsl(42_65%_52%/0.35)] active:scale-[0.97]"
            style={{ transform: "translateZ(20px)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
            <MessageCircle className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Quero esse perfume</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
