import { Color } from "./Color.model";

export class Tile {

    constructor(
        public x: number,
        public y: number,
        public minimapColor: Color = Color.WHITE,
        public collision: boolean = false,
        public wall: string | null = null,
        public floor: string | null = null,
        public ceiling: string | null = null,
    ) { }
}
