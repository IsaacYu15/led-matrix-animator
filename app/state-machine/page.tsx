"use client";

import { StateDetails } from "@/types";
import { useEffect } from "react";
import { HiCodeBracketSquare } from "react-icons/hi2";
import useStateManager from "../hooks/useStatesManager";
import State from "./state";
import { ArrowHead } from "../../public/state-machine";

export default function Page() {
  const { states, fetchStates, addState } = useStateManager();

  useEffect(() => {
    fetchStates();
  }, []);

  const createNewState = async () => {
    const centerX = Math.floor(window.innerWidth / 2);
    const centerY = Math.floor(window.innerHeight / 2);

    await addState({
      id: 0,
      animation_id: 0,
      name: "New State",
      x: centerX,
      y: centerY,
    });

    await fetchStates();
  };

  return (
    <div className="w-screen h-screen bg-gray-50 relative bg-[radial-gradient(#D3D3D3_1px,transparent_0)] bg-[length:20px_20px]">
      <div className="absolute bottom-5 right-1/2 translate-x-1/2 h-15 rounded-2xl drop-shadow-2xl bg-white w-1/3 flex flex-row justify-center items-center">
        <button className="text-2xl" onClick={createNewState}>
          <HiCodeBracketSquare></HiCodeBracketSquare>
        </button>
      </div>

      <ArrowHead></ArrowHead>

      {states?.map((state: StateDetails, i: number) => {
        return (
          <State
            key={i}
            id={state.id}
            animation_id={state.animation_id}
            name={state.name}
            x={state.x}
            y={state.y}
            onRefresh={fetchStates}
          ></State>
        );
      })}
    </div>
  );
}
