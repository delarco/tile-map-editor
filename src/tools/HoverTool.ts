import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class HoverTool implements Tool {

    public name = "HOVER";

    private elementId = 'cursor-tile';
    private element: HTMLSpanElement;

    private canvas: HTMLCanvasElement;
    private tileSize: number;

    private lastTile: Tile;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(canvas: HTMLCanvasElement, tileSize: number): void {

        const exists = document.querySelector<HTMLSpanElement>(`#${this.elementId}`);

        if (exists) {

            this.element = exists;
        }
        else {

            this.element = document.createElement("span");
            this.element.id = this.elementId;
            this.element.style.visibility = 'hidden';
            document.querySelector('#root')?.appendChild(this.element);
        }

        this.canvas = canvas;
        this.tileSize = tileSize;
        this.element.style.width = `${tileSize}px`;
        this.element.style.height = `${tileSize}px`;
    }

    public setTexture(): void {

    }

    public setLayer(): void {

    }

    public tileMouseDown(): void {

    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove(tile: Tile): void {

        if (tile == this.lastTile) return;
        this.lastTile = tile;

        const rect = this.canvas.getBoundingClientRect();
        this.element.style.top = `${rect.top + tile.y * this.tileSize}px`;
        this.element.style.left = `${rect.left + tile.x * this.tileSize}px`;
        this.element.style.visibility = 'visible';
    }

    public canvasMouseLeave(): void {

        this.element.style.visibility = 'hidden';
    }
}