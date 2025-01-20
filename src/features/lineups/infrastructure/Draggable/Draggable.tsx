import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  children: ReactNode;
  id: string,
  type: string
}
function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { type: props.type }
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export default Draggable;
