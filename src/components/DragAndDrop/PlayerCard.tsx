import {UniqueIdentifier, useDraggable} from "@dnd-kit/core";
import {FulfilledPlayerWithStats} from "@/features/players/domain/player.effect.schema";
import Link from "next/link";

interface PlayerCardProps {
    player: FulfilledPlayerWithStats;
    draggable?: boolean;
}

export function PlayerCard({player, draggable = true}: PlayerCardProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: player.id as UniqueIdentifier,
    });

    const style = draggable && transform
        ? {transform: `translate(${transform.x}px, ${transform.y}px)`}
        : undefined;

    const baseClass =
        "p-2 rounded shadow text-center text-sm flex flex-col items-center justify-center";
    const classes = `${baseClass} ${
        draggable ? "cursor-move bg-white" : "bg-green-700 text-white"
    }`;

    return (
        <div
            ref={draggable ? setNodeRef : undefined}
            {...(draggable ? listeners : {})}
            {...(draggable ? attributes : {})}
            style={style}
            className={classes}
        >
            <div className="flex flex-col">
                <Link
                    href={`/players/details/${player.id}`}
                    className="text-lg uppercase"
                >
                    {player.shirtName}
                </Link>
                <small className="text-neutral-500">
                    {player.firstName} {player.lastName}
                </small>
            </div>
        </div>
    );
}