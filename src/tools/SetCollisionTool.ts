import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class SetCollisionTool implements Tool {

    public name = "SET COLLISION";

    private lastTile: Tile;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(): void {

    }

    public setTexture(): void {

    }

    public tileMouseDown(tile: Tile): void {

        this.lastTile = tile;
        tile.collision = !tile.collision;
        this.onTileUpdate(tile);
    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove(tile: Tile, button: number): void {

        if (button != 1 || tile == this.lastTile) return;

        this.lastTile = tile;
        tile.collision = !tile.collision;
        this.onTileUpdate(tile);
    }

    public canvasMouseLeave(): void {

    }
}
