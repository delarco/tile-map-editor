import { Layer } from "../components/Layers/LayersComponent";
import { Texture } from "../models/Texture.model";
import { Tile } from "../models/Tile.model";
import { Tool, ToolActionParams } from "./Tool";

export class SetTextureTool implements Tool {

    public name = "SET TEXTURE";

    public domElement = null;

    private lastTile: Tile;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    public static instance: SetTextureTool;

    constructor() {

        SetTextureTool.instance = this;
    }

    private setTileTexture(tile: Tile, layer: Layer, texture: Texture): void {

        switch (layer) {

            case Layer.WALL:
                tile.collision = texture.collision;
                tile.wall.north = texture;
                tile.wall.south = texture;
                tile.wall.east = texture;
                tile.wall.west = texture;
                break;

            case Layer.FLOOR:
                tile.floor = texture;
                break;

            case Layer.CEILING:
                tile.ceiling = texture;
                break;
        }

        this.onTileUpdate(tile);
    }

    public tileMouseDown({ tile, layer, texture }: ToolActionParams): void {

        if (!tile || layer == null || !texture) return;

        this.lastTile = tile;
        this.setTileTexture(tile, layer, texture);
    }

    public tileMouseUp(): void {

    }

    public tileClick(): void {

    }

    public tileMouseMove({ tile, layer, texture, button }: ToolActionParams): void {

        if (!tile || layer == null || !texture || button != 1 || tile == this.lastTile) return;

        this.lastTile = tile;
        this.setTileTexture(tile, layer, texture);
    }

    public canvasMouseLeave(): void {

    }
}
