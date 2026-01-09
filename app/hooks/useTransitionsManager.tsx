import { TransitionDetails } from "@/types";
import { useState } from "react";

export default function useTransitionsManager() {
  const [transitions, setTransitions] = useState<TransitionDetails[]>();

  const fetchTransitions = async () => {
    const response = await fetch("/api/transitions");
    const data = await response.json();

    setTransitions(data as TransitionDetails[]);

    return transitions;
  };

  const addTransitions = async (details: TransitionDetails) => {
    const response = await fetch("/api/transitions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: details.id,
        from_id: details.from_id,
        to_id: details.to_id,
        condition: details.condition,
      }),
    });

    console.log(response);
  };

  return { transitions, fetchTransitions, addTransitions };
}
