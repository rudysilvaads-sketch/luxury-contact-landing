import { useState, useEffect } from "react";
import { Zap, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511988742967";

function getEndTime() {
  const stored = localStorage.getItem("flash_offer_end");
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  // 3 hours from now
  const end = Date.now() + 3 * 60 * 60 * 1000;
  localStorage.setItem("flash_offer_end", String(end));
  return end;
}

function formatTime(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return { h, m, s };
}

export default function FlashOffer() {
  const [endTime] = useState(getEndTime);
  const [remaining, setRemaining] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const left = endTime - Date.now();
      setRemaining(left <= 0 ? 0 : left);
      if (left <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const { h, m, s } = formatTime(remaining);
  const expired = remaining <= 0;

  if (expired) return null;

  const msg = encodeURIComponent(
    "Olá! Vi a oferta relâmpago no site e quero aproveitar o desconto! 🔥"
  );

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden" aria-label="Oferta relâmpago">
      {/* Pulsing glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/[0.03] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[120px] bg-primary/10 blur-[100px] rounded-full animate-pulse" />

      <div className="container relative px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5">
            <Zap className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-red-400 font-medium">
              Oferta Relâmpago
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            <span className="text-gold">10% OFF</span> no próximo pedido
          </h3>

          <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Mencione o código <span className="text-gold font-medium">LGS10</span> no WhatsApp e ganhe desconto exclusivo em qualquer perfume.
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {[
              { value: h, label: "Horas" },
              { value: m, label: "Min" },
              { value: s, label: "Seg" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold gold-gradient-text tabular-nums leading-none"
                  >
                    {unit.value}
                  </span>
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    {unit.label}
                  </span>
                </div>
                {i < 2 && (
                  <span className="font-display text-2xl sm:text-3xl text-primary/40 -mt-4">:</span>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-xs font-medium tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_4px_40px_hsl(42_65%_52%/0.4)] active:scale-[0.97]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
            <MessageCircle className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Aproveitar agora</span>
          </a>
        </div>
      </div>
    </section>
  );
}
