"use client";
import {
  Table,
  TableCaption,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlayerTableRow from "./PlayerTableRow/PlayerTableRow";
import { FulfilledPlayer, FulfilledPlayerWithStats } from "../domain/player.effect.schema";

interface PlayersTableProps {
  players: FulfilledPlayerWithStats[];
  caption?: string;
}

export default function PlayersTable({ players = [], caption }: PlayersTableProps) {
  return (
    <>
      <Table className="border">
        <TableCaption className="text-xs italic">{caption}</TableCaption>
        <TableHeader>
          <TableRow className="text-xs bg-neutral-50 border">
            <TableHead></TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-center">Number</TableHead>
            <TableHead className="">Name</TableHead>
            {/* <TableHead className="">Shirt Size</TableHead> */}
            {/* <TableHead className="">Shirt Name</TableHead> */}
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
          {players.map((p) => (
            <PlayerTableRow key={p.id} player={p} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
