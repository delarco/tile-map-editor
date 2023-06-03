import React from "react";
import { Tile } from "../models/Tile.model";

interface Props {
  children: React.ReactNode;
}

export type TileContextType = {
  tile: Tile | null;
  selectTile: (tile: Tile) => void;
};

export const TileContext = React.createContext<TileContextType | null>(null);

export const TileProvider: React.FC<Props> = ({ children }) => {

  const [selectedTile, setSelectedTile] = React.useState<Tile | null>(null);

  const selectTile = (tile: Tile) => {

    setSelectedTile(tile);
  }

  return (
    <TileContext.Provider value={{ tile: selectedTile, selectTile }}>
        {children}
    </TileContext.Provider>
  );
};
