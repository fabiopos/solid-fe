import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SolidAuth } from "./features/auth/application/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials.");
        // logic to salt and hash password
        user = await SolidAuth.login({
          email: credentials?.email,
          password: credentials?.password,
        });

        console.log(user);
        if (!user) throw new Error("User not found.");

        // return user object with their profile data

        return {
          id: user.subscriptionId,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
