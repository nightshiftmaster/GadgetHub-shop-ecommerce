import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Product } from "@/models/Product";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("q");

  try {
    await connect();
    const product = await Product.find({
      title: { $regex: "^" + searchParams, $options: "i" },
    }).exec();
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
