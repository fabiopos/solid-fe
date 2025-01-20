import React, { ReactNode, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface DroppableProps {
  children: ReactNode;
  className?: ClassNameValue;
  id: string;
  accepts?: string[];
}

function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef, active } = useDroppable({
    id: props.id,
    data: {
      accepts: props.accepts,
    },
  });

  const turnOn = useMemo(() => {
    return isOver && props.accepts?.includes(active?.data?.current?.type);
  }, [active?.data, isOver, props.accepts]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "border border-dashed overflow-hidden",
        turnOn && "text-orange-600 border-solid border-2 border-orange-500",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export default Droppable;
