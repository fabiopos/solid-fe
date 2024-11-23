import AparitionHeaderCell from "./AparitionHeader/AparitionHeaderCell";
import {
  Check,
  CheckCheck,
  Clock,
  Goal,
  SquareActivity,
  User,
} from "lucide-react";
import AparitionBodyCell from "./AparitionBody/AparitionBodyCell";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import React from "react";
import AparitionTableLayout from "./AparitionTableLayout";
import AparitionHeader from "./AparitionHeader/AparitionHeader";
import AparitionBody from "./AparitionBody/AparitionBody";

function AparitionsEditTable() {
  return (
    <div className="flex flex-col gap-2">
      <div className="border rounded-lg">
        <AparitionHeader />
        <AparitionBody />
      </div>
    </div>
  );
}

export default AparitionsEditTable;
