"use client";
import { Alert } from "@/components/ui/alert";
import { useCallback, useMemo } from "react";
import { Array } from "effect";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { Button } from "@/components/ui/button";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import PositionCategoryBadge from "@/components/Player/PositionCategoryBadge";
import { useRouter } from "next/navigation";

function AparitionDiffAlert() {
  const router = useRouter();
  const { data } = useSession();
  const { players, aparitions, match, addAparition, upsertStatus } =
    useMatchDetailsStore((state) => state);
  const playersIds = useMemo(() => {
    return players.map((x) => x.id);
  }, [players]);

  const aparitionsPlayerIds = useMemo(() => {
    return aparitions.map((x) => x.player?.id);
  }, [aparitions]);

  const differenceIds = useMemo(
    () =>
      Array.differenceWith<string | undefined>((a, b) => a === b)(
        playersIds,
        aparitionsPlayerIds
      ),
    [playersIds, aparitionsPlayerIds]
  );

  const differencePlayers = useMemo(() => {
    return players.filter((x) => differenceIds.includes(x.id));
  }, [players, differenceIds]);

  const hasDifference = useMemo(() => {
    return differencePlayers.length > 0;
  }, [differencePlayers]);

  const handleAddAparition = useCallback(
    async (player: FulfilledPlayer) => {
      if (!match?.id) return;
      await addAparition(player, match?.id, data?.user.access_token ?? "");
      router.refresh();
    },
    [match?.id, addAparition, data?.user.access_token, router]
  );

  const isLoading = useMemo(() => {
    return upsertStatus === "IN_PROGRESS";
  }, [upsertStatus]);

  if (!match) return null;

  return (
    <>
      {hasDifference && (
        <Alert className={cn("my-2", isLoading && "text-muted")}>
          {differencePlayers.map((p) => (
            <div
              key={`difference-${p.id}`}
              className="grid grid-cols-[1fr_auto] items-center border-b py-2"
            >
              <div className="grid grid-cols-[110px_auto] gap-5 w-full">
                <PositionCategoryBadge category={p.favPosition?.category} />
                <div>
                  <strong>{`${p.firstName} ${p.lastName}`}</strong>{" "}
                  <span>is not in the aparition </span>
                </div>
              </div>

              <div className="">
                <Button
                  onClick={() => handleAddAparition(p)}
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                >
                  <div className="flex gap-2">
                    <span>add</span>
                    <Plus className="text-sm" size="18" />
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </Alert>
      )}
    </>
  );
}

export default AparitionDiffAlert;
