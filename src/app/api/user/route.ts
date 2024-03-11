import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import User from "@/models/User";
import { UserType } from "@/types/types";
import fs from "fs";
import path from "path";

export const GET = async (
  request: NextRequest
): Promise<NextResponse<UserType>> => {
  const url = new URL(request.url);
  const email: any = url.searchParams.get("email");

  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const user = JSON.parse(fs.readFileSync(`${file}/user.txt`, "utf8"));
    if (user.email === email) {
      return new NextResponse(JSON.stringify([user]), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify([]), { status: 200 });
    }
  }
  try {
    await connect();
    const user = await User.find(email && { email });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
