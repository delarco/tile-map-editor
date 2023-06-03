import React from "react";
import { Layer } from "../components/Layers/LayersComponent";
import { Tile } from "../models/Tile.model";

export interface ToolActionParams {

    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    tile: Tile | null;
    button: number | null;
    layer: Layer | null;
    texture: string | null;
    tileSize: number | null;
}

export interface Tool {

    name: string;

    domElement: React.DetailedReactHTMLElement<{}, HTMLElement> | null;

    tileMouseDown(params: ToolActionParams): void;

    tileMouseUp(params: ToolActionParams): void;

    tileClick(params: ToolActionParams): void;

    tileMouseMove(params: ToolActionParams): void;

    canvasMouseLeave(): void;

    onTileSelect(tile: Tile): void;

    onTileUpdate(tile: Tile): void;
}
