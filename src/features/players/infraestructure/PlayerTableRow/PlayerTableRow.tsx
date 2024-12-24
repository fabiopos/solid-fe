"use client";
import PositionCategoryBadge from "@/components/Player/PositionCategoryBadge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Ambulance,
  ArrowDown,
  ArrowUp,  
  Ellipsis,
  GitPullRequestArrow,
  ToggleLeft,
  ToggleRight,
  Trash,
  User2,
} from "lucide-react";
import { PlayerStatus } from "@/types/types.common";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import StatusCell from "../TableCells/StatusCell";
import { usePlayers } from "../../domain/usePlayers";
import { useMemo } from "react";
import PlayerAvatar from "../PlayerAvatar";
import Link from "next/link";
import { FulfilledPlayer } from "../../domain/player.effect.schema";
import EditPlayerPosition from "./RowActions/EditPlayerPosition";

interface PlayerTableRowProps {
  player: FulfilledPlayer;
}

function PlayerTableRow({ player }: PlayerTableRowProps) {
  const { handlers, playerStatusDelete, playerStatusUpdate } = usePlayers();
  const { handleSetDown, handleDelete, handleSetInactive } = handlers;

  const isUpdating = useMemo(() => {
    return (
      playerStatusUpdate.id === player.id &&
      playerStatusUpdate.status === "IN_PROGRESS"
    );
  }, [playerStatusUpdate, player]);

  const isDeleting = useMemo(() => {
    return (
      playerStatusDelete.id === player.id &&
      playerStatusDelete.status === "IN_PROGRESS"
    );
  }, [playerStatusDelete, player]);

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
        <div className="flex flex-col">
          <Link href={`/players/details/${player.id}`} className="text-xl">
            {player.firstName} {player.lastName}
          </Link>
          <small className="text-neutral-500">{player.email}</small>
        </div>
      </TableCell>
      <TableCell className="font-medium text-center">
        {player.shirtSize}
      </TableCell>
      <TableCell className="font-medium uppercase">
        {player.shirtName}
      </TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0 %</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0 %</TableCell>
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

            {player.favPosition?.category === undefined && (
              <DropdownMenuItem>
                <div className="grid grid-cols-[110px_10px] items-center gap-2">
                  <span>Add field position</span>
                  <GitPullRequestArrow className="text-purple-500" />
                </div>
              </DropdownMenuItem>
            )}

            <EditPlayerPosition player={player} />

            <DropdownMenuLabel className="text-neutral-400 text-xs">
              Player Health
            </DropdownMenuLabel>
            <DropdownMenuItem
              disabled={player.status === PlayerStatus.OK || isUpdating}
              onClick={() => handleSetDown(player.id, PlayerStatus.OK)}
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Set as healthy</span>
                <ArrowUp className="text-green-600" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={player.status === PlayerStatus.DOWN || isUpdating}
              onClick={() => handleSetDown(player.id, PlayerStatus.DOWN)}
            >
              <div className="grid grid-cols-[110px_10px] items-center gap-2">
                <span>Set as down</span>
                <ArrowDown className="text-red-600" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={player.status === PlayerStatus.INJURIED || isUpdating}
              onClick={() => handleSetDown(player.id, PlayerStatus.INJURIED)}
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
