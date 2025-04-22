"use client";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import PlayerTableRow from "./PlayerTableRow/PlayerTableRow";
import {FulfilledPlayerWithStats} from "../domain/player.effect.schema";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {LineupField} from "@/components/DragAndDrop/LineupField";
import {usePlayersStore} from "@/context/PlayersCtx";

interface PlayersTableProps {
    players: FulfilledPlayerWithStats[],
    caption?: string,
}

export default function PlayersTable({players = [], caption}: PlayersTableProps) {
    const assignPlayerToPosition = usePlayersStore((state) => state.assignPlayerToPosition);
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over) return;

        const player = players.find((x) => x.id === active.id);
        if (player) {
            assignPlayerToPosition(over.id.toString(), player);
        }
    }

    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="w-full my-4">
                    <div className="w-1/2 mx-auto">
                        <LineupField/>
                    </div>
                </div>
                <div className="w-full">
                    <Table className="border w-auto">
                        <TableCaption className="text-xs italic">{caption}</TableCaption>
                        <TableHeader>
                            <TableRow className="text-xs bg-neutral-50 dark:bg-gray-900 border">
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
                                <PlayerTableRow key={p.id} player={p}/>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </DndContext>
        </>
    );
}
