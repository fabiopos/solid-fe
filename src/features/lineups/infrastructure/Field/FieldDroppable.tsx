import { ReactNode } from "react";
import Droppable from "../Droppable/Droppable";

function FieldDroppable(props: { children: ReactNode }) {
  return (
    <Droppable id="field-droppable">
      <div className="bg-green-500">{props.children}</div>
    </Droppable>
  );
}

export default FieldDroppable;
