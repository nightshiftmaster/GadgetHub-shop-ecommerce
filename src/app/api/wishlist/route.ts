import { connect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { getAuthSession } from "@/utils/auth";

export const GET = async () => {
  const session = await getAuthSession();
  const email: any = session?.user?.email;
  if (process.env.NODE_ENV !== "production") {
    const wishlist: object = [];
    return new NextResponse(JSON.stringify(wishlist), { status: 200 });
  }

  try {
    await connect();
    const wishlist: any = await User.find({ email }, "wishlist");

    return new NextResponse(JSON.stringify(wishlist), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  await connect();
  const body = await request.json();
  const session = await getAuthSession();
  const email: any = session?.user?.email;
  try {
    await User.updateOne({ email }, { $push: { wishlist: body } });
    return new NextResponse("Products inserted", { status: 201 });
  } catch (error) {
    console.log("err");
    return new NextResponse("Database error", { status: 500 });
  }
};
