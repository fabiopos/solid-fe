"use client";
import { Alert } from "@/components/ui/alert";
import { usePlayers } from "../domain/usePlayers";
import PlayersSkeleton from "./PlayersSkeleton";
import {
  Table,
  TableCaption,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlayerTableRow from "./PlayerTableRow/PlayerTableRow";

export default function PlayersTable() {
  const { error, fetchPlayersStatus, players } = usePlayers();

  if (fetchPlayersStatus === "IN_PROGRESS") return <PlayersSkeleton />;
  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <div>
      <Table>
        <TableCaption>Your squad has {players.length} players.</TableCaption>
        <TableHeader>
          <TableRow>
          <TableHead></TableHead>
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
          {players.map((p) => (
            <PlayerTableRow key={p.id} player={p} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
