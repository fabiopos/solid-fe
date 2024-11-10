"use client";
import { Alert } from "@/components/ui/alert";
import { usePlayers } from "../domain/usePlayers";
import PlayersSkeleton from "./PlayersSkeleton";
import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PositionCategoryBadge from "@/components/Player/PositionCategoryBadge";
import {
  Ambulance,
  ArrowDown,
  ArrowUp,
  Ellipsis,
  GitPullRequestArrow,
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
import StatusCell from "./TableCells/StatusCell";

export default function PlayersTable() {
  const { error, fetchPlayersStatus, players, handlers, playerStatusUpdate } =
    usePlayers();

  const { handleSetDown } = handlers;

  if (fetchPlayersStatus === "IN_PROGRESS") return <PlayersSkeleton />;
  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <div>
      <Table>
        <TableCaption>Your squad has {players.length} players.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead className="text-center">Number</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Shirt Size</TableHead>
            <TableHead className="">Shirt Name</TableHead>
            <TableHead className="">
              <div className="flex flex-col">
                <span>Played</span>
                <span>Matches</span>
              </div>
            </TableHead>
            <TableHead className="">
              <div className="flex flex-col">
                <span>Played</span>
                <span>Matches %</span>
              </div>
            </TableHead>
            <TableHead className="">
              <div className="flex flex-col">
                <span>Goals</span>
                <span>Count</span>
              </div>
            </TableHead>
            <TableHead className="">
              <div className="flex flex-col text-center">
                <span>Goals</span>
                <span>Avg.</span>
              </div>
            </TableHead>
            <TableHead className="">
              <div className="flex flex-col">
                <span>Minutes</span>
                <span>Played</span>
              </div>
            </TableHead>
            <TableHead className="">
              <div className="flex flex-col text-center">
                <span>Minutes</span>
                <span>%</span>
              </div>
            </TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <PositionCategoryBadge
                  category={player.favPosition?.category}
                />
              </TableCell>
              <TableCell className="text-center">
                {player.shirtNumber}
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="text-xl">
                    {player.firstName} {player.lastName}
                  </span>
                  <small className="text-neutral-500">{player.email}</small>
                </div>
              </TableCell>
              <TableCell className="font-medium text-center">
                {player.shirtSize}
              </TableCell>
              <TableCell className="font-medium">{player.shirtName}</TableCell>
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
                      <div className="grid grid-cols-[110px_10px] items-center gap-2">
                        <span>View Profile</span>
                        <User2 className="" />
                      </div>
                    </DropdownMenuItem>

                    {player.favPosition?.category === "NO POSITION" && (
                      <DropdownMenuItem>
                        <div className="grid grid-cols-[110px_10px] items-center gap-2">
                          <span>Add field position</span>
                          <GitPullRequestArrow className="text-purple-500" />
                        </div>
                      </DropdownMenuItem>
                    )}

                    {player.favPosition?.category !== "NO POSITION" && (
                      <DropdownMenuItem>
                        <div className="grid grid-cols-[110px_10px] items-center gap-2">
                          <span>Edit field position</span>
                          <GitPullRequestArrow className="text-purple-500" />
                        </div>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuLabel className="text-neutral-400 text-xs">
                      Player Health
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      disabled={player.status === PlayerStatus.OK}
                      onClick={() => handleSetDown(player.id, PlayerStatus.OK)}
                    >
                      <div className="grid grid-cols-[110px_10px] items-center gap-2">
                        <span>Set as healthy</span>
                        <ArrowUp className="text-green-600" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={player.status === PlayerStatus.DOWN}
                      onClick={() =>
                        handleSetDown(player.id, PlayerStatus.DOWN)
                      }
                    >
                      <div className="grid grid-cols-[110px_10px] items-center gap-2">
                        <span>Set as down</span>
                        <ArrowDown className="text-red-600" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={player.status === PlayerStatus.INJURIED}
                      onClick={() =>
                        handleSetDown(player.id, PlayerStatus.INJURIED)
                      }
                    >
                      <div className="grid grid-cols-[110px_10px] items-center gap-2">
                        <span>Set as injuried</span>
                        <Ambulance className="text-red-600" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="grid grid-cols-[110px_10px] items-center gap-2">
                        <span>Remove</span>
                        <Trash className="text-red-600" />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
