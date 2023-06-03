import React, { HTMLAttributes } from "react";
import { Tile } from "../models/Tile.model";
import { Tool, ToolActionParams } from "./Tool";

export class SelectionTool implements Tool {

    public name = "SELECTION";

    private elementId = 'selected-tile';

    public domElement: React.DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    constructor() {

        this.domElement = React.createElement(
            "span",
            {
                id: this.elementId,
                style: {
                    left: 0,
                    top: 0,
                    width: 1,
                    height: 1,
                    visibility: 'visible'
                }
            },
        );
    }

    public tileMouseDown(): void {

    }

    public tileMouseUp(): void {

    }

    public tileClick(params: ToolActionParams): void {

        if (params.button != 0
            || !params.canvas
            || !params.tile
            || !params.tileSize) return;

        const rect = params.canvas.getBoundingClientRect();

        const element = document.querySelector<HTMLSpanElement>(`#${this.elementId}`);

        if (!element) {

            alert('element not found');
            return;
        }

        element.style.top = `${rect.top + params.tile.y * params.tileSize}px`;
        element.style.left = `${rect.left + params.tile.x * params.tileSize}px`;
        element.style.width = `${params.tileSize}px`;
        element.style.height = `${params.tileSize}px`;
        element.style.visibility = 'visible';
        this.onTileSelect(params.tile);
    }

    public tileMouseMove(): void {

    }

    public canvasMouseLeave(): void {

    }
}
