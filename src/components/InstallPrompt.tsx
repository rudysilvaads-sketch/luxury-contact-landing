import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, Smartphone } from "lucide-react";
import logoLgs from "@/assets/logo-lgs.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPrompt = () => {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or installed
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) return;

    // Check if already in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Detect iOS
    const ua = navigator.userAgent;
    const isiOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isiOS);

    // Listen for beforeinstallprompt (Android/Desktop Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show modal after 3 seconds
      setTimeout(() => setOpen(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // For iOS, show instructions after delay
    if (isiOS) {
      setTimeout(() => setOpen(true), 3000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem("pwa-install-dismissed", "installed");
      }
      setDeferredPrompt(null);
    }
    setOpen(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="bg-[#1a1714] border-[#c9a96e]/30 text-white max-w-sm mx-auto rounded-2xl">
        <DialogHeader className="items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#c9a96e]/40 shadow-lg shadow-[#c9a96e]/10 mx-auto">
            <img src={logoLgs} alt="LGs Perfumes" className="w-full h-full object-contain bg-[#0f0d0a] p-2" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#c9a96e]">
            Instale o App LGs Perfumes
          </DialogTitle>
          <DialogDescription className="text-white/70 text-sm leading-relaxed">
            Tenha acesso rápido ao nosso catálogo direto da sua tela inicial — como um app de verdade!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {isIOS ? (
            <div className="bg-white/5 rounded-xl p-4 space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#c9a96e]/20 text-[#c9a96e] flex items-center justify-center text-xs font-bold">1</span>
                Toque no botão <strong className="text-white">Compartilhar</strong> <span className="text-lg">⎋</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#c9a96e]/20 text-[#c9a96e] flex items-center justify-center text-xs font-bold">2</span>
                Selecione <strong className="text-white">"Adicionar à Tela Inicial"</strong>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#c9a96e]/20 text-[#c9a96e] flex items-center justify-center text-xs font-bold">3</span>
                Toque em <strong className="text-white">"Adicionar"</strong>
              </p>
            </div>
          ) : (
            <Button
              onClick={handleInstall}
              className="w-full bg-[#c9a96e] hover:bg-[#b8944f] text-[#0f0d0a] font-bold h-12 rounded-xl text-base gap-2 active:scale-[0.97] transition-transform"
            >
              <Download className="w-5 h-5" />
              Instalar Agora
            </Button>
          )}

          <button
            onClick={handleDismiss}
            className="w-full text-white/40 hover:text-white/60 text-sm py-2 transition-colors"
          >
            Agora não
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-white/30 text-xs mt-1">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Grátis • Sem App Store • Rápido</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstallPrompt;
