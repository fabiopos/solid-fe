// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/account", "/team", "/players", "/fixture", "/lineup", "/startup"],
// };

export { auth as middleware } from "@/auth"
