import { connect } from "@/utils/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const user = await request.json();
  await connect();
  const hashedPassword = await bcrypt.hash(user.password, 5);
  const userWithHashedPassword = {
    ...user,
    ...{ password: hashedPassword },
  };
  const newUser = new User(userWithHashedPassword);
  try {
    await newUser.save();
    return new NextResponse("User has bee created", { status: 201 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
};
