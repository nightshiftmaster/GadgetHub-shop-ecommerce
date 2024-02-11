import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Product } from "@/models/Product";
import fakeDB from "@/utils/fakeDB";
import { ProductsType } from "@/types/types";

export const GET = async (
  request: NextRequest,
  { params }: { params: { category: string } }
): Promise<NextResponse<ProductsType>> => {
  if (process.env.NODE_ENV !== "production") {
    const productsByCat =
      params.category === "all products"
        ? fakeDB
        : fakeDB.filter((item) => item.category === params.category);
    return new NextResponse(JSON.stringify(productsByCat), { status: 200 });
  }
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
