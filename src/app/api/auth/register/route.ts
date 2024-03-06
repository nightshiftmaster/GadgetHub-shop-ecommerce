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

    fs.writeFile(`${file}/user.txt`, JSON.stringify(user), (err: any) => {
      if (err) {
        return new NextResponse("Error,", {
          status: 500,
        });
      }
    });
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
      console.log("User with this email already exists");
      return new NextResponse("User with this email already exists,", {
        status: 500,
      });
    }
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
