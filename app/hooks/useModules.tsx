import { ModuleDetails } from "@/types";
import { useState } from "react";

export default function useModules() {
  const [modules, setModules] = useState<ModuleDetails[]>();

  const fetchModules = async () => {
    const response = await fetch("/api/modules");
    const data = await response.json();

    setModules(data as ModuleDetails[]);
  };

  const updateModule = async (details: ModuleDetails) => {
    const response = await fetch("/api/modules", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: details.address,
        name: details.name,
        id: details.id,
      }),
    });
  };

  return { modules, fetchModules, updateModule };
}
