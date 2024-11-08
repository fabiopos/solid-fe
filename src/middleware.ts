// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/account", "/team", "/players", "/fixture", "/lineup", "/startup"],
// };

export { auth as middleware } from "@/auth";

export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico|about|pricing|signup).*)"],
  matcher: ["/players", "/team", '/settings']
};
