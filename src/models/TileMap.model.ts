import { SpawnLocation } from "./SpawnLocation.model";
import { Tile } from "./Tile.model";

export class TileMap {

    public name: string;
    public width: number;
    public height: number;
    public tiles: Array<Tile>;
    public spawnLocations: Array<SpawnLocation>;
    public skybox: string;
    public musicList: Array<string>;
    public sprites: Array<string>;

    constructor(name: string, width: number, height: number) {

        this.name = name;
        this.width = width;
        this.height = height;
        this.tiles = new Array<Tile>();
        this.spawnLocations = new Array<SpawnLocation>();
        this.musicList = new Array<string>();
        this.sprites = new Array<string>();

        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {

                this.tiles.push(new Tile(x, y));
            }
        }
    }
}
