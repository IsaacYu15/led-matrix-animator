import { StateDetails } from "@/types";
import DragMover from "../components/dragHandlers/dragMover";
import useStateManager from "../hooks/useStatesManager";
import { useRef } from "react";

export interface StateProps extends StateDetails {
  onRefresh: () => void;
  onTransitionClick: (id: number) => void;
  onClick: (id: number) => void;
}

export default function State(props: StateProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const { updateStates } = useStateManager();

  const handleSaveState = async () => {
    if (!dragRef?.current) return;

    const rect = dragRef.current.getBoundingClientRect();

    await updateStates({
      id: props.id,
      animation_id: props.animation_id,
      name: props.name,
      x: rect.left,
      y: rect.top,
    });

    await props.onRefresh();
  };

  return (
    <DragMover x={props.x} y={props.y} savePosition={handleSaveState}>
      <div
        className="relative flex flex-row"
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <button
          className="relative group w-5 h-auto"
          onClick={() => {
            props.onTransitionClick(props.id);
          }}
          onMouseDown={(e) => {
            e?.stopPropagation();
          }}
        >
          <div className="hidden group-hover:block bg-blue-300 rounded-full w-3 aspect-square absolute top-3 right-1/2 translate-x-1/2"></div>
        </button>
        <div
          ref={dragRef}
          className=" bg-white border-2 border-solid border-gray-500 rounded-2xl py-1 px-5"
        >
          <h1>{props.name}</h1>
        </div>
      </div>
    </DragMover>
  );
}
