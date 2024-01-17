import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Product } from "@/models/Product";

export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    await connect();
    if (params.category === "all products") {
      const products = await Product.find();
      return new NextResponse(JSON.stringify(products), { status: 200 });
    }

    const products = await Product.find(params);
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
