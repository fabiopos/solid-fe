"use client";
import React, { useCallback, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  CollisionDetection as CollisionDetectionType,
} from "@dnd-kit/core";

import Draggable from "./Draggable/Draggable";
import Droppable from "./Droppable/Droppable";
import FieldDroppable from "./Field/FieldDroppable";
import { Button } from "@/components/ui/button";
import { customCollisionDetectionAlgorithm } from "@/lib/dnd.utils";

const collisionDetection: CollisionDetectionType = (args) => {
  return customCollisionDetectionAlgorithm(args);
};

function LineupsFt() {
  const [droppedGk, setDroppedGk] = useState<string | null>(null);
  const [droppedDfc, setDroppedDfc] = useState<string | null>(null);
  const [droppedDfi, setDroppedDfi] = useState<string | null>(null);
  const [droppedDfd, setDroppedDfd] = useState<string | null>(null);
  const [droppedMi, setDroppedMi] = useState<string | null>(null);
  const [droppedMd, setDroppedMd] = useState<string | null>(null);
  const [droppedMco, setDroppedMco] = useState<string | null>(null);
  const [droppedFw, setDroppedFw] = useState<string | null>(null);

  const reset = useCallback(() => {
    setDroppedGk(null);
    setDroppedDfc(null);
    setDroppedDfi(null);
    setDroppedDfd(null);
    setDroppedMi(null);
    setDroppedMd(null);
    setDroppedMco(null);
    setDroppedFw(null);
  }, []);

  const playerGk = (
    <Draggable id="player1" type="gk">
      Player GK
    </Draggable>
  );
  const playerDfi = (
    <Draggable id="player2" type="df">
      Player Dfi
    </Draggable>
  );
  const playerDfc = (
    <Draggable id="player3" type="df">
      Player Dfc
    </Draggable>
  );
  const playerDfd = (
    <Draggable id="player4" type="df">
      Player DFD
    </Draggable>
  );
  const playerMco = (
    <Draggable id="player5" type="mf">
      Player MCO
    </Draggable>
  );
  const playerMd = (
    <Draggable id="player6" type="mf">
      Player MD
    </Draggable>
  );
  const playerMi = (
    <Draggable id="player7" type="mf">
      Player MI
    </Draggable>
  );
  const playerFw = (
    <Draggable id="player8" type="fw">
      Player FW
    </Draggable>
  );

  return (
    <div className="p-5">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={collisionDetection}
      >
        <div className="grid grid-cols-2 gap-5">
          <FieldDroppable>
            <div className="border border-red-500 grid grid-cols-5 grid-rows-4 gap-5 min-h-[400px] items-center">
              <Droppable
                id="dp_fw"
                className="row-start-1 col-start-3 min-h-[50px] content-center text-center"
                accepts={["fw"]}
              >
                {droppedFw ? droppedFw : "FW"}
              </Droppable>
              <Droppable
                id="dp_mi"
                className="row-start-2 col-start-2 min-h-[50px] content-center text-center"
                accepts={["mf"]}
              >
                {droppedMi ? droppedMi : "MI"}
              </Droppable>
              <Droppable
                id="dp_mco"
                className="row-start-2 col-start-3 min-h-[50px] content-center text-center"
                accepts={["mf"]}
              >
                {droppedMco ? droppedMco : "MCO"}
              </Droppable>
              <Droppable
                id="dp_md"
                className="row-start-2 col-start-4 min-h-[50px] content-center text-center"
                accepts={["mf"]}
              >
                {droppedMd ? droppedMd : "MD"}
              </Droppable>
              <Droppable
                id="dp_dfi"
                className="row-start-3 col-start-2 min-h-[50px] content-center text-center"
                accepts={["df"]}
              >
                {droppedDfi ? droppedDfi : "DFI"}
              </Droppable>
              <Droppable
                id="dp_dfc"
                className="row-start-3 col-start-3 min-h-[50px] content-center text-center"
                accepts={["df"]}
              >
                {droppedDfc ? droppedDfc : "DFC"}
              </Droppable>
              <Droppable
                id="dp_dfd"
                className="row-start-3 col-start-4 min-h-[50px] content-center text-center"
                accepts={["df"]}
              >
                {droppedDfd ? droppedDfd : "DFD"}
              </Droppable>
              <Droppable
                id="dp_gk"
                className="col-start-3 row-start-4 min-h-[50px] content-center text-center"
                accepts={["gk"]}
              >
                {droppedGk ? droppedGk : "GK"}
              </Droppable>
            </div>
          </FieldDroppable>
          <div className="flex flex-col gap-2">
            {playerGk}
            {playerDfc}
            {playerDfd}
            {playerDfi}
            {playerMco}
            {playerMd}
            {playerMi}
            {playerFw}
            <Button onClick={reset}>Reset</Button>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (
      over &&
      over.data?.current?.accepts?.includes(active.data?.current?.type)
    ) {
      // do stuff
      if (over.id === "dp_gk")
        setDroppedGk(`dropped ${active.data?.current?.type}`);

      if (over.id === "dp_dfc")
        setDroppedDfc(`dropped ${active.data?.current?.type}`);

      if (over.id === "dp_dfi")
        setDroppedDfi(`dropped ${active.data?.current?.type}`);

      if (over.id === "dp_dfd")
        setDroppedDfd(`dropped ${active.data?.current?.type}`);

      //
      if (over.id === "dp_mco")
        setDroppedMco(`dropped ${active.data?.current?.type}`);

      if (over.id === "dp_mi")
        setDroppedMi(`dropped ${active.data?.current?.type}`);

      if (over.id === "dp_md")
        setDroppedMd(`dropped ${active.data?.current?.type}`);

      //
      if (over.id === "dp_fw")
        setDroppedFw(`dropped ${active.data?.current?.type}`);
    }
  }
}

export default LineupsFt;
