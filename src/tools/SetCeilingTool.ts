import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class SetCeilingTool implements Tool {

    public name = "SET CEILING";

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(): void {

    }

    public tileMouseDown(): void {

    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove(): void {

    }

    public canvasMouseLeave(): void {

    }
}
