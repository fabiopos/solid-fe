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
        draggable
            ? "cursor-move bg-white dark:bg-gray-900"
            : "bg-gray-400 text-white shadow"
    }`;

    return (
        <div
            ref={draggable ? setNodeRef : undefined}
            {...(draggable ? listeners : {})}
            {...(draggable ? attributes : {})}
            style={style}
            className={classes}
        >
            <div className="flex flex-col items-center justify-center max-w-36 min-w-36 max-h-20 min-h-20">
                <Link
                    href={`/players/details/${player.id}`}
                    className="text-lg uppercase dark:text-white hover:underline hover:text-blue-700"
                >
                    {player.shirtName}
                </Link>
                <small className="text-black">
                    {player.firstName} {player.lastName}
                </small>
            </div>
        </div>
    );
}