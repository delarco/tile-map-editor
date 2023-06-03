import React from "react";
import { Tool } from "../tools/Tool";

interface Props {
  children: React.ReactNode;
}

export type ToolContextType = {
  tool: Tool | null;
  selectTool: (tool: Tool) => void;
};

export const ToolContext = React.createContext<ToolContextType | null>(null);

export const ToolProvider: React.FC<Props> = ({ children }) => {

  const [selectedTool, setSelectedTool] = React.useState<Tool | null>(null);

  const selectTool = (tool: Tool) => {

    setSelectedTool(tool);
  }

  return (
    <ToolContext.Provider value={{ tool: selectedTool, selectTool }}>
        {children}
    </ToolContext.Provider>
  );
};
