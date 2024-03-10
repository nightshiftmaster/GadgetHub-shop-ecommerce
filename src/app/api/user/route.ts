import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import User from "@/models/User";
import { UserType } from "@/types/types";
import fs from "fs";
import path from "path";

export const GET = async (
  request: NextRequest
): Promise<NextResponse<UserType>> => {
  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const user = fs.readFileSync(`${file}/user.txt`, "utf8");
    return new NextResponse(JSON.stringify(user), { status: 200 });
  }

  try {
    const url = new URL(request.url);
    const email: any = url.searchParams.get("email");
    await connect();
    const user = await User.find(email && { email });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
