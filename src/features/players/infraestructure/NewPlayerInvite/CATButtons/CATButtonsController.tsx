import { useCallback } from "react";
import { createNewPlayerWithAvatar } from "@/services/player/program/players/player.create.service";
import CATButtonsView from "../../NewPlayer/Actions/CATButtonsView";
import { useSolidStore } from "@/providers/store.provider";
import {
  selectCanContinuePlayerInvite,
  selectInviteData,
} from "@/stores/selectors";
import { Effect } from "effect";
import { mapToEmptyPlayer } from "@/lib/new-player/parseEmptyPlayer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function CATButtonsController() {
  const router = useRouter();
  const {
    resetPlayer,
    setNextStep,
    setPrevStep,
    step,
    createNewPlayerStatus,
    newPlayer,
    setCreateNewPlayerStatus,
  } = useSolidStore((state) => state);
  const canContinue = useSolidStore(selectCanContinuePlayerInvite);
  const teamInvite = useSolidStore(selectInviteData);

  const handleCreatePlayer = useCallback(() => {
    if (!newPlayer || !teamInvite) return;
    setCreateNewPlayerStatus("IN_PROGRESS");
    const player = mapToEmptyPlayer(newPlayer, teamInvite.team.teamId);
    const file = newPlayer.avatarFile;

    const program = createNewPlayerWithAvatar({
      player,
      file,
      onFailure: () => setCreateNewPlayerStatus("ERROR"),
      onSuccess: () => setCreateNewPlayerStatus("DONE"),
    });

    // TODO: implement rollback
    Effect.runPromise(program).catch((e) => console.log(e));
  }, [newPlayer, teamInvite, setCreateNewPlayerStatus]);

  const handleComplete = useCallback(() => {
    resetPlayer();
    router.push("/login");
  }, [resetPlayer, router]);

  return (
    <CATButtonsView
      canContinue={canContinue}
      createPlayerStatus={createNewPlayerStatus}
      handleCreatePlayer={handleCreatePlayer}
      nextStep={setNextStep}
      prevStep={setPrevStep}
      step={step}
      completeLink={<Button onClick={handleComplete}>Go to login</Button>}
    />
  );
}

export default CATButtonsController;
