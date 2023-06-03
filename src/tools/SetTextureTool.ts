import { Layer } from "../components/Layers/LayersComponent";
import { Texture } from "../models/Texture.model";
import { Tile, TileFaceTexture } from "../models/Tile.model";
import { Tool, ToolActionParams } from "./Tool";

export class SetTextureTool implements Tool {

    public name = "SET TEXTURE";

    public domElement = null;

    private lastTile: Tile;

    public onTileSelect: (tile: Tile) => void;
    public onTileUpdate: (tile: Tile) => void;

    private setTileTexture(tile: Tile, layer: Layer, texture: Texture): void {

        let layerProperty: TileFaceTexture | null = null;

        switch (layer) {

            case Layer.WALL:               
                layerProperty = tile.wall;
                break;

            case Layer.FLOOR:
                layerProperty = tile.floor;
                break;

            case Layer.CEILING:
                layerProperty = tile.ceiling;
                break;
        }

        if (layerProperty) {

            tile.collision = texture.collision;
            layerProperty.north = texture;
            layerProperty.south = texture;
            layerProperty.east = texture;
            layerProperty.west = texture;

            this.onTileUpdate(tile);
        }
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
