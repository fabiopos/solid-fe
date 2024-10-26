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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        console.log(email, password);

        //  const user = await SolidAuth.login({ email, password });
        // const defaultHeaders = new Headers();
        // defaultHeaders.append("Content-Type", "application/json");

        // const response = await fetch("http://localhost:3000/auth/login", {
        //   headers: defaultHeaders,
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        // });

        // const result = await response.json();
        // const user = result.user;

        return {
          email: `user.email`,
          name: 'OK',//`${user.firstName} ${user.lastName}`,
          id: 'user.email',
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
