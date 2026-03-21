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
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no perfume ${name} - ${brand}. Poderia me dar mais informações?`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="group card-premium bg-card rounded-lg overflow-hidden border border-border/50 relative">
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 animate-shimmer-gold rounded-lg" />

      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4 z-10">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md text-gold border border-gold/20">
            {category}
          </span>
        </div>
        {inspiration && (
          <div className="absolute bottom-4 right-4 z-10">
            <span className="font-body text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-md text-gold-light flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Insp. {inspiration}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-5 relative">
        <div>
          <h3 className="font-display text-3xl font-medium text-foreground leading-none tracking-tight">
            {name}
          </h3>
          <p className="font-body text-sm text-gold-muted mt-1 tracking-wide">{brand}</p>
        </div>

        {/* Notes with elegant divider */}
        <div className="space-y-2 font-body text-[13px] text-secondary-foreground/75 leading-relaxed">
          <div className="flex gap-2">
            <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-medium w-16 shrink-0 pt-0.5">Topo</span>
            <span>{topNotes}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-medium w-16 shrink-0 pt-0.5">Coração</span>
            <span>{heartNotes}</span>
          </div>
          <div className="flex gap-2">
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
              style={{ backgroundColor: `${accord.color}22`, color: accord.color, border: `1px solid ${accord.color}33` }}
            >
              {accord.name}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-border/50">
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
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase transition-all duration-400 hover:shadow-[0_4px_30px_hsl(42_65%_52%/0.35)] active:scale-[0.97] relative overflow-hidden group/btn"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
          <MessageCircle className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Quero esse perfume</span>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
