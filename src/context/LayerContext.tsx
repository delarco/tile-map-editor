import React from "react";
import { Layer } from "../components/Layers/LayersComponent";

interface Props {
  children: React.ReactNode;
}

export type LayerContextType = {
  layer: Layer | null;
  selectLayer: (layer: Layer) => void;
};

export const LayerContext = React.createContext<LayerContextType | null>(null);

export const LayerProvider: React.FC<Props> = ({ children }) => {

  const [selectedLayer, setSelectedLayer] = React.useState<Layer | null>(null);

  const selectLayer = (layer: Layer) => {

    setSelectedLayer(layer);
  }

  return (
    <LayerContext.Provider value={{ layer: selectedLayer, selectLayer }}>
        {children}
    </LayerContext.Provider>
  );
};
