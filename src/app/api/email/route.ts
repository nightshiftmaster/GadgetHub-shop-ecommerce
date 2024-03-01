import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { AppleReceiptEmail } from "@/components/ReceiptMail";

const resend = new Resend(process.env.RESEND_API_KEY);

void resend.domains.create({ name: "nightshift.com" });

export async function POST(
  request: NextRequest
): Promise<NextResponse<String>> {
  const data = await request.json();

  const { order, delivery } = data;

  try {
    await resend.emails.send({
      from: "nightshift.com",
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
