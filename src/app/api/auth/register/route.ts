import { connect } from "@/utils/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const user = await request.json();
  const email = user.email;
  await connect();
  try {
    const alreadyCreatedUser = await User.find(email && { email });
    if (alreadyCreatedUser.length === 0) {
      const hashedPassword = await bcrypt.hash(user.password, 5);
      const userWithHashedPassword = {
        ...user,
        ...{ password: hashedPassword },
      };
      const newUser = new User(userWithHashedPassword);
      await newUser.save();
      console.log("User has bee created");
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
