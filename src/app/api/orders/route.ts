import { connect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { getAuthSession } from "@/utils/auth";

export const GET = async () => {
  const session = await getAuthSession();
  const email: any = session?.user?.email;

  await connect();
  try {
    const products: any = await User.find({ email }, "orders");

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  await connect();
  const body = await request.json();
  const session = await getAuthSession();
  const email: any = session?.user?.email;
  const order = {
    _id: Math.random().toString(16).slice(10),
    createdAt: new Date().toLocaleString(),
    total: body.total,
    order: body.order,
  };

  try {
    await User.updateOne({ email }, { $push: { orders: order } });
    return new NextResponse("Products inserted", { status: 201 });
  } catch (error) {
    console.log("err");
    return new NextResponse("Database error", { status: 500 });
  }
};
