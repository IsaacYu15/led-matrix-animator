import { StateDetails } from "@/types";
import { useState } from "react";

export default function useStateManager() {
  const [states, setStates] = useState<StateDetails[]>([]);
  const [statesMap, setStatesMap] = useState<Map<number, StateDetails>>(
    new Map()
  );

  const fetchStates = async () => {
    const response = await fetch("/api/states");
    const data = (await response.json()) as StateDetails[];
    setStates(data);

    const tempMap = new Map<number, StateDetails>();

    data.forEach((value: StateDetails) => {
      tempMap.set(value.id, value);
    });

    setStatesMap(tempMap);

    return data;
  };

  const updateStates = async (details: StateDetails) => {
    const response = await fetch("/api/states", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        animation_id: details.animation_id,
        name: details.name,
        x: details.x,
        y: details.y,
      }),
    });

    console.log(response, details.name);
  };

  const addState = async (details: StateDetails) => {
    const response = await fetch("/api/states", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        animation_id: details.animation_id,
        name: details.name,
        x: details.x,
        y: details.y,
      }),
    });

    console.log(response, details.name);
  };

  const deleteState = async (id: number) => {
    const response = await fetch("/api/states", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    console.log(response, id);
  };

  return {
    states,
    statesMap,
    fetchStates,
    updateStates,
    addState,
    deleteState,
  };
}
