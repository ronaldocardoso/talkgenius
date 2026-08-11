"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Support() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden">
      <div className="lumina-bg"></div>
      {/* Background Video Call POV */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
          style={{ mixBlendMode: "screen", opacity: 0.12 }}
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
              href="/features"
              className="text-text-muted hover:text-primary transition-colors font-body-md text-body-md"
            >
              Recursos
            </Link>
            <Link
              href="/support"
              className="text-primary hover:text-primary transition-colors font-body-md text-body-md font-bold"
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
              href="/features"
              className="text-text-muted hover:text-primary transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              href="/support"
              className="text-primary hover:text-primary transition-colors font-medium text-lg font-bold"
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

      <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop container mx-auto">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-24 mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span
              className="material-symbols-outlined text-[14px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              Suporte Inteligente
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 bg-gradient-to-b from-text-high-contrast to-text-muted bg-clip-text text-transparent tracking-tight">
            Suporte TalkGenius
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Estamos aqui para garantir que sua jornada rumo à próxima conquista seja
            impecável. Encontre soluções rápidas ou entre em contato com nossos
            especialistas.
          </p>
        </section>

        {/* Support Categories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-32">
          {/* Card 1 */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <span className="material-symbols-outlined text-primary">
                  account_circle
                </span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl mb-3 text-text-high-contrast">
                Conta e Acesso
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Gerencie sua assinatura, recupere senhas e configure seu hardware
                ID para acesso multiplataforma.
              </p>
            </div>
            <a
              className="font-label-sm text-label-sm text-primary flex items-center gap-2 group/link cursor-pointer hover:underline"
              href="#"
            >
              Explorar Base de Conhecimento
              <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-6 border border-secondary/30 group-hover:bg-secondary/40 transition-colors">
                <span className="material-symbols-outlined text-secondary">
                  terminal
                </span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl mb-3 text-text-high-contrast">
                Suporte Técnico
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Resolução de problemas, guias de instalação para Windows/Mac e
                otimização de latência de IA.
              </p>
            </div>
            <a
              className="font-label-sm text-label-sm text-secondary flex items-center gap-2 group/link cursor-pointer hover:underline"
              href="#"
            >
              Verificar Status do Sistema
              <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-tertiary/20 flex items-center justify-center mb-6 border border-tertiary/30 group-hover:bg-tertiary/40 transition-colors">
                <span className="material-symbols-outlined text-tertiary">
                  payments
                </span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl mb-3 text-text-high-contrast">
                Faturamento
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Acesse faturas, altere métodos de pagamento ou faça o upgrade do
                seu plano para o nível Enterprise.
              </p>
            </div>
            <a
              className="font-label-sm text-label-sm text-tertiary flex items-center gap-2 group/link cursor-pointer hover:underline"
              href="#"
            >
              Gerenciar Pagamentos
              <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div>
            <h2 className="font-headline-md text-headline-md text-text-high-contrast mb-6 tracking-tight">
              Envie uma mensagem
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Não encontrou o que procurava? Nossa equipe de elite responderá em
              até 24 horas úteis.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    mail
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-text-high-contrast">
                    Email Direto
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    support@talkgenius.ai
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <span className="material-symbols-outlined text-secondary">
                    schedule
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-text-high-contrast">
                    Horário de Atendimento
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Segunda a Sexta, 09:00 - 18:00 BRT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -mr-16 -mt-16"></div>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-text-muted">
                    Nome
                  </label>
                  <input
                    required
                    className="w-full bg-background border border-white/15 rounded-lg px-4 py-3 font-body-md text-body-md text-white focus:border-secondary focus:ring-0 outline-none transition-all"
                    placeholder="Seu nome completo"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-text-muted">
                    Email Profissional
                  </label>
                  <input
                    required
                    className="w-full bg-background border border-white/15 rounded-lg px-4 py-3 font-body-md text-body-md text-white focus:border-secondary focus:ring-0 outline-none transition-all"
                    placeholder="nome@empresa.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-text-muted">
                  Assunto
                </label>
                <select className="w-full bg-background border border-white/15 rounded-lg px-4 py-3 font-body-md text-body-md text-white focus:border-secondary focus:ring-0 outline-none transition-all appearance-none cursor-pointer">
                  <option>Selecione uma categoria</option>
                  <option>Suporte Técnico</option>
                  <option>Vendas e Planos</option>
                  <option>Feedback e Sugestões</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-text-muted">
                  Mensagem
                </label>
                <textarea
                  required
                  className="w-full bg-background border border-white/15 rounded-lg px-4 py-3 font-body-md text-body-md text-white focus:border-secondary focus:ring-0 outline-none transition-all resize-none"
                  placeholder="Como podemos ajudar?"
                  rows={4}
                ></textarea>
              </div>

              {formSubmitted && (
                <div className="p-4 bg-secondary/10 border border-secondary/35 rounded-lg text-secondary text-sm font-bold text-center">
                  Mensagem enviada com sucesso!
                </div>
              )}

              <button
                className="w-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-fixed font-headline-md text-label-sm py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-white shadow-lg"
                type="submit"
              >
                Enviar Mensagem
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </section>

        {/* Direct Help / Documentation CTA */}
        <section className="glass-card rounded-3xl p-[1px] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 overflow-hidden">
          <div className="bg-surface-container-lowest/80 rounded-[23px] px-8 py-12 md:py-16 text-center">
            <h2 className="font-headline-md text-2xl md:text-3xl text-text-high-contrast mb-4">
              Precisa de ajuda imediata?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto leading-relaxed">
              Nossa documentação completa e fórum da comunidade estão disponíveis
              24/7 para que você nunca perca o ritmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                className="px-8 py-4 rounded-full border border-primary/40 text-primary font-label-sm text-label-sm hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
                Ver Documentação
              </a>
              <a
                className="px-8 py-4 rounded-full border border-secondary/40 text-secondary font-label-sm text-label-sm hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">
                  groups
                </span>
                Comunidade TalkGenius
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop border-t border-border-subtle bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-gutter mb-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-headline-md text-headline-md text-primary font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-xl">
                  auto_awesome
                </span>
              </div>
              TalkGenius
            </div>
            <p className="font-label-sm text-label-sm text-text-muted">
              © 2026 TalkGenius AI. Intelligence in Motion.
            </p>
          </div>
          <div className="flex gap-8">
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
              Security
            </Link>
          </div>
        </div>

        <div className="max-w-container-max mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
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
