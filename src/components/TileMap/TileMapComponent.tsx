import './TileMapComponent.css';
import React, { MouseEvent } from "react";
import { TileMap } from "../../models/TileMap.model";
import { Position } from "../../models/Position.model";
import { CanvasUtils } from "../../utils/Canvas.utils";
import TileInfoComponent from '../TileInfo/TileInfoComponent';
import { Tile } from '../../models/Tile.model';

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
    selectedTileStyle: { top: number, left: number, display: string },
    selectedTile: Tile | null,
}

class TileMapComponent extends React.Component<Props, State> {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    cursorTile: HTMLSpanElement;
    selectedTile: HTMLSpanElement;

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
            selectedTileStyle: { top: 0, left: 0, display: "none" },
            selectedTile: null,
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

        this.selectedTile = document.querySelector("#selected-tile")!;
        this.selectedTile.style.width = `${this.tileSize}px`;
        this.selectedTile.style.height = `${this.tileSize}px`;

        CanvasUtils.drawGrid(this.ctx, this.tileSize, "#00F");
        CanvasUtils.drawCircle(this.ctx, 260, 260, 10, "#F00", "#00F");
    }

    onCanvasMouseLeave(): void {

        this.setState({ cursorTilePos: null });
    }

    onCursorTileMouseLeave(): void {

        this.setState({
            cursorTileStyle: {
                top: 0,
                left: 0,
                display: 'none'
            },
        })
    }

    onCanvasMouseMove(event: MouseEvent<HTMLCanvasElement>): void {

        const rect = this.canvas.getBoundingClientRect();

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

    onTileSelect(cursorTile: Position | null): void {

        if (!cursorTile) return;

        const index = cursorTile.y * this.state.map.width + cursorTile.x;

        if (index < this.state.map.tiles.length) {

            const rect = this.canvas.getBoundingClientRect();

            this.setState({
                selectedTile: this.state.map.tiles[index],
                selectedTileStyle: {
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
                <div className='container'>
                    <canvas id="map-canvas"
                        onMouseMove={ev => this.onCanvasMouseMove(ev)}
                        // onMouseLeave={() => this.onCanvasMouseLeave()}
                        style={this.state.canvasStyle}>
                    </canvas>
                    <span id="cursor-tile"
                        onMouseUp={() => this.onTileSelect(this.state.cursorTilePos)}
                        onMouseLeave={() => this.onCursorTileMouseLeave()}
                        style={this.state.cursorTileStyle}></span>
                    <span id="selected-tile"
                        style={this.state.selectedTileStyle}></span>
                    <TileInfoComponent tile={this.state.selectedTile} />
                </div>

            </>
        );
    }
}

export default TileMapComponent;
