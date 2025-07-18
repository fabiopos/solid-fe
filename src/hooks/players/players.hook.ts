import { fieldPositionsQueryOptions } from "@/core/query/field-positions/fieldPositions.query";
import { playerWithStatsQueryOptions } from "@/core/query/player/player.query";
import { useSolidStore } from "@/providers/store.provider";
import { selectAccessToken, selectSelectedTeamId } from "@/stores/selectors";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useFetchPlayers() {
  const access_token = useSolidStore(selectAccessToken);
  const selectedTeamId = useSolidStore(selectSelectedTeamId);
  const setPlayers = useSolidStore((state) => state.setPlayers);
  const { data, isLoading, error } = useQuery(
    playerWithStatsQueryOptions(selectedTeamId, access_token)
  );

  useEffect(() => {
    if (!isLoading && data) setPlayers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  return { players: data, isLoading, error };
}

export function useFetchFieldPositions() {
  const access_token = useSolidStore(selectAccessToken);
  const setFieldPositions = useSolidStore((state) => state.setFieldPositions);
  const { data, isLoading, error } = useQuery(
    fieldPositionsQueryOptions(access_token)
  );

  useEffect(() => {
    if (!isLoading && data) setFieldPositions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  return { fieldPositions: data, isLoading, error };
}
