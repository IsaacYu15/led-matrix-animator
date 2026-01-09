"use client";

import { StateDetails, TransitionDetails } from "@/types";
import { useEffect, useState } from "react";
import { HiCodeBracketSquare } from "react-icons/hi2";
import State from "./state";
import Arrow from "./arrow";
import useStateManager from "../hooks/useStatesManager";
import useTransitionsManager from "../hooks/useTransitionsManager";

export default function Page() {
  const { states, statesMap, fetchStates, addState } = useStateManager();
  const { transitions, fetchTransitions, addTransitions } =
    useTransitionsManager();

  const [fromId, setFromId] = useState<number | null>(null);

  const onRefresh = () => {
    fetchStates();
    fetchTransitions();
  };

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

    await onRefresh();
  };

  const trackArrowState = async (id: number) => {
    if (!fromId) {
      setFromId(id);
    } else {
      await addTransitions({
        id: 0,
        from_id: fromId,
        to_id: id,
        condition: "",
      });
      setFromId(null);

      await onRefresh();
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-50 relative bg-[radial-gradient(#D3D3D3_1px,transparent_0)] bg-[length:20px_20px]">
      <div className="absolute bottom-5 right-1/2 translate-x-1/2 h-15 rounded-2xl drop-shadow-2xl bg-white w-1/3 flex flex-row justify-center items-center">
        <button className="text-2xl" onClick={createNewState}>
          <HiCodeBracketSquare></HiCodeBracketSquare>
        </button>
      </div>

      {states?.map((state: StateDetails) => {
        return (
          <State
            key={state.id}
            id={state.id}
            animation_id={state.animation_id}
            name={state.name}
            x={state.x}
            y={state.y}
            onRefresh={onRefresh}
            arrowClick={trackArrowState}
          ></State>
        );
      })}

      {statesMap &&
        transitions?.map((transition: TransitionDetails) => {
          const from = statesMap.get(transition.from_id) ?? { x: 0, y: 0 };
          const to = statesMap.get(transition.to_id) ?? { x: 0, y: 0 };

          return (
            <Arrow
              key={transition.id}
              from={{ x: from.x, y: from.y }}
              to={{ x: to.x, y: to.y }}
            ></Arrow>
          );
        })}
    </div>
  );
}
