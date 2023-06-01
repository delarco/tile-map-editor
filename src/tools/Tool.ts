import { Layer } from "../components/Layers/LayersComponent";
import { Tile } from "../models/Tile.model";

export interface Tool {

    name: string;

    setup(canvas: HTMLCanvasElement, tileSize: number): void;

    setTexture(texture: string | null): void;

    setLayer(layer: Layer | null): void;

    tileMouseDown(tile: Tile, button: number): void;

    tileMouseUp(tile: Tile, button: number): void;

    tileClick(tile: Tile, button: number): void;

    tileMouseMove(tile: Tile, button: number): void;

    canvasMouseLeave(): void;

    onTileSelect(tile: Tile): void;

    onTileUpdate(tile: Tile): void;
}
