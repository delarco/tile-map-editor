import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class SelectionTool implements Tool {

    public name = "SELECTION";

    private elementId = 'selected-tile';
    private element: HTMLSpanElement;

    private canvas: HTMLCanvasElement;
    private tileSize: number;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(canvas: HTMLCanvasElement, tileSize: number): void {

        const exists = document.querySelector<HTMLSpanElement>(`#${this.elementId}`);

        if (exists) {

            this.element = exists
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

    public tileMouseDown(): void {

    }

    public tileMouseUp(): void {

    }

    public tileClick(tile: Tile, button: number): void {

        if (button != 0) return;

        const rect = this.canvas.getBoundingClientRect();
        this.element.style.top = `${rect.top + tile.y * this.tileSize}px`;
        this.element.style.left = `${rect.left + tile.x * this.tileSize}px`;
        this.element.style.visibility = 'visible';
        this.onTileSelect(tile);
    }

    public tileMouseMove(): void {
        
    }

    public canvasMouseLeave(): void {
        
    }
}
