"use client";
import { Button } from "@/components/ui/button";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import AparitionsStatBoxes from "./AparitionsStatBoxes";

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
    <div className="flex justify-between items-center dark:bg-slate-800/40 bg-background border p-5 rounded-lg">
      <AparitionsStatBoxes />
      <Button onClick={handleUpsert} disabled={isDisabled} size="sm">
        Update changes
      </Button>
    </div>
  );
}

export default AparitionCTA;
