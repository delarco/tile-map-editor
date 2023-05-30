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
        this.tiles = new Array<Tile>();

        for(let y = 0; y < this.height; y++) {
            
            for(let x = 0; x < this.width; x++) {

                this.tiles.push(new Tile(x, y));
            }
        }
    }
}
