import { Tile } from "./Tile.model";

export class TileMap {

    public name: string;
    public width: number;
    public height: number;
    public tiles: Array<Tile>;

    constructor(name: string, width: number, height: number) {

        this.name = name;
        this.width = width;
        this.height = height;
        this.tiles = new Array<Tile>(width * height);
    }
}
