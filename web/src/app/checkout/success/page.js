"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const rawPlan = searchParams.get("plan");
  const isSimulated = searchParams.get("simulated") === "true";
  const plan = rawPlan === "weekly" ? "weekly" : "monthly";

  const planNames = {
    weekly: "Plano Semanal Premium",
    monthly: "Plano Mensal Premium",
  };

  const handleDownload = (platform) => {
    // Simulated download trigger
    alert(`Iniciando download do TalkGenius para ${platform}...`);
  };

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col justify-center items-center relative bg-[#0A0A0A] text-[#e5e2e1] px-margin-mobile">
      {/* Background Glows */}
      <div className="bg-glow-spot bg-primary -top-48 -left-48 opacity-25"></div>
      <div className="bg-glow-spot bg-secondary -bottom-48 -right-48 opacity-25"></div>

      <div className="max-w-xl w-full text-center relative z-10 py-12">
        {/* Animated Checkmark Badge */}
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-10 pulse-ai relative">
          <span className="absolute inset-0 rounded-full bg-emerald-500/5 blur-xl"></span>
          <span className="material-symbols-outlined text-emerald-400 text-5xl relative z-10">
            check_circle
          </span>
        </div>

        <h1 className="font-display-lg-mobile md:text-5xl font-extrabold text-text-high-contrast mb-6 leading-tight tracking-tight">
          Compra Aprovada!
        </h1>

        <p className="font-body-lg text-lg text-text-muted mb-8 leading-relaxed max-w-md mx-auto">
          Parabéns! Sua assinatura do <span className="text-primary font-bold">{planNames[plan]}</span> foi ativada.
          Você já está pronto para dominar suas entrevistas com IA de elite.
        </p>

        {isSimulated && (
          <div className="mb-8 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full inline-flex items-center gap-2 text-primary font-label-sm text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Modo Simulação Mercado Pago
          </div>
        )}

        {/* Action Panel */}
        <div className="glass-panel rounded-2xl p-8 mb-10 text-left border-white/10 space-y-6">
          <h3 className="font-headline-md text-xl text-text-high-contrast border-b border-white/15 pb-4">
            Como começar a usar?
          </h3>
          <ol className="space-y-4 text-on-background/90 font-body-md text-sm list-decimal list-inside pl-1">
            <li>Faça o download do aplicativo desktop abaixo correspondente ao seu sistema operacional.</li>
            <li>Instale o arquivo no seu computador (Mac ou Windows).</li>
            <li>Abra o TalkGenius, configure suas preferências (Vaga, Idioma, Modelo) e clique em iniciar.</li>
            <li>Abra sua ferramenta de reuniões (Zoom, Teams, etc.) e o overlay guiará você em tempo real.</li>
          </ol>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => handleDownload("macOS (Apple Silicon)")}
            className="flex-1 px-8 py-4 btn-gradient rounded-full text-[#0A0A0A] font-bold text-md active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xl"
          >
            <span className="material-symbols-outlined">laptop_mac</span>
            Baixar para macOS
          </button>
          <button
            onClick={() => handleDownload("Windows")}
            className="flex-1 px-8 py-4 glass-card rounded-full text-text-high-contrast font-bold text-md hover:bg-white/10 active:scale-95 transition-all border-white/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">desktop_windows</span>
            Baixar para Windows
          </button>
        </div>

        <Link
          href="/"
          className="text-text-muted hover:text-primary transition-all text-sm font-medium underline"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Carregando confirmação...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
