import { NextRequest, NextResponse } from "next/server";
// import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from "resend";
import { AppleReceiptEmail } from "@/components/ReceiptMail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { order, delivery } = data;

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: delivery.email,
      subject: "Receipt",
      react: AppleReceiptEmail({
        order,
        delivery,
      }),
    });

    return new NextResponse("Email sent", { status: 200 });
  } catch (err) {
    return new NextResponse("Sending failed", { status: 500 });
  }
}
