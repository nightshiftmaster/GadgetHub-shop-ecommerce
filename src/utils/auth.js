import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connect } from "@/utils/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "public");
const fakeUser = JSON.parse(fs.readFileSync(`${file}/user.txt`, "utf8"));

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // autorization for tests
        if (process.env.NODE_ENV !== "production") {
          const isPasswordCorrect = credentials.password === fakeUser.password;

          if (isPasswordCorrect) {
            return fakeUser;
          } else {
            throw Error("Wrong password");
          }
        }

        // autorization
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          console.log(user);
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/login",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
