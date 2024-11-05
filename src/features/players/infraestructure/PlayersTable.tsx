'use client'
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

export default function PlayersTable() {
  const { error, fetchPlayersStatus, players } = usePlayers();

  if (fetchPlayersStatus === "IN_PROGRESS") return <PlayersSkeleton />;
  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <div>
      <Table>
        <TableCaption>Your squad.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead className="text-center">Number</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Document Type</TableHead>
            <TableHead className="">Document Number</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Shirt Size</TableHead>
            <TableHead className="">Shirt Name</TableHead>            
            <TableHead className="text-right">Email</TableHead>
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
                {player.firstName} {player.lastName}
              </TableCell>
              <TableCell className="font-medium">
                {player.documentType}
              </TableCell>
              <TableCell className="font-medium">
                {player.documentNumber}
              </TableCell>
              <TableCell className="font-medium">
                {player.status}
              </TableCell>
              <TableCell className="font-medium">
                {player.shirtSize}
              </TableCell>
              <TableCell className="font-medium">
                {player.shirtName}
              </TableCell>
              <TableCell className="text-right">{player.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
