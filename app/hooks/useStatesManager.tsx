import { StateDetails } from "@/types";
import { useState } from "react";

export default function useStateManager() {
  const [states, setStates] = useState<StateDetails[]>([]);

  const fetchStates = async () => {
    const response = await fetch("/api/states");
    const data = await response.json();

    setStates(data as StateDetails[]);
    console.log(data);

    return data as StateDetails[];
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

  return { states, fetchStates, updateStates, addState };
}
