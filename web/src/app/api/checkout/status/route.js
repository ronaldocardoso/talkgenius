import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json({ error: "ID do pagamento é obrigatório." }, { status: 400 });
    }

    // Simulation Mode
    if (paymentId.startsWith("sim-pix-")) {
      const parts = paymentId.split("-");
      const timestamp = parseInt(parts[2], 10);
      const now = Date.now();
      
      // Approve after 8 seconds of creation
      if (now - timestamp > 8000) {
        return NextResponse.json({
          status: "approved",
          simulated: true,
        });
      } else {
        return NextResponse.json({
          status: "pending",
          simulated: true,
        });
      }
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      // Fallback for simulated card payments or general simulation if token was removed
      return NextResponse.json({
        status: "approved",
        simulated: true,
      });
    }

    // Call Mercado Pago API to get payment details
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Mercado Pago Status Error]", errorData);
      return NextResponse.json(
        { error: "Erro ao obter status de pagamento", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      status: data.status,
      simulated: false,
    });

  } catch (error) {
    console.error("[Checkout Status API Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
