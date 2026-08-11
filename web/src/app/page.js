"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const faqs = [
    {
      question: "Como o TalkGenius funciona em tempo real?",
      answer: "O TalkGenius roda de forma nativa e silenciosa no seu desktop (macOS ou Windows). Ele capta o áudio da chamada (seja do sistema ou do microfone), transcreve em tempo real com alta precisão e exibe insights e sugestões de respostas técnicas ou comportamentais em uma janela flutuante discreta sobre a sua tela."
    },
    {
      question: "O aplicativo é seguro? Minha privacidade está garantida?",
      answer: "Sim, 100%! A privacidade e segurança são prioridades máximas do TalkGenius. Todo o processamento de áudio e transcrição é feito localmente na sua máquina. Nenhum dado de áudio ou texto de suas reuniões é transmitido para servidores na nuvem ou usado para treinar modelos externos. É totalmente privado."
    },
    {
      question: "Ele é indetectável por ferramentas como Zoom, Teams ou Meet?",
      answer: "Absolutamente. O TalkGenius funciona como uma aplicação nativa e independente do sistema, sem necessidade de instalar plugins, extensões ou injetar códigos nas ferramentas de conferência. Ele apenas captura o canal de áudio e renderiza um overlay transparente. Para os aplicativos de chamada, o TalkGenius é totalmente invisível."
    },
    {
      question: "Quais idiomas o TalkGenius suporta?",
      answer: "Suportamos oficialmente 7 idiomas principais: Português, Inglês, Espanhol, Francês, Alemão, Italiano e Japonês. O sistema transcreve a pergunta no idioma falado e oferece sugestões na mesma língua de forma fluida."
    },
    {
      question: "Posso instalar a minha licença em mais de um computador?",
      answer: "Por motivos de segurança e integridade das licenças de uso pessoal, cada chave de ativação é vinculada a um único computador (associada ao ID de hardware exclusivo). Se precisar de acesso em mais de uma máquina, consulte nosso suporte para obter pacotes corporativos ou upgrades com desconto."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

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

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const selectPlan = (plan) => {
    router.push(`/checkout?plan=${plan}`);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden">
      {/* Background Video Call POV & Animated Morphing Liquid Mesh */}
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
        <div className="liquid-orb liquid-orb-1 w-[900px] h-[900px] -top-[10%] -left-[10%]"></div>
        <div className="liquid-orb liquid-orb-2 w-[800px] h-[800px] top-[20%] -right-[15%]"></div>
        <div className="liquid-orb liquid-orb-3 w-[700px] h-[700px] bottom-[20%] left-[5%]"></div>
        <div className="liquid-orb liquid-orb-4 w-[650px] h-[650px] bottom-[-10%] right-[15%]"></div>
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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/features"
              className="text-text-muted hover:text-primary transition-colors font-body-md text-body-md"
            >
              Recursos
            </Link>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, "pricing")}
              className="text-text-muted hover:text-primary transition-colors font-body-md text-body-md"
            >
              Preços
            </a>
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
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-white/10 flex flex-col p-6 gap-6 shadow-2xl animate-fade-in">
            <Link
              href="/features"
              className="text-text-muted hover:text-primary transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, "pricing")}
              className="text-text-muted hover:text-primary transition-colors font-medium text-lg"
            >
              Preços
            </a>
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

      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-28 md:pt-48 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
          {/* Fixed background liquid mesh covers this area */}

          <div className="max-w-container-max mx-auto text-center relative z-10">
            {/* Supported languages tag */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border-primary/40 mb-10 shine-overlay">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary pulse-ai"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Agora com suporte a 7 idiomas
              </span>
            </div>

            <h1 className="text-[30px] md:text-[56px] text-text-high-contrast mb-8 max-w-3xl mx-auto leading-[1.2] tracking-tight font-normal">
              Domine suas entrevistas <br />
              em <span className="text-gradient">7 idiomas</span> com IA
            </h1>

            <p className="font-body-lg text-lg text-gray-200 max-w-4xl mx-auto mb-14 leading-relaxed">
              O assistente de IA premium que roda nativamente no seu Mac ou Windows para te apoiar em tempo real, <br />
              sugerindo <span className="text-primary font-semibold">respostas brilhantes</span> e traduzindo conceitos complexos instantaneamente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto sm:max-w-none">
              <button
                onClick={() => selectPlan("monthly")}
                className="w-full sm:w-auto px-10 py-5 btn-gradient rounded-full text-white font-bold text-body-lg active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl"
              >
                <span className="material-symbols-outlined">download</span>
                Baixar para Desktop
              </button>
              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, "pricing")}
                className="w-full sm:w-auto px-10 py-5 glass-card rounded-full text-text-high-contrast font-bold text-body-lg hover:bg-white/10 active:scale-95 transition-all text-center"
              >
                Ver Planos
              </a>
            </div>
          </div>

          {/* Hero Mockup with enhanced shine */}
          <div className="mt-24 max-w-5xl mx-auto relative group animate-float px-4 md:px-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative glass-card rounded-[2.5rem] overflow-hidden aspect-video border-2 border-white/10 glow-shadow-primary shine-overlay">
              <img
                alt="Futuristic AI interface"
                className="w-full h-full object-cover opacity-95"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhycj0sIl7ypyL62Miv1SNRYoxQD9y9Nfohc9U7OR012d8w5IJNjVVnjpd8kFCNYq2-vrA6ZVWJPa3yPs5VQhPZidDPNwAGVYBospBTgybxPgTI6TEtJGGWiGnVXdBZNpr4AX8uYyUC0nZhlCxXi0jDUOM8NxlcSz5K79zx59QAuqdtZrSKXGodN1IuIrIuuUPiravXAq-KuaeYUJ3ZzGDni9pRMF27qmtfZmJ25lSlrAIqLPTXJmvxuatgc5hebRqBcJgUG8X-h8"
              />
              {/* Floating UI Element with enhanced glassmorphism */}
              <div className="hidden sm:block absolute bottom-10 right-10 w-72 glass-card p-6 rounded-2xl border-white/20 animate-float-subtle shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary/20 border border-secondary/40">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                  </div>
                  <span className="font-bold text-label-sm uppercase tracking-wider text-text-high-contrast">
                    Sugestão TalkGenius
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic">
                  &quot;Com base na sua experiência em Cloud Architecture, você
                  deve destacar sua proficiência em...&quot;
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-text-muted uppercase tracking-tighter">
                    Otimizado por GPT-4o
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section
          className="py-20 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/80 relative overflow-hidden"
          id="features"
        >
          <div className="radial-glow bg-secondary w-[600px] h-[600px] -bottom-60 -left-60 opacity-25"></div>
          <div className="radial-glow bg-primary w-[400px] h-[400px] top-1/4 right-0 opacity-10"></div>

          <div className="max-w-container-max mx-auto relative z-10">
            <div className="mb-20">
              <div className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                Poder Computacional
              </div>
              <h2 className="font-headline-md text-headline-md text-text-high-contrast mb-6 tracking-tight">
                Inteligência que <span className="text-primary">lê o contexto</span>
              </h2>
              <p className="text-text-muted font-body-md max-w-xl text-lg">
                Recursos de ponta desenhados para que você se sinta imparável, não
                importa o desafio da entrevista.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Feature 1: Translation */}
              <div className="md:col-span-8 glass-card p-8 md:p-12 rounded-[3rem] relative overflow-hidden group border-white/10 shine-overlay">
                <div className="relative z-10 flex flex-col justify-end h-full min-h-[300px] md:min-h-[360px]">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-10 animate-float-subtle">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                    <img
                      alt="Real-time translation icon"
                      className="relative w-full h-full object-contain rounded-3xl shadow-2xl border border-white/10"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfFaxiJwTWjOMC_jRj4_LCWBif98fJ7zI-_BRmaE755AiKza4KG7dgcGkEtAY5DfZ2VLQKZjIQSRJ9bUzXTvYmW8xfU72R5qJmWEbKRxqIOElm3H-nY-FBBehIKxAWHz_E8CKnLW88RjVpzq0GSo18YeGpcKWEO-T5Mb5CNOg2YY06RloVifxI-X0faWHHk4bCUc61BU7JI5U5bXQh8Thrx9asiKx3Llv3cYESxOlPBhK68FBYrk8ES4PtV_bCgyhNgv5x3Z5oztY"
                    />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-text-high-contrast mb-5 tracking-tight">
                    Tradução <span className="text-secondary">em tempo real</span>
                  </h3>
                  <p className="text-text-muted max-w-xl text-lg md:text-xl leading-relaxed">
                    Ouça a pergunta em qualquer língua e veja a transcrição e
                    tradução instantânea com latência zero. Nunca mais perca o fio
                    da meada.
                  </p>
                </div>
              </div>

              {/* Feature 2: Suggestions */}
              <div className="md:col-span-4 glass-card p-8 md:p-12 rounded-[3rem] group border-white/10 shine-overlay flex flex-col justify-between">
                <div className="w-20 h-20 mb-10 animate-float">
                  <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"></div>
                  <img
                    alt="Response suggestions icon"
                    className="relative w-full h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjJJNJj7TjuZsvi4gxKu5pwONC_yYXD7l9Jmn1cwBXYpmEs7qXzT0yuvc116QPQo0NY2bDHbkleJLZmRH_Uk88aB2VYANn-E5SVKhAruxuRWxVNGgHW5V005OBg1m30X3rJogUhA-RreDngcanSCtECBzkNgVyJtHHCdzSDbV3GNGlok9Ww8ESnHojqls5mVrEQ4YYNIRT7qs-IrWxHpQ6TxvnfzroCLXNWEtMAkaHvnuqSxIn7MjYOsk6vex5uQRQnsSjxvpsO50"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-text-high-contrast mb-5 tracking-tight">
                    Sugestões de Resposta
                  </h3>
                  <p className="text-text-muted text-md md:text-lg leading-relaxed">
                    A IA analisa o tom do recrutador e sugere tópicos chave baseados
                    no seu currículo para você brilhar.
                  </p>
                </div>
              </div>

              {/* Feature 3: Privacy */}
              <div className="md:col-span-4 glass-card p-8 md:p-12 rounded-[3rem] group border-white/10 shine-overlay text-center md:text-left flex flex-col justify-between">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/30 mx-auto md:mx-0">
                  <span
                    className="material-symbols-outlined text-4xl text-primary"
                    style={{ fontVariationSettings: "'wght' 300" }}
                  >
                    verified_user
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-high-contrast mb-5 tracking-tight">
                    Privacidade Total
                  </h3>
                  <p className="text-text-muted text-md md:text-lg leading-relaxed">
                    O processamento é <span className="text-white font-semibold">100% local</span>. Suas reuniões e dados pessoais nunca tocam a nuvem sem permissão.
                  </p>
                </div>
              </div>

              {/* Feature 4: Languages */}
              <div className="md:col-span-8 glass-card p-8 md:p-12 rounded-[3rem] relative overflow-hidden group border-white/10 shine-overlay">
                <div className="flex flex-col md:flex-row gap-10 items-center h-full">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-text-high-contrast mb-5 tracking-tight">
                      Suporte Multilíngue
                    </h3>
                    <p className="text-text-muted text-md md:text-lg leading-relaxed">
                      Domine entrevistas com suporte oficial aos 7 principais idiomas globais suportados nativamente com latência zero.
                    </p>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-4 justify-center">
                    {["PT-BR", "EN-US", "ES-ES", "FR-FR", "IT-IT", "DE-DE", "JA-JP"].map(
                      (lang) => (
                        <span
                          key={lang}
                          className="px-6 py-3 rounded-2xl bg-primary/20 text-primary text-sm font-bold border border-primary/30 backdrop-blur-md hover:bg-primary hover:text-on-primary transition-all cursor-default"
                        >
                          {lang}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 md:py-32 px-margin-mobile md:px-margin-desktop relative" id="pricing">
          <div className="radial-glow bg-primary w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>

          <div className="max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-[54px] font-extrabold text-text-high-contrast mb-6 tracking-tight leading-tight">
                Planos para o seu <span className="text-gradient">próximo nível</span>
              </h2>
              <p className="text-text-muted max-w-xl mx-auto text-lg">
                O investimento necessário para garantir aquela vaga dos sonhos em
                dólares ou euros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
              {/* Weekly Plan */}
              <div className="glass-card p-10 md:p-12 rounded-[3.5rem] border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-all duration-500 group shine-overlay">
                <div>
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-text-high-contrast mb-3 tracking-tight">
                      Plano Semanal
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-text-high-contrast">
                        R$ 59,90
                      </span>
                      <span className="text-text-muted font-medium">/semana</span>
                    </div>
                  </div>

                  <ul className="space-y-6 mb-12">
                    <li className="flex items-center gap-4 text-text-muted text-lg">
                      <span className="material-symbols-outlined text-secondary font-bold">
                        check_circle
                      </span>
                      Até 2 entrevistas completas
                    </li>
                    <li className="flex items-center gap-4 text-text-muted text-lg">
                      <span className="material-symbols-outlined text-secondary font-bold">
                        check_circle
                      </span>
                      Suporte
                    </li>
                    <li className="flex items-center gap-4 text-text-muted text-lg">
                      <span className="material-symbols-outlined text-secondary font-bold">
                        check_circle
                      </span>
                      Todos os 7 Idiomas
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => selectPlan("weekly")}
                  className="w-full py-5 rounded-2xl border-2 border-white/10 font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all text-text-high-contrast"
                >
                  Escolher Semanal
                </button>
              </div>

              {/* Monthly Plan (Featured) */}
              <div className="glass-card p-10 md:p-12 rounded-[3.5rem] border-primary/50 relative overflow-hidden flex flex-col justify-between md:scale-105 glow-shadow-primary z-10 bg-surface-container-high/80 shine-overlay">
                <div className="absolute top-0 right-0 px-8 py-3 bg-primary text-on-primary font-bold text-xs uppercase tracking-[0.2em] rounded-bl-[2rem] shadow-lg">
                  Mais Popular
                </div>

                <div>
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-text-high-contrast mb-3 tracking-tight">
                      Plano Mensal
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-text-high-contrast">
                        R$ 99,00
                      </span>
                      <span className="text-text-muted font-medium">/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-6 mb-12">
                    <li className="flex items-center gap-4 text-text-high-contrast text-lg font-medium">
                      <span
                        className="material-symbols-outlined text-primary font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Até 5 entrevistas completas
                    </li>
                    <li className="flex items-center gap-4 text-text-high-contrast text-lg font-medium">
                      <span
                        className="material-symbols-outlined text-primary font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Prioridade no Processamento
                    </li>
                    <li className="flex items-center gap-4 text-text-high-contrast text-lg font-medium">
                      <span
                        className="material-symbols-outlined text-primary font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Suporte
                    </li>
                    <li className="flex items-center gap-4 text-text-high-contrast text-lg font-medium">
                      <span
                        className="material-symbols-outlined text-primary font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      Guia de Método STAR IA
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => selectPlan("monthly")}
                  className="w-full py-6 rounded-2xl btn-gradient font-bold text-white shadow-2xl text-xl"
                >
                  Assinar Mensal
                </button>
              </div>
            </div>

            <p className="text-center mt-24 text-label-sm text-text-muted uppercase tracking-[0.3em] font-black opacity-60">
              Licença individual limitada a 1 computador
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-32 bg-surface-dim/95 relative overflow-hidden">
          <div className="radial-glow bg-secondary w-[500px] h-[500px] -top-20 -right-40 opacity-10"></div>

          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  text: ' "Consegui minha vaga na Google de Berlim usando o TalkGenius. O delay é imperceptível e as sugestões técnicas foram cruciais." ',
                  name: "Lucas Silva",
                  title: "Senior Dev @ Google",
                  gradient: "from-primary to-secondary",
                  iconColor: "text-primary",
                },
                {
                  text: ' "A melhor ferramenta para quem aplica para vagas no exterior. Transmite uma segurança absurda durante a call." ',
                  name: "Marina Rocha",
                  title: "Product Designer @ Revolut",
                  gradient: "from-secondary to-tertiary",
                  iconColor: "text-secondary",
                },
                {
                  text: ' "Fiquei surpreso com o quanto a IA entende o contexto comportamental. Me ajudou a estruturar tudo no método STAR." ',
                  name: "Felipe Neves",
                  title: "Cloud Specialist @ AWS",
                  gradient: "from-tertiary to-primary",
                  iconColor: "text-tertiary",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="glass-card p-10 md:p-12 rounded-[2.5rem] italic text-on-surface-variant relative border-white/10 text-lg leading-relaxed shine-overlay flex flex-col justify-between"
                >
                  <p>{t.text}</p>
                  <div className="mt-10 flex items-center gap-5 non-italic">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${t.gradient} p-[2px]`}>
                      <div className="w-full h-full rounded-full bg-surface-container flex items-center justify-center overflow-hidden">
                        <span className={`material-symbols-outlined ${t.iconColor}`}>
                          person
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-text-high-contrast text-md">
                        {t.name}
                      </div>
                      <div className={`text-xs uppercase tracking-widest ${t.iconColor} font-bold`}>
                        {t.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 px-margin-mobile md:px-margin-desktop relative overflow-hidden" id="faq">
          <div className="radial-glow bg-primary w-[600px] h-[600px] -top-60 -right-60 opacity-10"></div>
          <div className="radial-glow bg-secondary w-[500px] h-[500px] bottom-0 -left-60 opacity-10"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <div className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                Dúvidas Comuns
              </div>
              <h2 className="text-4xl md:text-[54px] font-extrabold text-text-high-contrast mb-6 tracking-tight leading-tight">
                Perguntas <span className="text-gradient">Frequentes</span>
              </h2>
              <p className="text-text-muted font-body-md max-w-xl mx-auto text-lg">
                Esclareça suas principais dúvidas sobre o funcionamento, privacidade e termos de uso do TalkGenius.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => {
                const isOpen = activeFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="glass-card rounded-[2rem] border-white/5 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-8 px-8 md:px-12 flex justify-between items-center text-left gap-6 cursor-pointer focus:outline-none"
                    >
                      <span className="font-bold text-lg md:text-xl text-text-high-contrast select-none">
                        {faq.question}
                      </span>
                      <span
                        className={`material-symbols-outlined text-primary transition-transform duration-300 text-2xl ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <p className="py-8 px-8 md:px-12 text-on-surface-variant font-body-md text-md md:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-36 px-margin-mobile relative overflow-hidden">
          <div className="radial-glow bg-primary w-[800px] h-[800px] -bottom-40 left-0 opacity-20"></div>
          <div className="radial-glow bg-secondary w-[600px] h-[600px] -top-40 right-0 opacity-20"></div>

          <div className="max-w-5xl mx-auto text-center glass-card p-12 md:p-32 rounded-[5rem] border-primary/30 relative glow-shadow-primary shine-overlay overflow-visible">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary rounded-3xl rotate-12 flex items-center justify-center shadow-2xl animate-float">
              <span
                className="material-symbols-outlined text-white text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
            </div>

            <h2 className="text-4xl md:text-7xl font-bold text-text-high-contrast mb-10 leading-tight tracking-tight mt-6 sm:mt-0">
              Seu emprego global começa <span className="text-gradient">agora</span>
            </h2>

            <p className="text-lg md:text-xl text-text-muted mb-16 max-w-2xl mx-auto leading-relaxed">
              Junte-se a elite profissional que já está dominando o mercado global
              com a assistência premium do TalkGenius.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-md mx-auto sm:max-w-none">
              <button
                onClick={() => selectPlan("monthly")}
                className="w-full sm:w-auto px-12 py-5 btn-gradient rounded-full text-white font-bold text-xl active:scale-95 transition-all shadow-primary/40 shadow-2xl flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">download</span>
                Download TalkGenius
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 md:py-20 bg-surface-container-lowest border-t border-white/10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="font-headline-md text-headline-md font-bold text-text-high-contrast tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-lg">
                <span
                  className="material-symbols-outlined text-white text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>
              TalkGenius
            </div>
            <p className="text-text-muted font-body-md text-lg max-w-sm leading-relaxed">
              A ferramenta definitiva para profissionais que buscam excelência em
              comunicações globais. IA processada localmente para sua segurança.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-8">
            <h4 className="text-text-high-contrast font-bold uppercase tracking-[0.2em] text-sm">
              Explorar
            </h4>
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  className="text-text-muted hover:text-primary transition-colors font-medium text-md"
                  href="/privacy"
                >
                  Políticas de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-muted hover:text-primary transition-colors font-medium text-md"
                  href="/terms"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-muted hover:text-primary transition-colors font-medium text-md"
                  href="/support"
                >
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <a
                  className="text-text-muted hover:text-primary transition-colors font-medium text-md cursor-pointer"
                  href="#faq"
                  onClick={(e) => scrollToSection(e, "faq")}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col gap-8">
            <h4 className="text-text-high-contrast font-bold uppercase tracking-[0.2em] text-sm">
              Newsletter VIP
            </h4>
            <p className="text-text-muted font-body-md leading-relaxed">
              Dicas semanais de carreira global e novidades exclusivas de IA.
            </p>
            <div className="flex gap-3">
              <input
                className="flex-1 bg-surface-container-low border-2 border-white/10 rounded-2xl px-6 py-4 text-md focus:border-primary/50 outline-none transition-all placeholder:text-text-muted/40 text-white"
                placeholder="Seu e-mail profissional"
                type="email"
              />
              <button className="bg-primary/20 hover:bg-primary text-primary hover:text-on-primary px-8 py-4 rounded-2xl font-black text-md transition-all border border-primary/40 shadow-lg">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted font-label-sm text-[11px] opacity-40 uppercase tracking-[0.3em] order-2 md:order-1 text-center md:text-left">
            © 2026 TalkGenius Intelligence. Engineered for Professionals.
          </p>
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
