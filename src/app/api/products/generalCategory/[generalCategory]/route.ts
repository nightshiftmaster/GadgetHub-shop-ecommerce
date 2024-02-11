import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Product } from "@/models/Product";
import fakeDB from "@/utils/fakeDB";
import { ProductsType } from "@/types/types";

export const GET = async (
  request: NextRequest,
  { params }: { params: { generalCategory: string } }
): Promise<NextResponse<ProductsType>> => {
  if (process.env.NODE_ENV !== "production") {
    const productsByGeneralCat = fakeDB.filter(
      (item) => item.generalCategory === params.generalCategory
    );
    return new NextResponse(JSON.stringify(productsByGeneralCat), {
      status: 200,
    });
  }
  try {
    await connect();
    const product = await Product.find(params);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
