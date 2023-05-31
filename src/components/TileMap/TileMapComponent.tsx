import './TileMapComponent.css';
import React from "react";
import { TileMap } from "../../models/TileMap.model";
import { Position } from "../../models/Position.model";
import { CanvasUtils } from "../../utils/Canvas.utils";
import TileInfoComponent from '../TileInfo/TileInfoComponent';
import { Tile } from '../../models/Tile.model';
import ToolBoxComponent from '../ToolBox/ToolBoxComponent';
import { Tool } from '../../tools/Tool';
import { HoverTool } from '../../tools/HoverTool';

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

    mouseOnCanvas: boolean = false;

    private tools: Array<Tool> = [
        new HoverTool(),
    ];

    private selectedTool: Tool;

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

        document.onclick = (ev) => this.onDocumentMouseEvent(ev);
        document.onmousedown = (ev) => this.onDocumentMouseEvent(ev);
        document.onmouseup = (ev) => this.onDocumentMouseEvent(ev);
        document.onmousemove = (ev) => this.onDocumentMouseEvent(ev);

        CanvasUtils.drawGrid(this.ctx, this.tileSize, "#00F");
        CanvasUtils.drawCircle(this.ctx, 260, 260, 10, "#F00", "#00F");

        if (this.selectedTool) this.selectedTool.setup(this.canvas, this.tileSize);

        for (let tool of this.tools) tool.setup(this.canvas, this.tileSize);
    }

    checkCanvasArea(x: number, y: number): boolean {

        const rect = this.canvas.getBoundingClientRect();

        return x >= rect.left
            && x <= rect.right
            && y >= rect.top
            && y <= rect.bottom;
    }

    getTileFromCanvasPosition(x: number, y: number): Tile | null {

        const rect = this.canvas.getBoundingClientRect();
        const cursorPos = new Position(x - rect.left, y - rect.top);
        const cursorTile = new Position(Math.floor(cursorPos.x / this.tileSize), Math.floor(cursorPos.y / this.tileSize));

        if (cursorTile.x >= 0
            && cursorTile.y >= 0
            && cursorTile.x < this.state.map.width
            && cursorTile.y < this.state.map.height) {

            const index = cursorTile.y * this.state.map.width + cursorTile.x;
            return this.state.map.tiles[index];
        }

        return null;
    }

    onDocumentMouseEvent(event: globalThis.MouseEvent): void {

        if (this.checkCanvasArea(event.clientX, event.clientY)) {

            this.mouseOnCanvas = true;

            const tile = this.getTileFromCanvasPosition(event.clientX, event.clientY);

            if (tile) {

                switch (event.type) {

                    case "click":
                        this.selectedTool.tileClick(tile, event.button);
                        for (let tool of this.tools) tool.tileClick(tile, event.button);
                        break;

                    case "mousedown":
                        this.selectedTool.tileMouseDown(tile, event.button);
                        for (let tool of this.tools) tool.tileMouseDown(tile, event.button);
                        break;

                    case "mouseup":
                        this.selectedTool.tileMouseUp(tile, event.button);
                        for (let tool of this.tools) tool.tileMouseUp(tile, event.button);
                        break;

                    case "mousemove":
                        this.selectedTool.tileMouseMove(tile, event.button);
                        for (let tool of this.tools) tool.tileMouseMove(tile, event.button);
                        break;
                }
            }
        }
        else {

            if (event.type == "mousemove") {

                if (this.mouseOnCanvas) {

                    this.mouseOnCanvas = false;

                    this.selectedTool.canvasMouseLeave();
                    for (let tool of this.tools) tool.canvasMouseLeave();
                }
            }
        }
    }

    onToolSelected(tool: Tool): void {

        this.selectedTool = tool;
        this.selectedTool.setup(this.canvas, this.tileSize);
    }

    render() {
        return (
            <>
                <h2>{this.state.map.name} - {this.state.map.width}x{this.state.map.height}</h2>
                <hr />
                <div className='container'>
                    <ToolBoxComponent onToolSelected={tool => this.onToolSelected(tool)} />
                    <canvas id="map-canvas" style={this.state.canvasStyle}></canvas>
                    <TileInfoComponent tile={this.state.selectedTile} />
                </div>

            </>
        );
    }
}

export default TileMapComponent;
