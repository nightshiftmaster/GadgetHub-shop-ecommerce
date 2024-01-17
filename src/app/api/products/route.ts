import { Product } from "@/models/Product";
import { connect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connect();
  try {
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
export const POST = async (request: NextRequest) => {
  await connect();
  const body = await request.json();
  try {
    await Product.insertMany(body);
    return new NextResponse("Products inserted", { status: 201 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
