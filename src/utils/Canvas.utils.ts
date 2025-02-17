import { Layer } from "../components/Layers/LayersComponent";
import { Tile } from "../models/Tile.model";

export class CanvasUtils {

    public static drawGrid(context: CanvasRenderingContext2D, tileSize: number, color: string): void {

        const verticalLines = Math.floor(context.canvas.width / tileSize);
        const horizontalLines = Math.floor(context.canvas.width / tileSize);

        context.strokeStyle = color;
        context.lineWidth = 1;

        for (let x = 1; x < verticalLines; x++) {

            context.beginPath();
            context.moveTo(x * tileSize, 0);
            context.lineTo(x * tileSize, context.canvas.height);
            context.stroke();
            context.closePath();
        }

        for (let y = 1; y < horizontalLines; y++) {

            context.beginPath();
            context.moveTo(0, y * tileSize);
            context.lineTo(context.canvas.width, y * tileSize);
            context.stroke();
            context.closePath();

        }
    }

    public static drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, borderColor: string, fillColor: string): void {

        context.strokeStyle = borderColor;
        context.fillStyle = fillColor;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }

    public static drawTile(context: CanvasRenderingContext2D, tile: Tile, tileSize: number, layer: Layer | null): void {

        const tileX = (tile.x * tileSize);
        const tileY = (tile.y * tileSize);

        // clear tile
        context.fillStyle = "#FFF";
        context.fillRect(tileX + 1, tileY + 1, tileSize - 2, tileSize - 2);

        let imageElement: HTMLImageElement | null = null;

        // draw wall texture
        if (layer == Layer.WALL && tile.wall.north) {

            imageElement = tile.wall.north.image;
        }

        // draw floor texture
        if (layer == Layer.FLOOR && tile.floor) {

            imageElement = tile.floor.image;
        }

        // draw ceiling texture
        if (layer == Layer.CEILING && tile.ceiling) {

            imageElement = tile.ceiling.image;
        }

        if (imageElement) {

            context.drawImage(
                imageElement,
                tileX + 1, tileY + 1,
                tileSize - 2, tileSize - 2
            );
        }

        // draw X for collision
        if (tile.collision) {

            context.strokeStyle = "#F00";
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(tileX + 1, tileY + 1);
            context.lineTo(tileX + tileSize / 5, tileY + tileSize / 5);
            context.stroke();
            context.moveTo(tileX + 1, tileY + tileSize / 5);
            context.lineTo(tileX + tileSize / 5, tileY + 1);
            context.stroke();
            context.closePath();

        }
    }
}
