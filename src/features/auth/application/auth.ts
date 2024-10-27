import { signIn, signOut } from "next-auth/react";
import { LoginInput } from "../domain/login.schema";

export class SolidAuth {
  static async loginWithCredentials(credentials: LoginInput) {
    try {
      return await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unknown error login with credentials");
    }
  }

  static async logout() {
    return await signOut();
  }

  static async login(credentials: LoginInput) {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:3000/auth/login", {
      headers: defaultHeaders,
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    return result.user;
  }
}
