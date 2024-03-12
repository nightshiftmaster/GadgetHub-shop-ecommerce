import { connect } from "@/utils/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<String>> => {
  const user = await request.json();
  const email = user.email;

  if (process.env.NODE_ENV === "development") {
    const file = path.join(process.cwd(), "public");
    fs.writeFileSync(`${file}/user.txt`, JSON.stringify(user));
    return new NextResponse("User has been created", { status: 201 });
  }
  try {
    await connect();
    const alreadyCreatedUser = await User.find(email && { email });
    if (alreadyCreatedUser.length === 0) {
      const hashedPassword = await bcrypt.hash(user.password, 5);
      const userWithHashedPassword = {
        ...user,
        ...{ password: hashedPassword },
      };
      const newUser = new User(userWithHashedPassword);
      await newUser.save();
      return new NextResponse("User has been created", { status: 201 });
    } else {
      return new NextResponse("User with this email already exists,", {
        status: 500,
      });
    }
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest
): Promise<NextResponse<String>> => {
  const user = await request.json();
  const email = user.email;

  if (process.env.NODE_ENV !== "production") {
    const filePath = path.join(process.cwd(), "public");
    fs.writeFileSync(`${filePath}/user.txt`, JSON.stringify(user));
    return new NextResponse("User has been updated", { status: 201 });
  }

  try {
    await connect();
    const existingUser = await User.findOneAndUpdate({ email }, user, {
      new: true,
    });

    if (existingUser) {
      return new NextResponse("User has been updated", { status: 201 });
    } else {
      return new NextResponse("User not found,", {
        status: 500,
      });
    }
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
