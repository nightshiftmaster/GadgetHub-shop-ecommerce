import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import User from "@/models/User";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const email: any = url.searchParams.get("email");

  try {
    await connect();
    const user = await User.find(email && { email });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
