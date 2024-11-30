"use client";
import AparitionHeader from "./AparitionHeader/AparitionHeader";
import AparitionBody from "./AparitionBody/AparitionBody";
import AparitionCTA from "./AparitionCTA/AparitionCTA";

function AparitionsEditTable() {
  return (
    <div className="flex flex-col gap-2">
      <AparitionCTA />
      <div className="border rounded-lg">
        <AparitionHeader />
        <AparitionBody />
      </div>
    </div>
  );
}

export default AparitionsEditTable;
