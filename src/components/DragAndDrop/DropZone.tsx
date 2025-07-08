import { useDroppable } from "@dnd-kit/core";
import { usePlayersStore } from "@/context/PlayersCtx";
import { PlayerCard } from "@/components/DragAndDrop/PlayerCard";

interface DropZoneProps {
  id: string;
  label: string;
  className?: string;
}

export function DropZone({ id, label }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const assigned = usePlayersStore((s) => s.lineup[id] ?? null);

  return (
    <div
      ref={setNodeRef}
      className={`w-36 h-36 border-2 rounded-full flex items-center justify-center flex-col
        ${isOver ? "bg-blue-300" : "bg-white dark:bg-gray-900"}`}
    >
      <span className="text-xs mb-1 text-black dark:text-white">{label}</span>
      {assigned ? (
        <PlayerCard player={assigned} />
      ) : (
        <span className="text-xs italic text-neutral-500">Drop player</span>
      )}
    </div>
  );
}
