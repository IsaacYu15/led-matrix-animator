"use client";

import { useEffect } from "react";
import useModules from "../../hooks/useModules";

import ModuleManager from "../../components/moduleManager/moduleManager";
import { ModuleDetails } from "@/types";

export default function Page() {
  const {modules, fetchModules} = useModules();

  useEffect(() => {
    fetchModules();
  }, [fetchModules])
  
  return (
    <div>
      {modules?.map((module: ModuleDetails) => {
        return (
          <ModuleManager
            key={module.id}
            id={module.id}
            name={module.name}
            address={module.address}
          ></ModuleManager>
        );
      })}
    </div>
  );
}
