import { SolidAuth } from "@/features/auth/application/auth";
import { LoginInput } from "@/features/auth/domain/login.schema";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    // TODO: Add custom pages
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _) {
        const { email, password } = credentials as LoginInput;

        console.log(email, password);

        const user = await SolidAuth.login({ email, password });

        return {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          id: user.email,
        };
      },
    }),
  ],
  callbacks: {
    session(params) {
      return params.session;
    },
  },
};
