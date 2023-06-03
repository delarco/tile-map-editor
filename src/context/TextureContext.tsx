import React from "react";
import { Texture } from "../models/Texture.model";

interface Props {
  children: React.ReactNode;
}

export type TextureContextType = {
  texture: Texture | null;
  selectTexture: (texture: Texture) => void;
};

export const TextureContext = React.createContext<TextureContextType | null>(null);

export const TextureProvider: React.FC<Props> = ({ children }) => {

  const [selectedTexture, setSelectedTexture] = React.useState<Texture | null>(null);

  const selectTexture = (texture: Texture) => {

    setSelectedTexture(texture);
  }

  return (
    <TextureContext.Provider value={{ texture: selectedTexture, selectTexture }}>
        {children}
    </TextureContext.Provider>
  );
};
