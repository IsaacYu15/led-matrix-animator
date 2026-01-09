"use client";
import { ReactNode, useState } from "react";

export interface DragResizerProps {
  minHeight: number;
  children: ReactNode;
}

export default function DragResizer(props: DragResizerProps) {
  const [height, setHeight] = useState<number>(props.minHeight);

  const handleResize = (e?: React.MouseEvent) => {
    e?.preventDefault();

    const onMouseMove = (e?: MouseEvent) => {
      const mouseHeight = e?.clientY ?? 0;
      const newHeight = Math.max(
        window.innerHeight - mouseHeight,
        props.minHeight
      );
      setHeight(newHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative pt-5" style={{ height: `${height}px` }}>
      <div
        className="absolute top-2 right-1/2 translate-x-1/2 h-1.5 w-12 bg-slate-950/40 rounded-full"
        onMouseDown={handleResize}
      ></div>
      {props.children}
    </div>
  );
}
