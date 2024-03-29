import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { getAuthSession } from "@/utils/auth";
import User from "@/models/User";
import { OrderType } from "@/types/types";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<OrderType>> => {
  const { id } = params;
  const session = await getAuthSession();
  const email: any = session?.user?.email;
  try {
    await connect();
    const user = await User.findOne({ email });
    if (user) {
      const order = user.orders.filter((order: any) => order._id === id);
      return new NextResponse(JSON.stringify(order), { status: 200 });
    } else {
      return new NextResponse("User not found", { status: 500 });
    }
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
