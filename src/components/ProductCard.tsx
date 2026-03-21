import { MessageCircle } from "lucide-react";

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
  delay?: number;
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
  delay = 0,
}: ProductCardProps) => {
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no perfume ${name} - ${brand}. Poderia me dar mais informações?`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="font-body text-xs tracking-widest uppercase px-3 py-1 rounded-sm bg-background/80 backdrop-blur-sm text-gold">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-2xl font-medium text-foreground leading-tight">
            {name}
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-0.5">{brand}</p>
        </div>

        <div className="space-y-1.5 font-body text-sm text-secondary-foreground/80">
          <p><span className="text-gold-light text-xs uppercase tracking-wider">Topo:</span> {topNotes}</p>
          <p><span className="text-gold-light text-xs uppercase tracking-wider">Coração:</span> {heartNotes}</p>
          <p><span className="text-gold-light text-xs uppercase tracking-wider">Fundo:</span> {baseNotes}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {accords.map((accord) => (
            <span
              key={accord.name}
              className="text-[10px] font-body tracking-wide px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: accord.color, color: "#1a1a1a" }}
            >
              {accord.name}
            </span>
          ))}
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-semibold text-gold">{pricePix}</span>
            <span className="font-body text-xs text-muted-foreground">no pix</span>
          </div>
          <p className="font-body text-sm text-muted-foreground">
            {priceCredit} <span className="text-xs">no crédito (2x sem juros)</span>
          </p>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_20px_hsl(40_60%_50%/0.3)] active:scale-[0.97]"
        >
          <MessageCircle className="w-4 h-4" />
          Comprar via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
