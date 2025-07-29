"use server";

import { cookies } from "next/headers";
import { tryCatchAsync } from "rambdax";

export async function setCookieTeamId(teamId: string) {
  const cookieStore = await cookies();
  cookieStore.set("selectedTeamId", teamId);
}

export async function deleteCookieTeamId() {
  (await cookies()).delete("selectedTeamId");
}

export async function getCookieTeamId() {
  const cookieStore = tryCatchAsync(cookies, null);
  const res = await cookieStore("");
  if (res) return res.get("selectedTeamId")?.value;
  return null;
}
