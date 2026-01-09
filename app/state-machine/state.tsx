import { StateDetails } from "@/types";
import DragMover from "../components/dragHandlers/dragMover";
import useStateManager from "../hooks/useStatesManager";
import { useRef } from "react";

export interface StateProps extends StateDetails {
  onRefresh: () => void;
}

export default function State(props: StateProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const { updateStates } = useStateManager();

  const handleSaveState = () => {
    if (!dragRef?.current) return;

    const rect = dragRef.current.getBoundingClientRect();

    updateStates({
      id: props.id,
      animation_id: props.animation_id,
      name: props.name,
      x: rect.left,
      y: rect.top,
    });
  };

  return (
    <DragMover x={props.x} y={props.y} savePosition={handleSaveState}>
      <div
        ref={dragRef}
        className="bg-white border-2 border-solid border-gray-500 rounded-2xl py-1 px-5"
      >
        <h1>{props.name}</h1>
      </div>
    </DragMover>
  );
}
