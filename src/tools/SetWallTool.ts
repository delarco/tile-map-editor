import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class SetWallTool implements Tool {

    public name = "SET WALL";

    private lastTile: Tile;
    private texture: string;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(): void {

    }

    public setTexture(texture: string | null): void {

        if (!texture) return;
        this.texture = texture;
    }

    public tileMouseDown(tile: Tile): void {

        this.lastTile = tile;
        tile.wall = this.texture;
        this.onTileUpdate(tile);
    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove(tile: Tile, button: number): void {

        if (button != 1 || tile == this.lastTile) return;

        this.lastTile = tile;
        tile.wall = this.texture;
        this.onTileUpdate(tile);
    }

    public canvasMouseLeave(): void {

    }
}
