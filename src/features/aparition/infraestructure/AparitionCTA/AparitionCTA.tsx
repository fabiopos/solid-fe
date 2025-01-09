"use client";
import { Button } from "@/components/ui/button";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import AparitionsStatBoxes from "./AparitionsStatBoxes";
import { BorderTrail } from "@/components/ui/border-trail";

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
    <div className="flex justify-between items-center dark:bg-slate-800/40 bg-background border p-5 rounded-lg relative overflow-hidden outline-none">
      {upsertStatus === "IN_PROGRESS" && (
        <BorderTrail
          className="bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
          size={120}
        />
      )}
      <AparitionsStatBoxes />

      <Button onClick={handleUpsert} disabled={isDisabled} size="sm">
        Update changes
      </Button>
      {/* <textarea className='h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none' /> */}
    </div>
  );
}

export default AparitionCTA;
