"use client";
import { Button } from "@/components/ui/button";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import AparitionsStatBoxes from "./AparitionsStatBoxes";
import LoadingBorder from "@/components/ui/animation/LoadingBorder";

function AparitionCTA() {
  const { data } = useSession();

  const { upsertAparitions, upsertStatus } = useMatchDetailsStore(
    (state) => state
  );

  const handleUpsert = useCallback(() => {
    if (!data) return;
    upsertAparitions(data?.user.access_token);
  }, [data, upsertAparitions]);

  const isDisabled = useMemo(() => {
    return upsertStatus === "IN_PROGRESS";
  }, [upsertStatus]);

  return (
    <div className="flex justify-between items-center bg-background border p-5 rounded-lg relative overflow-hidden outline-none">
      {upsertStatus === "IN_PROGRESS" && <LoadingBorder />}
      <AparitionsStatBoxes />

      <Button onClick={handleUpsert} disabled={isDisabled} size="sm">
        Update changes
      </Button>
      {/* <textarea className='h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none' /> */}
    </div>
  );
}

export default AparitionCTA;
