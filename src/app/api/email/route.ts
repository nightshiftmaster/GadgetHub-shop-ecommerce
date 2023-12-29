import { NextRequest, NextResponse } from "next/server";
// import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from "resend";
import { AppleReceiptEmail } from "@/components/emails/Welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "nightshiftmaster@gmail.com",
    to: "nightshiftmaster@gmail.com",
    subject: "hello world",
    react: AppleReceiptEmail(),
  });

  return NextResponse.json({ staus: "ok" });
}
