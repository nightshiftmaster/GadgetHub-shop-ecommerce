import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connect } from "@/utils/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

const fakeUser = {
  firstName: "vlad",
  lastName: "medevedev",
  dateOfBirth: "2024-01-12",
  email: "test@gmail.com",
  mobileNumber: "0547355910",
  country: "israel",
  city: "eilat",
  address: "knaanim",
  password: "$2a$05$2nggFZFBAYkFaP0iBp0Aq.x13tX5ut8sJzgKLarQfiBr1H2uOKqvS",
  orders: [],
  wishlist: [],
};

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
        // authorization for tests
        if (process.env.NODE_ENV === "development") {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            fakeUser.password
          );
          if (isPasswordCorrect) {
            return fakeUser;
          } else {
            throw new Error("Wrong password");
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
          throw Error(err);
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
