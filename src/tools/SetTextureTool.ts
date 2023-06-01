import { Layer } from "../components/Layers/LayersComponent";
import { Tile } from "../models/Tile.model";
import { Tool } from "./Tool";

export class SetTextureTool implements Tool {

    public name = "SET TEXTURE";

    private lastTile: Tile;
    private texture: string | null;
    private layer: Layer;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public setup(): void {

    }

    public setTexture(texture: string | null): void {

        if (texture && texture.toUpperCase().indexOf("BLANK.PNG") >= 0) {

            texture = null;
        }

        this.texture = texture;
    }

    public setLayer(layer: Layer | null): void {

        if (layer == null) return;
        this.layer = layer;
    }

    private setTileTexture(tile: Tile): void {

        switch (this.layer) {

            case Layer.WALL:
                tile.collision = this.texture != null;
                tile.wall = this.texture;
                break;

            case Layer.FLOOR:
                tile.floor = this.texture;
                break;

            case Layer.CEILING:
                tile.ceiling = this.texture;
                break;
        }

        this.onTileUpdate(tile);
    }

    public tileMouseDown(tile: Tile): void {

        this.lastTile = tile;
        this.setTileTexture(tile);
    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove(tile: Tile, button: number): void {

        if (button != 1 || tile == this.lastTile) return;

        this.lastTile = tile;
        this.setTileTexture(tile);
    }

    public canvasMouseLeave(): void {

    }
}
