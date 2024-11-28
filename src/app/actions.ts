"use server";

import { cookies } from "next/headers";

export async function setCookieTeamId(teamId: string) {
  const cookieStore = await cookies();
  cookieStore.set("selectedTeamId", teamId);
}

export async function deleteCookieTeamId() {
  (await cookies()).delete("selectedTeamId");
}

export async function getCookieTeamId() {
  const cookieStore = await cookies();  
  return cookieStore.get("selectedTeamId")?.value;
}
