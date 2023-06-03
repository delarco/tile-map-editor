import { Color } from "./Color.model";
import { Texture } from "./Texture.model";

export interface TileFaceTexture {

    north: Texture | null;
    south: Texture | null;
    east: Texture | null;
    west: Texture | null;
}

export class Tile {

    constructor(
        public x: number,
        public y: number,
        public minimapColor: Color = Color.WHITE,
        public collision: boolean = false,
        public wall: TileFaceTexture = { north: null, south: null, east: null, west: null },
        public floor: Texture | null,
        public ceiling: Texture | null,
    ) { }
}
