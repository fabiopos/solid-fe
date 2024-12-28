import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SolidAuth } from "./features/auth/application/SolidAuth";
import { jwtVerify } from "jose";
import { CustomJWT } from "./types/types.common";
import { toDate } from "date-fns";

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
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
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
          email: credentials?.email as string,
          password: credentials?.password as string,
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
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      if (!auth) return false;

      const token = auth.user.access_token;
      const isValidToken = await verifyToken(token);      
      return !!isValidToken;
    },
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }

      if (account?.provider === "credentials" && user) {
        return { ...token, access_token: user.access_token };
      }

      return token;
    },
    session: async ({ session, token }) => {      
      if (session && session.user) {
        session.user.subscriptionId = token.id as string;
        session.user.access_token = token?.access_token as string;
        session.expires = toDate(token.exp as number);
      }
      return session;
    },
  },
});

async function verifyToken(token: string): Promise<CustomJWT | null> {
  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_JWT_AUTH_SECRET ?? ""
    );
    const decoded = (await jwtVerify(token, secret)) as unknown as CustomJWT; // Verifica el token
    return decoded; // Devuelve el payload si es válido
  } catch (error) {
    if (error instanceof Error)
      console.error("Error al verificar el token:", error.message);
    return null; // Devuelve null si no es válido
  }
}
