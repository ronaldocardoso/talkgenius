import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { plan, payment_method, email, cpf, name, card_token, payment_method_id, installments } = body;

    // Validate request inputs
    if (!plan || !payment_method || !email || !cpf || !name) {
      return NextResponse.json(
        { error: "Dados incompletos para processar o pagamento." },
        { status: 400 }
      );
    }

    // Plan pricing and metadata configuration
    let itemTitle = "TalkGenius - Plano Mensal";
    let itemPrice = 99.00;

    if (plan === "weekly") {
      itemTitle = "TalkGenius - Plano Semanal";
      itemPrice = 59.90;
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;

    // Simulation Mode
    if (!accessToken) {
      console.warn(
        `\x1b[33m[Mercado Pago] Warning: MP_ACCESS_TOKEN is not defined. Simulating Transparent Checkout.\x1b[0m`
      );
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (payment_method === "card") {
        return NextResponse.json({
          simulated: true,
          status: "approved",
          url: `/checkout/success?plan=${plan}&simulated=true`,
        });
      } else if (payment_method === "pix") {
        const simulatedId = "sim-pix-" + Date.now();
        return NextResponse.json({
          simulated: true,
          status: "pending",
          payment_id: simulatedId,
          qr_code: "00020101021226870014br.gov.bcb.pix25650021simulatedpixcodeexample303000540559.905802BR5925TalkGenius AI6009Sao Paulo62070503***6304abcd",
          // Pre-rendered placeholder QR Code (base64)
          qr_code_base64: "iVBORw0KGgoAAAANSUhEUgAAAJQAAACUAQMAAABu1UKmAAAABlBMVEUAAAD///+l2Z/dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUHNgUDEw0cM4/tWwAAAD5JREFUOMvF0CESADAIBEH+/6Vd6QWCBmZ2A5Msy9b21AogLwWClwLBS4HgpUDwUiB4KRC8FAheCgQvBYKXr14dMAME45Z9+wAAAABJRU5ErkJggg==",
        });
      }
    }

    // Real Mercado Pago Payments API integration
    const idempotencyKey = `key-${Date.now()}-${Math.random()}`;
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": idempotencyKey,
    };

    let paymentPayload = {
      transaction_amount: itemPrice,
      description: itemTitle,
      payer: {
        email: email,
        identification: {
          type: "CPF",
          number: cpf.replace(/\D/g, ""),
        },
      },
    };

    if (payment_method === "card") {
      paymentPayload = {
        ...paymentPayload,
        token: card_token,
        installments: Number(installments) || 1,
        payment_method_id: payment_method_id,
      };
    } else if (payment_method === "pix") {
      const names = name.trim().split(" ");
      const firstName = names[0] || "Cliente";
      const lastName = names.slice(1).join(" ") || "TalkGenius";

      paymentPayload = {
        ...paymentPayload,
        payment_method_id: "pix",
        payer: {
          ...paymentPayload.payer,
          first_name: firstName,
          last_name: lastName,
        },
      };
    }

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(paymentPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Mercado Pago Transparent Error]", errorData);
      return NextResponse.json(
        { error: "Erro ao processar pagamento com o Mercado Pago", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (payment_method === "card") {
      if (data.status === "approved") {
        return NextResponse.json({
          simulated: false,
          status: data.status,
          url: `/checkout/success?plan=${plan}&payment_id=${data.id}`,
        });
      } else {
        return NextResponse.json({
          simulated: false,
          status: data.status,
          status_detail: data.status_detail,
          payment_id: data.id,
          error_message: "O pagamento não foi aprovado. Status: " + data.status,
        });
      }
    } else if (payment_method === "pix") {
      return NextResponse.json({
        simulated: false,
        status: data.status,
        payment_id: data.id,
        qr_code: data.point_of_interaction?.transaction_data?.qr_code,
        qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64,
      });
    }

  } catch (error) {
    console.error("[Checkout API Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
