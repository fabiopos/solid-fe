import React from "react";
import AparitionTableLayout from "../AparitionTableLayout";
import { usePlayers } from "@/features/players/domain/usePlayers";
import AparitionBodyCell from "./AparitionBodyCell";

function AparitionBody() {
  const { players } = usePlayers();
  return (
    <AparitionTableLayout>
      {players.map((p) => (
        <React.Fragment key={`player-${p.id}`}>
          <AparitionBodyCell>
            {p.firstName} {p.lastName}
          </AparitionBodyCell>
          <AparitionBodyCell>0</AparitionBodyCell>
          <AparitionBodyCell>0</AparitionBodyCell>
          <AparitionBodyCell>0</AparitionBodyCell>
          <AparitionBodyCell>0</AparitionBodyCell>
          <AparitionBodyCell>0</AparitionBodyCell>
          <AparitionBodyCell>0</AparitionBodyCell>
          <AparitionBodyCell>6.0</AparitionBodyCell>
        </React.Fragment>
      ))}
    </AparitionTableLayout>
  );
}

export default AparitionBody;
