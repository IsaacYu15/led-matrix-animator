"use client";
import { ReactNode, useState } from "react";

export interface DragMoverProps {
  children: ReactNode;
  x: number;
  y: number;
  savePosition: () => void;
}
export default function DragMover(props: DragMoverProps) {
  const [x, setX] = useState<number>(props.x);
  const [y, setY] = useState<number>(props.y);

  const handleMove = (e?: React.MouseEvent) => {
    e?.preventDefault();

    const onMouseMove = (e?: MouseEvent) => {
      const y = e?.clientY ?? 0;
      const x = e?.clientX ?? 0;

      setX(x);
      setY(y);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      props.savePosition();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="absolute"
      style={{ top: `${y}px`, left: `${x}px` }}
      onMouseDown={handleMove}
    >
      {props.children}
    </div>
  );
}
