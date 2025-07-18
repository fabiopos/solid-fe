"use client";
import PositionCategoryBadge from "@/components/Player/PositionCategoryBadge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Ambulance,
  ArrowDown,
  ArrowUp,
  Ellipsis,
  ToggleLeft,
  ToggleRight,
  Trash,
  User2,
} from "lucide-react";
import { PlayerStatus } from "@/types/types.common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusCell from "../TableCells/StatusCell";
import PlayerAvatar from "../PlayerAvatar";
import Link from "next/link";
import { FulfilledPlayerWithStats } from "../../domain/player.effect.schema";
import EditPlayerPosition from "./RowActions/EditPlayerPosition";
import { PlayerCard } from "@/components/DragAndDrop/PlayerCard";
import { useSolidStore } from "@/providers/store.provider";
import { useMutation } from "@tanstack/react-query";
import {
  deletePlayerOptions,
  patchPlayerOptions,
} from "@/core/query/player/player.query";
import { selectAccessToken } from "@/stores/selectors";

interface PlayerTableRowProps {
  player: FulfilledPlayerWithStats;
}

function PlayerTableRow({ player }: PlayerTableRowProps) {
  const token = useSolidStore(selectAccessToken);
  const setPlayerStatus = useSolidStore((state) => state.setPlayerStatus);
  const setPlayerInactive = useSolidStore((state) => state.setPlayerInactive);
  const setPlayerDelete = useSolidStore((state) => state.setPlayerDelete);
  const { mutate, isPending } = useMutation(
    patchPlayerOptions({ onSuccess: () => {} })
  );
  const { mutate: mutateDelete, isPending: isDeleting } = useMutation(
    deletePlayerOptions({
      onSuccess: (_, variables) => {
        setPlayerDelete(variables.id);
      },
    })
  );

  const handleStatusChange = (id: string | undefined, status: PlayerStatus) => {
    if (!id) return;
    setPlayerStatus(id, status);
    mutate({
      id: player.id!,
      player: {
        ...player,
        status,
      },
      token,
    }); // Assuming token is available in the context or passed down
  };

  const handleSetInactive = (id: string | undefined, state: boolean) => {
    if (!id) return;
    setPlayerInactive(id!, state);
    mutate({
      id: player.id!,
      player: {
        ...player,
        active: state,
      },
      token,
    });
  };

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    mutateDelete({ id, token });
  };

  return (
    <TableRow key={player.id} className="bg-background/90">
      <TableCell>
        <PlayerAvatar
          imageUrl={player.avatarUrl}
          fallback={player.shirtNumber?.toString() ?? "PP"}
        />
      </TableCell>
      <TableCell>
        <PositionCategoryBadge category={player.favPosition?.category} />
      </TableCell>
      <TableCell className="text-center">{player.shirtNumber}</TableCell>
      <TableCell className="font-medium">
        <PlayerCard player={player} />
      </TableCell>
      {/* <TableCell className="font-medium text-center">
        {player.shirtSize}
      </TableCell> */}
      {/* <TableCell className="font-medium uppercase"></TableCell> */}
      <TableCell className="text-center">
        {player.playedMatches} / {player.totalTeamMatches}
      </TableCell>
      <TableCell className="text-center">
        {player.playedMatchesPerc?.toFixed(1)}%
      </TableCell>
      <TableCell className="text-center">{player.goalsCount}</TableCell>
      <TableCell className="text-center">
        {player.goalsAvg?.toFixed(2)}
      </TableCell>
      <TableCell className="text-center">{player.minutesPlayed}</TableCell>
      <TableCell className="text-center">
        {player.minutesPerc?.toFixed(1)}%
      </TableCell>
      <TableCell className="font-medium">
        <StatusCell player={player} />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-neutral-400 text-xs">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/players/details/${player.id}`}>
                <div className="grid grid-cols-[110px_10px] items-center gap-2">
                  <span>View Profile</span>
                  <User2 className="" />
                </div>
              </Link>
            </DropdownMenuItem>

            <EditPlayerPosition player={player} />

            <DropdownMenuLabel className="text-neutral-400 text-xs">
              Player Health
            </DropdownMenuLabel>
            <DropdownMenuItem
              disabled={player.status === PlayerStatus.OK || isPending}
              onClick={() => handleStatusChange(player.id, PlayerStatus.OK)}
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Set as healthy</span>
                <ArrowUp className="text-green-600" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={player.status === PlayerStatus.DOWN || isPending}
              onClick={() => handleStatusChange(player.id, PlayerStatus.DOWN)}
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Set as down</span>
                <ArrowDown className="text-red-600" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={player.status === PlayerStatus.INJURIED || isPending}
              onClick={() =>
                handleStatusChange(player.id, PlayerStatus.INJURIED)
              }
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Set as injuried</span>
                <Ambulance className="text-red-600" />
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleSetInactive(player.id, !player.active)}
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Set as {player.active ? "Inactive" : "Active"}</span>
                {player.active && <ToggleLeft className="text-red-600" />}
                {!player.active && <ToggleRight className="text-green-600" />}
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(player.id)}
              disabled={isDeleting}
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Remove</span>
                <Trash className="text-red-600" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default PlayerTableRow;
