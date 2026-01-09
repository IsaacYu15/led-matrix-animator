"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface DragMoverProps {
  children: ReactNode;
  x: number;
  y: number;
  savePosition: () => void;
}
export default function DragMover(props: DragMoverProps) {
  const [x, setX] = useState<number>(props.x);
  const [y, setY] = useState<number>(props.y);
  const [offX, setOffX] = useState<number>(0);
  const [offY, setOffY] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offX = Math.floor((container.current?.offsetWidth ?? 0) / 2);
    const offY = Math.floor((container.current?.offsetHeight ?? 0) / 2);

    setOffX(offX);
    setOffY(offY);
  }, [props]);

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
      ref={container}
      className="absolute"
      style={{
        top: `${y - offY}px`,
        left: `${x - offX}px`,
      }}
      onMouseDown={handleMove}
    >
      {props.children}
    </div>
  );
}
