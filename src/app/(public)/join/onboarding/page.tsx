import NewPlayerInviteController from "@/features/players/infraestructure/NewPlayerInvite/NewPlayerInviteController";
import { StoreProvider } from "@/providers/store.provider";
import { Suspense } from "react";
// http://localhost:3001/join/onboarding?sid=VEf935744d4cb0e84b3b6a53dd1f2d499b&tid=123

async function OnBoarding({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { sid, tid } = await searchParams;

  if (!sid || !tid) return <div>Invalid onboarding link</div>;
  return (
    <StoreProvider
      initialState={{
        isSignedIn: false,
        user: undefined,
        teams: [],
        selectedTeamId: tid!,
        selectedPlayer: null,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <NewPlayerInviteController />
      </Suspense>
    </StoreProvider>
  );
}

// TODO: get initial data: Team, email, phone, numbersTaken

export default OnBoarding;
