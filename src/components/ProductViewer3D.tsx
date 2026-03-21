import { useRef, useState, useCallback, useEffect } from "react";
import { X, RotateCcw, Hand } from "lucide-react";

interface ProductViewer3DProps {
  image: string;
  name: string;
  brand: string;
  onClose: () => void;
}

const ProductViewer3D = ({ image, name, brand, onClose }: ProductViewer3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Auto-rotate
  useEffect(() => {
    if (!autoRotate) return;
    let frame: number;
    const animate = () => {
      setRotation((prev) => ({ ...prev, y: prev.y + 0.3 }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate]);

  // Hide hint after 3s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setShowHint(false);
    setLastPos(getPos(e));
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      const pos = getPos(e);
      const dx = pos.x - lastPos.x;
      const dy = pos.y - lastPos.y;
      setRotation((prev) => ({
        x: Math.max(-30, Math.min(30, prev.x - dy * 0.4)),
        y: prev.y + dx * 0.5,
      }));
      setLastPos(pos);
    },
    [isDragging, lastPos]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setAutoRotate(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center">
          <h3 className="font-display text-3xl sm:text-4xl text-foreground">{name}</h3>
          <p className="font-body text-sm text-gold-muted mt-1">{brand}</p>
        </div>

        {/* 3D Viewer */}
        <div
          ref={containerRef}
          className="relative w-72 h-96 sm:w-80 sm:h-[28rem] cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: "800px" }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          {/* Bottle with 3D transforms */}
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            {/* Front face */}
            <img
              src={image}
              alt={`${name} - ${brand}`}
              className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_60px_hsl(42_65%_52%/0.25)]"
              style={{
                transform: "translateZ(20px)",
                backfaceVisibility: "hidden",
              }}
              draggable={false}
            />
            {/* Reflection / back face */}
            <img
              src={image}
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-40"
              style={{
                transform: "translateZ(-20px) rotateY(180deg) scaleX(-1)",
                backfaceVisibility: "hidden",
                filter: "blur(1px) brightness(0.6)",
              }}
              draggable={false}
            />
          </div>

          {/* Floor reflection */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full"
            style={{
              background: "radial-gradient(ellipse, hsl(42 65% 52% / 0.08), transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* Drag hint */}
          {showHint && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/40 animate-fade-in">
              <Hand className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="font-body text-[11px] text-muted-foreground">Arraste para girar</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetView}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/60 backdrop-blur-md font-body text-xs text-muted-foreground hover:text-gold hover:border-primary/30 transition-all duration-300 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Auto-rotação
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/60 backdrop-blur-md font-body text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer3D;
