import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connect } from "@/utils/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

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
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
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
  pages: {
    error: "/login",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
