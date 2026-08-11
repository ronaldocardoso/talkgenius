"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawPlan = searchParams.get("plan");
  const [selectedPlan, setSelectedPlan] = useState(rawPlan === "weekly" ? "weekly" : "monthly");

  useEffect(() => {
    const raw = searchParams.get("plan");
    if (raw === "weekly" || raw === "monthly") {
      setSelectedPlan(raw);
    }
  }, [searchParams]);

  // Payment states
  const [activeTab, setActiveTab] = useState("card");
  const [loading, setLoading] = useState(false);
  
  // Buyer info states
  const [payerName, setPayerName] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [payerCpf, setPayerCpf] = useState("");

  // Card states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Pix states
  const [pixQrCode, setPixQrCode] = useState("");
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [pixGenerated, setPixGenerated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [copied, setCopied] = useState(false);

  // Plan metadata details
  const planDetails = {
    weekly: {
      name: "Plano Semanal",
      price: "R$ 59,90",
      period: "por semana",
      features: [
        "Até 2 entrevistas completas",
        "Suporte",
        "Todos os 7 Idiomas",
        "Processamento local privado",
      ],
    },
    monthly: {
      name: "Plano Mensal",
      price: "R$ 99,00",
      period: "por mês",
      features: [
        "Até 5 entrevistas completas",
        "Prioridade no Processamento",
        "Suporte",
        "Guia de Método STAR IA",
        "Acesso à comunidade TalkGenius",
      ],
    },
  };

  const currentPlan = planDetails[selectedPlan];

  // Pix status polling
  useEffect(() => {
    let interval;
    if (paymentId && paymentStatus === "pending") {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/checkout/status?id=${paymentId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === "approved") {
              setPaymentStatus("approved");
              clearInterval(interval);
              setTimeout(() => {
                router.push(`/checkout/success?plan=${selectedPlan}&simulated=${data.simulated ? "true" : "false"}`);
              }, 1500);
            }
          }
        } catch (err) {
          console.error("Erro ao verificar status de pagamento:", err);
        }
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentId, paymentStatus, selectedPlan, router]);

  const copyToClipboard = () => {
    if (!pixQrCode) return;
    navigator.clipboard.writeText(pixQrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCheckStatus = async () => {
    if (!paymentId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/checkout/status?id=${paymentId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.status === "approved") {
          setPaymentStatus("approved");
          setTimeout(() => {
            router.push(`/checkout/success?plan=${selectedPlan}&simulated=${data.simulated ? "true" : "false"}`);
          }, 1000);
        } else {
          alert("O pagamento ainda está pendente. Por favor, conclua a transferência no seu Pix para prosseguir.");
        }
      } else {
        alert("Não foi possível verificar o status do pagamento. Tente novamente em alguns segundos.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao verificar status.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let cardToken = "";
    let paymentMethodId = "";
    
    const mpPublicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

    if (activeTab === "card" && mpPublicKey) {
      try {
        const mp = new window.MercadoPago(mpPublicKey, { locale: "pt-BR" });
        
        // Find card brand using BIN (first 6 digits)
        const bin = cardNumber.replace(/\D/g, "").substring(0, 6);
        let detectedMethod = "visa";
        if (bin.length >= 6) {
          const guessRes = await fetch(
            `https://api.mercadopago.com/v1/payment_methods/search?public_key=${mpPublicKey}&bins=${bin}`
          );
          if (guessRes.ok) {
            const guessData = await guessRes.json();
            if (guessData.results && guessData.results.length > 0) {
              detectedMethod = guessData.results[0].id;
            }
          }
        }
        paymentMethodId = detectedMethod;

        // Parse expiry MM/YY
        const [expiryMonth, expiryYear] = cardExpiry.split("/");
        if (!expiryMonth || !expiryYear) {
          throw new Error("Data de vencimento inválida. Use o formato MM/AA.");
        }
        const fullYear = expiryYear.length === 2 ? `20${expiryYear}` : expiryYear;

        // Tokenize card securely using Mercado Pago Client REST API
        const tokenRes = await fetch(
          `https://api.mercadopago.com/v1/card_tokens?public_key=${mpPublicKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              card_number: cardNumber.replace(/\D/g, ""),
              expiration_month: parseInt(expiryMonth, 10),
              expiration_year: parseInt(fullYear, 10),
              security_code: cardCvv.trim(),
              cardholder: {
                name: cardName.trim(),
                identification: {
                  type: "CPF",
                  number: payerCpf.replace(/\D/g, ""),
                },
              },
            }),
          }
        );

        if (!tokenRes.ok) {
          const errData = await tokenRes.json();
          throw new Error(errData.message || "Erro na validação do cartão. Verifique o número e CVV.");
        }

        const tokenData = await tokenRes.json();
        cardToken = tokenData.id;
      } catch (err) {
        console.error(err);
        alert(`Erro de validação do cartão: ${err.message}`);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan,
          payment_method: activeTab,
          email: payerEmail,
          cpf: payerCpf,
          name: payerName,
          card_token: cardToken,
          payment_method_id: paymentMethodId,
          installments: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao processar pagamento.");
      }

      const data = await response.json();

      if (activeTab === "card") {
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("URL de sucesso não retornada pelo servidor.");
        }
      } else if (activeTab === "pix") {
        setPixQrCode(data.qr_code);
        setPixQrCodeBase64(data.qr_code_base64);
        setPaymentId(data.payment_id);
        setPixGenerated(true);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Houve um erro ao processar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col relative bg-[#0A0A0A] text-[#e5e2e1]">
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="lazyOnload" />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full bg-primary/15 blur-[160px]"></div>
        <div className="absolute -bottom-48 -right-48 w-[800px] h-[800px] rounded-full bg-secondary/15 blur-[160px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/10 h-20 px-margin-mobile md:px-margin-desktop flex justify-between items-center max-w-container-max mx-auto left-0 right-0">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-text-high-contrast tracking-tighter">
          TalkGenius
        </Link>
        <div className="flex gap-8 items-center">
          <span className="font-label-sm text-label-sm text-text-muted flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            Secure Checkout
          </span>
        </div>
      </nav>

      {/* Checkout Container */}
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Order Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="font-headline-md text-headline-md text-text-high-contrast mb-4">
                Finalize seu plano
              </h1>
              <p className="font-body-md text-body-md text-text-muted">
                Desbloqueie todo o poder da inteligência artificial para suas entrevistas agora mesmo.
              </p>
            </div>

            {/* Plan Selector Toggle */}
            <div className="space-y-3">
              <label className="font-label-sm text-label-sm text-text-muted px-1 uppercase tracking-wider text-[11px] font-bold">
                Escolha o plano de assinatura:
              </label>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5 flex gap-2 w-full">
                <button
                  type="button"
                  className={`flex-1 py-3.5 px-4 rounded-xl text-center font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    selectedPlan === "monthly"
                      ? "bg-gradient-to-r from-primary to-secondary text-[#0A0A0A] shadow-[0_4px_15px_rgba(167,139,250,0.25)] scale-[1.01]"
                      : "bg-transparent text-text-muted hover:text-text-high-contrast"
                  }`}
                  onClick={() => {
                    setSelectedPlan("monthly");
                    router.replace(`/checkout?plan=monthly`, { scroll: false });
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  Mensal (R$ 99,00)
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3.5 px-4 rounded-xl text-center font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    selectedPlan === "weekly"
                      ? "bg-gradient-to-r from-primary to-secondary text-[#0A0A0A] shadow-[0_4px_15px_rgba(167,139,250,0.25)] scale-[1.01]"
                      : "bg-transparent text-text-muted hover:text-text-high-contrast"
                  }`}
                  onClick={() => {
                    setSelectedPlan("weekly");
                    router.replace(`/checkout?plan=weekly`, { scroll: false });
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">date_range</span>
                  Semanal (R$ 59,90)
                </button>
              </div>
            </div>

            {/* Plan Card with enhanced Glassmorphism */}
            <div className="glass-panel rounded-xl p-8 space-y-6 gradient-border-top animate-glow-pulse">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-2 block">
                    Assinatura Premium
                  </span>
                  <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-high-contrast">
                    {currentPlan.name}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md text-secondary text-2xl md:text-3xl font-bold">
                    {currentPlan.price}
                  </span>
                  <span className="block font-label-sm text-label-sm text-text-muted mt-1">
                    {currentPlan.period}
                  </span>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                {currentPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-body-md text-body-md">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-primary/10 rounded-lg p-4 border border-primary/30 flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  info
                </span>
                <p className="font-label-sm text-label-sm text-on-background/80 leading-relaxed">
                  Licença limitada a 1 computador. As sessões são vinculadas ao seu ID de hardware exclusivo por motivos de segurança.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-text-muted opacity-70">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span className="font-label-sm text-label-sm">Criptografia SSL Segura</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted opacity-70">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
                <span className="font-label-sm text-label-sm">PCI Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-xl p-8 md:p-12">
              {!pixGenerated ? (
                <form onSubmit={handlePaymentSubmit} className="space-y-8">
                  {/* Step 1: Personal Details */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-text-high-contrast flex items-center gap-2 border-b border-white/10 pb-4">
                      <span className="material-symbols-outlined text-primary">person</span>
                      1. Dados Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-label-sm text-label-sm text-text-muted px-1">
                          Nome Completo
                        </label>
                        <input
                          required
                          type="text"
                          value={payerName}
                          onChange={(e) => {
                            setPayerName(e.target.value);
                            if (!cardName) setCardName(e.target.value);
                          }}
                          className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                          placeholder="Ex: João da Silva"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-sm text-label-sm text-text-muted px-1">
                          E-mail para Receber Acesso
                        </label>
                        <input
                          required
                          type="email"
                          value={payerEmail}
                          onChange={(e) => setPayerEmail(e.target.value)}
                          className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                          placeholder="Ex: joao@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-text-muted px-1">
                        CPF (faturamento seguro)
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={14}
                        value={payerCpf}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length > 11) value = value.substring(0, 11);
                          if (value.length > 9) {
                            value = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9)}`;
                          } else if (value.length > 6) {
                            value = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6)}`;
                          } else if (value.length > 3) {
                            value = `${value.substring(0, 3)}.${value.substring(3)}`;
                          }
                          setPayerCpf(value);
                        }}
                        className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  {/* Step 2: Payment Details */}
                  <div className="space-y-6 border-t border-white/10 pt-8">
                    <h3 className="text-lg font-bold text-text-high-contrast flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary">payments</span>
                      2. Forma de Pagamento
                    </h3>
                    
                    <div className="flex gap-4 mb-8">
                      <button
                        type="button"
                        className={`flex-1 py-4 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          activeTab === "card"
                            ? "bg-white/5 border border-primary text-primary shadow-[0_0_15px_rgba(167,139,250,0.15)]"
                            : "bg-transparent border border-border-subtle text-text-muted hover:bg-white/5"
                        }`}
                        onClick={() => setActiveTab("card")}
                      >
                        <span className="material-symbols-outlined">credit_card</span>
                        <span className="font-label-sm text-label-sm">Cartão de Crédito</span>
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-4 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          activeTab === "pix"
                            ? "bg-white/5 border border-primary text-primary shadow-[0_0_15px_rgba(167,139,250,0.15)]"
                            : "bg-transparent border border-border-subtle text-text-muted hover:bg-white/5"
                        }`}
                        onClick={() => setActiveTab("pix")}
                      >
                        <span className="material-symbols-outlined">qr_code</span>
                        <span className="font-label-sm text-label-sm">Pix</span>
                      </button>
                    </div>

                    {/* Credit Card Specific Inputs */}
                    {activeTab === "card" && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="font-label-sm text-label-sm text-text-muted px-1">
                            Nome do Titular do Cartão
                          </label>
                          <input
                            required
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                            placeholder="Nome impresso no cartão"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="font-label-sm text-label-sm text-text-muted px-1">
                            Número do Cartão
                          </label>
                          <div className="relative">
                            <input
                              required
                              type="text"
                              maxLength={19}
                              value={cardNumber}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, "");
                                let formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
                                setCardNumber(formatted);
                              }}
                              className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                              placeholder="0000 0000 0000 0000"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                              <span className="material-symbols-outlined text-text-muted opacity-50">credit_card</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="font-label-sm text-label-sm text-text-muted px-1">
                              Vencimento (MM/AA)
                            </label>
                            <input
                              required
                              type="text"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, "");
                                if (val.length > 2) {
                                  val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
                                }
                                setCardExpiry(val);
                              }}
                              className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-label-sm text-label-sm text-text-muted px-1">
                              Código CVV
                            </label>
                            <input
                              required
                              type="text"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg py-4 px-4 text-on-background focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all outline-none"
                              placeholder="***"
                            />
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-full font-label-sm text-label-sm text-[#0A0A0A] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:shadow-[0_0_40px_rgba(167,139,250,0.4)] flex items-center justify-center disabled:opacity-50 cursor-pointer"
                            type="submit"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin"></span>
                                Processando...
                              </div>
                            ) : (
                              `Ir para Pagamento Seguro • ${currentPlan.price}`
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Pix Setup/Ready to Generate */}
                    {activeTab === "pix" && (
                      <div className="space-y-6">
                        <p className="font-body-md text-body-md text-text-muted">
                          Você receberá um código Pix "Copia e Cola" e um QR Code dinâmico para pagamento imediato. O acesso é liberado instantaneamente após a aprovação do Pix.
                        </p>
                        <button
                          disabled={loading}
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-full font-label-sm text-label-sm text-[#0A0A0A] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(167,139,250,0.3)] flex items-center justify-center disabled:opacity-50 cursor-pointer"
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin"></span>
                              Gerando Código Pix...
                            </div>
                          ) : (
                            `Gerar Pix Seguro • ${currentPlan.price}`
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                /* Pix QR Code Display Screen (Checkout Transparente) */
                <div className="space-y-8 text-center animate-fade-in">
                  <h3 className="text-xl font-bold text-text-high-contrast flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400">qr_code_2</span>
                    Pix Gerado com Sucesso!
                  </h3>
                  
                  <div className="mx-auto w-56 h-56 bg-white rounded-2xl p-4 flex items-center justify-center shadow-[0_0_40px_rgba(167,139,250,0.2)] border border-white/10 relative">
                    {pixQrCodeBase64 ? (
                      <img
                        alt="Código QR de Pagamento"
                        className="w-full h-full"
                        src={
                          pixQrCodeBase64.startsWith("data:image")
                            ? pixQrCodeBase64
                            : `data:image/png;base64,${pixQrCodeBase64}`
                        }
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">Carregando QR Code...</div>
                    )}
                  </div>

                  <div className="space-y-3 max-w-md mx-auto">
                    <label className="font-label-sm text-label-sm text-text-muted">
                      Código Pix Copia e Cola:
                    </label>
                    <div className="flex gap-2 w-full">
                      <input
                        readOnly
                        type="text"
                        value={pixQrCode}
                        className="flex-grow bg-[#0A0A0A]/70 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-text-muted truncate outline-none select-all"
                      />
                      <button
                        onClick={copyToClipboard}
                        type="button"
                        className="bg-primary hover:bg-primary-dark text-[#0A0A0A] font-bold px-4 rounded-xl flex items-center justify-center text-xs gap-1 active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copied ? "check" : "content_copy"}
                        </span>
                        {copied ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-3 text-sm text-text-muted">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                      <span>Aguardando transferência bancária...</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        disabled={loading}
                        onClick={handleCheckStatus}
                        className="w-full bg-white/10 hover:bg-white/15 text-text-high-contrast py-4 rounded-full font-label-sm text-label-sm font-semibold transition-all border border-white/10 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        ) : (
                          <span className="material-symbols-outlined text-[18px]">sync</span>
                        )}
                        Já realizei o pagamento / Verificar Status
                      </button>
                      
                      <button
                        onClick={() => setPixGenerated(false)}
                        className="text-xs text-text-muted hover:text-primary transition-all underline cursor-pointer"
                      >
                        Voltar e alterar forma de pagamento
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 border-t border-white/5 bg-surface-dim/80 backdrop-blur-sm relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left">
          <div className="space-y-4">
            <div className="font-headline-md text-headline-md font-bold text-text-high-contrast">
              TalkGenius
            </div>
            <p className="font-label-sm text-[11px] text-text-muted opacity-60">
              © 2026 TalkGenius AI. Limited to 1 computer per user.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 my-6 md:my-0 items-center md:items-start text-[11px]">
            <Link className="font-label-sm text-text-muted hover:text-secondary transition-colors" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="font-label-sm text-text-muted hover:text-secondary transition-colors" href="/terms">
              Terms of Service
            </Link>
            <Link className="font-label-sm text-text-muted hover:text-secondary transition-colors" href="/support">
              Contact Support
            </Link>
          </div>

          <div className="flex flex-row items-center justify-center md:justify-end gap-3.5">
            <span className="text-text-muted font-label-sm text-[10px] uppercase tracking-[0.15em] opacity-60 shrink-0">
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Carregando formulário...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
