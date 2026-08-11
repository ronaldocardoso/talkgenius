"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Features() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden bg-mesh">
      {/* Background Video Call POV */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8]"
          style={{ mixBlendMode: "screen", opacity: 0.24 }}
        >
          <source src="/modelo-app.mp4" type="video/mp4" />
        </video>
      </div>
      {/* TopNavBar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/90 backdrop-blur-3xl shadow-2xl border-white/10 py-3"
            : "bg-background/60 backdrop-blur-3xl border-white/5 py-5"
        }`}
      >
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold text-text-high-contrast tracking-tighter flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-white text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
            </div>
            TalkGenius
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-text-muted hover:text-primary transition-colors font-body-md text-body-md"
            >
              Início
            </Link>
            <Link
              href="/#pricing"
              className="text-text-muted hover:text-primary transition-colors font-body-md text-body-md"
            >
              Preços
            </Link>
            <Link
              href="/support"
              className="text-text-muted hover:text-primary transition-colors font-body-md text-body-md"
            >
              Suporte
            </Link>
            <Link
              href="/checkout?plan=monthly"
              className="px-8 py-2.5 btn-gradient rounded-full text-white font-bold text-body-md shadow-lg"
            >
              Começar Agora
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-text-high-contrast"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-white/10 flex flex-col p-6 gap-6 shadow-2xl">
            <Link
              href="/"
              className="text-text-muted hover:text-primary transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/#pricing"
              className="text-text-muted hover:text-primary transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Preços
            </Link>
            <Link
              href="/support"
              className="text-text-muted hover:text-primary transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Suporte
            </Link>
            <Link
              href="/checkout?plan=monthly"
              className="w-full text-center py-4 btn-gradient rounded-full text-white font-bold text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Começar Agora
            </Link>
          </div>
        )}
      </nav>

      <main className="pt-38 pb-24 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-20 mt-32">
          {/* Background Orbs (iOS 27 style) */}
          <div className="orb orb-purple w-[500px] h-[500px] -top-24 -left-24 opacity-25"></div>
          <div className="orb orb-cyan w-[400px] h-[400px] top-[40%] right-[-100px] opacity-20"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                Inteligência de Próxima Geração
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-text-high-contrast mb-8 leading-none tracking-tight">
              Poder computacional a serviço da{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                sua carreira
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto mb-12">
              Potencialize suas entrevistas e reuniões globais com um assistente
              silencioso, processado localmente e totalmente focado no seu
              desempenho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none">
              <Link
                href="/checkout?plan=monthly"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
              >
                Começar agora gratuitamente
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/#pricing"
                className="px-8 py-4 rounded-full border border-border-subtle bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors text-center"
              >
                Ver planos
              </Link>
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Real-time Translation */}
            <div className="md:col-span-7 glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 overflow-hidden group">
              <div className="flex-1 space-y-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-3xl">
                    translate
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-high-contrast">
                  Tradução em Tempo Real
                </h2>
                <p className="text-text-muted font-body-md text-body-md leading-relaxed">
                  Quebre as barreiras linguísticas instantaneamente. Nossa IA
                  traduz e transcreve diálogos complexos com precisão de 99.9%,
                  permitindo que você foque na conexão, não no dicionário.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      check_circle
                    </span>
                    Suporte para 7 idiomas
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      check_circle
                    </span>
                    Latência inferior a 100ms
                  </li>
                </ul>
              </div>
              <div className="flex-1 relative min-h-[260px] md:min-h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 bg-secondary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Real-time translation interface"
                  className="w-full h-auto object-contain relative z-10 neon-glow-cyan drop-shadow-2xl"
                  src="/real-time-translation.jpg"
                />
              </div>
            </div>

            {/* Smart Response */}
            <div className="md:col-span-5 glass-card rounded-3xl p-8 md:p-12 flex flex-col justify-between group">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    psychology
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-high-contrast mb-4">
                  Sugestões Inteligentes
                </h2>
                <p className="text-text-muted font-body-md text-body-md leading-relaxed">
                  Receba prompts sutis baseados no contexto da conversa. A IA
                  analisa as perguntas do entrevistador e sugere pontos-chave do seu
                  currículo.
                </p>
              </div>
              <div className="relative flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Smart AI brain neural connections"
                  className="w-48 h-48 md:w-60 md:h-60 object-contain relative z-10 neon-glow-purple"
                  src="/smart-ai-brain.jpg"
                />
              </div>
            </div>

            {/* Bento Row 2 */}
            <div className="md:col-span-4 glass-card rounded-3xl p-8 md:p-12 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-9xl">lock</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-2xl text-text-high-contrast mb-4">
                  Privacidade Total
                </h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  Processamento 100% local. Seus áudios e dados nunca saem da sua
                  máquina. Segurança de nível empresarial para sua tranquilidade.
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined">shield</span>
                <span className="text-sm">End-to-End Local AI</span>
              </div>
            </div>

            {/* Platform support */}
            <div className="md:col-span-8 glass-card rounded-3xl p-8 md:p-12 group flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <h3 className="font-headline-md text-2xl text-text-high-contrast mb-4">
                  Suporte Multiplataforma
                </h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  TalkGenius integra-se nativamente com as principais ferramentas de
                  videoconferência. Sincronização perfeita entre dispositivos
                  Windows e Mac.
                </p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-white hover:text-secondary transition-all cursor-default">
                    <span className="material-symbols-outlined text-3xl">
                      desktop_windows
                    </span>
                    <span className="font-bold">Windows</span>
                  </div>
                  <div className="flex items-center gap-2 text-white hover:text-primary transition-all cursor-default">
                    <span className="material-symbols-outlined text-3xl">
                      laptop_mac
                    </span>
                    <span className="font-bold">macOS</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                {[
                  { icon: "videocam", name: "Zoom", color: "text-secondary" },
                  { icon: "groups", name: "Teams", color: "text-primary" },
                  { icon: "call", name: "Meet", color: "text-tertiary" },
                  { icon: "chat", name: "Slack", color: "text-secondary" },
                ].map((app) => (
                  <div
                    key={app.name}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <span className={`material-symbols-outlined text-3xl ${app.color}`}>
                      {app.icon}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-widest text-text-muted">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="relative p-10 md:p-24 rounded-3xl overflow-hidden glass-card border-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
            <div className="relative z-10 text-center space-y-8">
              <h2 className="font-headline-md text-3xl md:text-5xl text-text-high-contrast">
                Pronto para elevar seu nível?
              </h2>
              <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
                Junte-se a mais de 10.000 profissionais que já estão usando a
                TalkGenius para conquistar cargos em empresas globais.
              </p>
              <div className="pt-4">
                <Link
                  href="/checkout?plan=monthly"
                  className="inline-block px-12 py-5 rounded-full bg-text-high-contrast text-background font-extrabold hover:bg-primary hover:text-on-primary transition-all text-lg active:scale-95 duration-300"
                >
                  Comece Agora
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-surface-dim border-t border-border-subtle mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto items-center text-center md:text-left mb-12">
          <div className="font-headline-md text-headline-md font-bold text-text-high-contrast tracking-tighter flex items-center justify-center md:justify-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-xl">
                auto_awesome
              </span>
            </div>
            TalkGenius
          </div>
          <div className="flex flex-wrap justify-center gap-6 my-6 md:my-0">
            <Link
              className="font-label-sm text-label-sm text-text-muted hover:text-secondary transition-colors opacity-80 hover:opacity-100"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-label-sm text-label-sm text-text-muted hover:text-secondary transition-colors opacity-80 hover:opacity-100"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="font-label-sm text-label-sm text-text-muted hover:text-secondary transition-colors opacity-80 hover:opacity-100"
              href="/support"
            >
              Contact Support
            </Link>
          </div>
          <div className="md:text-right">
            <p className="font-label-sm text-label-sm text-text-muted">
              © 2026 TalkGenius AI. Limited to 1 computer per user.
            </p>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-text-muted font-label-sm text-[11px] opacity-40 uppercase tracking-[0.3em] order-2 md:order-1 text-center md:text-left">
            TalkGenius AI. Engineered for Professionals.
          </div>
          <div className="flex flex-row items-center gap-3.5 order-1 md:order-2 shrink-0">
            <span className="text-text-muted font-label-sm text-[10px] uppercase tracking-[0.15em] opacity-60">
              pague com:
            </span>
            <div className="flex items-center gap-3">
              <img
                alt="Visa"
                className="h-6 opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                src="https://cdn.simpleicons.org/visa"
              />
              <img
                alt="Mastercard"
                className="h-6 opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                src="https://cdn.simpleicons.org/mastercard"
              />
              <img
                alt="Diners Club"
                className="h-6 opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                src="https://cdn.simpleicons.org/dinersclub"
              />
              <img
                alt="American Express"
                className="h-6 opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                src="https://cdn.simpleicons.org/americanexpress"
              />
              <img
                alt="Pix"
                className="h-6 opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                src="https://cdn.simpleicons.org/pix"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
