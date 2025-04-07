import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Mozammil Raja",
    };

    await emailClient.send({
      from: sender,
      to: [{ email: "mozammilrja0218@gmail.com" }],
      template_uuid: "7050972b-436d-4d0a-ae0c-86c359343f98",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoiceCraft",
        company_info_address: "Noida 135",
        company_info_city: "Noida",
        company_info_zip_code: "201304",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
