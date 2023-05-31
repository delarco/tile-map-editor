import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class SetCollisionTool implements Tool {

    public name = "SET COLLISION";

    private lastTile: Tile;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    setup(): void {

    }

    tileMouseDown(): void {

    }

    tileMouseUp(): void {

    }

    tileClick(): void {

    }

    tileMouseMove(tile: Tile, button: number): void {

        if (button != 1 || tile == this.lastTile) return;

        this.lastTile = tile;
        tile.collision = !tile.collision;
        this.onTileUpdate(tile);
    }

    canvasMouseLeave(): void {

    }
}
