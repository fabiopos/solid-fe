import {
  decodeInviteData,
  InviteDataSchemaType,
} from "@/features/players/domain/invite-data.schema";
import NewPlayerInviteController from "@/features/players/infraestructure/NewPlayerInvite/NewPlayerInviteController";
import { StoreProvider } from "@/providers/store.provider";
import { getFieldPositions } from "@/services/player/program/fieldPositions/fieldPositions.service";
import { Effect } from "effect";
import { Suspense } from "react";
// http://localhost:3001/join/onboarding?sid=VEf935744d4cb0e84b3b6a53dd1f2d499b&tid=123

async function OnBoarding({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { sid, tid } = await searchParams;
  const data = await getInitialData({ sid, tid });

  if (!sid || !tid) return <div>Invalid onboarding link</div>;
  if (!data) return <div>Invalid onboarding link</div>;
  return (
    <StoreProvider
      initialState={{
        isSignedIn: false,
        user: undefined,
        teams: [],
        selectedTeamId: tid!,
        selectedPlayer: null,
        inviteData: data.inviteData,
        fieldPositions: data.fieldPositions,
        newPlayer: {
          email: data.inviteData.email,
          phone: data.inviteData.phone,
        },
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <NewPlayerInviteController />
      </Suspense>
    </StoreProvider>
  );
}

// TODO: refactor as a service
async function getInitialData({ sid, tid }: { sid: string; tid: string }) {
  const endpoint = `/auth/invite?tid=${tid}&sid=${sid}`;
  const defaultHeaders = new Headers();
  defaultHeaders.append("Content-Type", "application/json");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}${endpoint}`,
    {
      headers: defaultHeaders,
      method: "GET",
    }
  );

  if (!response.ok) return null;
  const fieldPositions = await Effect.runPromise(getFieldPositions(""));

  console.log(fieldPositions);
  const json = await response.json();
  const data = decodeInviteData(json);
  return { inviteData: data as InviteDataSchemaType, fieldPositions };
}

export default OnBoarding;
