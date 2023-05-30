import React, { MouseEvent } from "react";
import { TileMap } from "../../models/TileMap.model";
import './MapComponent.css';
import { Position } from "../../models/Position.model";
import { CanvasUtils } from "../../utils/Canvas.utils";

interface Props {
    name?: string,
    width?: number,
    height?: number,
}

interface State {
    map: TileMap,
    canvasStyle: { width: string, height: string },
    cursorTileStyle: { top: number, left: number, display: string },
    cursorTilePos: Position | null,
}

class MapComponent extends React.Component<Props, State> {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    cursorTile: HTMLSpanElement;

    /**
     * Tile size (in pixels) on canvas
     */
    private tileSize = 50;

    constructor(props: Props) {
        super(props);

        // default props
        props = { ...{ name: 'New map', width: 10, height: 10 }, ...props };

        this.state = {
            map: new TileMap(props.name!, props.width!, props.height!),
            canvasStyle: {
                width: `${props.width! * this.tileSize}px`,
                height: `${props.height! * this.tileSize}px`,
            },
            cursorTileStyle: { top: 0, left: 0, display: "none" },
            cursorTilePos: null,
        };
    }

    componentDidMount(): void {

        this.canvas = document.querySelector("#map-canvas")!;
        this.canvas.width = this.state.map.width * this.tileSize;
        this.canvas.height = this.state.map.height * this.tileSize;

        this.ctx = this.canvas.getContext("2d")!;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1;
        this.ctx.imageSmoothingEnabled = false;

        this.cursorTile = document.querySelector("#cursor-tile")!;
        this.cursorTile.style.width = `${this.tileSize}px`;
        this.cursorTile.style.height = `${this.tileSize}px`;

        CanvasUtils.drawGrid(this.ctx, this.tileSize, "#00F");
    }

    onCanvasMouseLeave(): void {

        // TODO: hide cursorTile
    }

    onCanvasMouseMove(event: MouseEvent<HTMLCanvasElement>): void {

        const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();

        const cursorPos = new Position(
            event.clientX - rect.left,
            event.clientY - rect.top
        );

        const cursorTile = new Position(
            Math.floor(cursorPos.x / this.tileSize),
            Math.floor(cursorPos.y / this.tileSize)
        );

        if (
            (
                cursorTile.x != this.state.cursorTilePos?.x
                || cursorTile.y != this.state.cursorTilePos?.y
            )
            && cursorTile.x < this.state.map.width
            && cursorTile.y < this.state.map.height
            && cursorTile.x >= 0
            && cursorTile.y >= 0
        ) {
            this.setState({ 
                cursorTilePos: cursorTile,
                cursorTileStyle: {
                    top: rect.top + cursorTile.y * this.tileSize,
                    left: rect.left + cursorTile.x * this.tileSize,
                    display: '',
                }
            });
        }
    }

    render() {
        return (
            <>
                <h2>{this.state.map.name} - {this.state.map.width}x{this.state.map.height}</h2>
                <hr />
                <canvas id="map-canvas"
                    onMouseMove={ev => this.onCanvasMouseMove(ev)}
                    onMouseLeave={() => this.onCanvasMouseLeave()}
                    style={this.state.canvasStyle}>
                </canvas>
                <span id="cursor-tile" style={this.state.cursorTileStyle}></span>
            </>
        );
    }
}

export default MapComponent;
