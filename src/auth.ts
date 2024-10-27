import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SolidAuth } from "./features/auth/application/auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    subscriptionId?: string | null;
    access_token: string;
  }
  interface Session {
    user: {
      /** The user's postal address. */
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & User;
  }
}

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
        const response = await SolidAuth.login({
          email: credentials?.email,
          password: credentials?.password,
        });

        user = response.user;

        if (!user) throw new Error("User not found.");
        if (!response.token) throw new Error("User not found.");
       
        return {
          id: user.subscriptionId,
          subscriptionId: user.subscriptionId,
          email: user.email,
          name: user.name,
          access_token: response.token as string,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, session }) {
      if (user) {
        token.id = user.id;
      }
      
      if (account?.provider === "credentials" && user) {
        return { ...token, access_token: user.access_token };
      }
      return token;
    },
    session({ session, token }) {
      if (session && session.user) {
        session.user.subscriptionId = token.id as string;
        session.user.access_token = token?.access_token as string;
      }
      return session;
    },
  },
});
