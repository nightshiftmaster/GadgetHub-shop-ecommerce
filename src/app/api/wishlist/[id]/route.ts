import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { getAuthSession } from "@/utils/auth";
import User from "@/models/User";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  const { id } = params;
  const session = await getAuthSession();
  const email: any = session?.user?.email;
  try {
    await connect();
    await User.updateOne({ email }, { $pull: { wishlist: { _id: id } } });
    return new NextResponse("Product deleted from wishlist", { status: 201 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
