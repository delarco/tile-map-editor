export class CanvasUtils {

    public static drawGrid(context: CanvasRenderingContext2D, tileSize: number, color: string): void {

        const verticalLines = Math.floor(context.canvas.width / tileSize);
        const horizontalLines = Math.floor(context.canvas.width / tileSize);

        context.strokeStyle = color;

        for(let x = 0; x < verticalLines; x++) {
            
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(x * tileSize, 0);
            context.lineTo(x * tileSize, context.canvas.height);
            context.stroke();
            context.closePath();
        }

        for(let y = 0; y < horizontalLines; y++) {

            context.beginPath();
            context.lineWidth = 1;
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
}
