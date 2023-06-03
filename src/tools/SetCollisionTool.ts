import { Tile } from "../models/Tile.model";
import { Tool, ToolActionParams } from "./Tool";

export class SetCollisionTool implements Tool {

    public name = "SET COLLISION";

    public domElement = null;

    private lastTile: Tile | null;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(): void {

    }

    public setTexture(): void {

    }

    public setLayer(): void {

    }

    public tileMouseDown({ tile }: ToolActionParams): void {

        this.lastTile = tile;

        if (!tile) return;

        tile.collision = !tile.collision;
        this.onTileUpdate(tile);
    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove({ tile, button }: ToolActionParams): void {

        if (button != 1 || !tile || tile == this.lastTile) return;

        this.lastTile = tile;
        tile.collision = !tile.collision;
        this.onTileUpdate(tile);
    }

    public canvasMouseLeave(): void {

    }
}
