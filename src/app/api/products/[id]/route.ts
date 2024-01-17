import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Product } from "@/models/Product";

export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  const { id } = params;
  try {
    await connect();
    const product = await Product.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
