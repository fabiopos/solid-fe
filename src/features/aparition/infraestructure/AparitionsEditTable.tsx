"use client";
import React, { useCallback, useMemo } from "react";

import AparitionHeader from "./AparitionHeader/AparitionHeader";
import AparitionBody from "./AparitionBody/AparitionBody";
import { Button } from "@/components/ui/button";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useSession } from "next-auth/react";

function AparitionsEditTable() {
  const { data } = useSession();
  const { upsertAparitions, upsertStatus } = useMatchDetailsStore(
    (state) => state
  );

  const handleUpsert = useCallback(() => {
    if (!data) return;
    upsertAparitions(data?.user.access_token);
  }, [data]);

  const isDisabled = useMemo(() => {
    return upsertStatus === "IN_PROGRESS";
  }, [upsertStatus]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button onClick={handleUpsert} disabled={isDisabled}>
          Update changes
        </Button>
      </div>
      <div className="border rounded-lg">
        <AparitionHeader />
        <AparitionBody />
      </div>
    </div>
  );
}

export default AparitionsEditTable;
