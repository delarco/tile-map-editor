import React, { HTMLAttributes } from "react";
import { Tile } from "../models/Tile.model";
import { Tool, ToolActionParams } from "./Tool";

export class HoverTool implements Tool {

    public name = "HOVER";

    private elementId = 'cursor-tile';

    public domElement: React.DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>;

    private lastTile: Tile;

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

    public tileClick(): void {

    }

    public tileMouseMove(params: ToolActionParams): void {

        if (!params.canvas || !params.tile || !params.tileSize) return;

        if (params.tile == this.lastTile) return;
        
        this.lastTile = params.tile;

        const rect = params.canvas.getBoundingClientRect();

        const element = document.querySelector<HTMLSpanElement>(`#${this.elementId}`);

        if (!element) return;

        element.style.top = `${rect.top + params.tile.y * params.tileSize}px`;
        element.style.left = `${rect.left + params.tile.x * params.tileSize}px`;
        element.style.width = `${params.tileSize}px`;
        element.style.height = `${params.tileSize}px`;
        element.style.visibility = 'visible';
    }

    public canvasMouseLeave(): void {

        const element = document.querySelector<HTMLSpanElement>(`#${this.elementId}`);
        if (element) element.style.visibility = 'hidden';
    }
}