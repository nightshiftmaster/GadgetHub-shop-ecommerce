import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Product } from "@/models/Product";
import fakeDB from "@/utils/fakeDB";
import { SingleProductType } from "@/types/types";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<SingleProductType>> => {
  const { id } = params;
  if (process.env.NODE_ENV !== "production") {
    const product = fakeDB.find((item) => item._id === id);
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  }
  try {
    await connect();
    const product = await Product.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
