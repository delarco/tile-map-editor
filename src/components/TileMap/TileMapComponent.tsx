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
import TilesetComponent from '../Tileset/TilesetComponent';
import LayersComponent, { Layer } from '../Layers/LayersComponent';

interface Props {
    name?: string,
    width?: number,
    height?: number,
}

interface State {
    map: TileMap,
    canvasStyle: { width: string, height: string },
    selectedTile: Tile | null,
    selectedTexture: string | null,
    selectedLayer: Layer | null,
}

const defaultProps: Props = {
    name: 'New map',
    width: 20,
    height: 20,
}

class TileMapComponent extends React.Component<Props, State> {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    mouseOnCanvas: boolean = false;

    exportComponentRef: any;

    private tools: Array<Tool> = [
        new HoverTool(),
    ];

    private selectedTool: Tool;

    /**
     * Tile size (in pixels) on canvas
     */
    private tileSize = 30;

    constructor(props: Props) {
        super(props);

        // default props
        props = { ...defaultProps, ...props };

        this.state = {
            map: new TileMap(props.name!, props.width!, props.height!),
            canvasStyle: {
                width: `${props.width! * this.tileSize}px`,
                height: `${props.height! * this.tileSize}px`,
            },
            selectedTile: null,
            selectedTexture: null,
            selectedLayer: null,
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

            event.preventDefault();

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
                        this.selectedTool.tileMouseMove(tile, event.buttons);
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
        this.selectedTool.setTexture(this.state.selectedTexture);
        this.selectedTool.setLayer(this.state.selectedLayer);
        this.selectedTool.onTileSelect = tile => this.onTileSelect(tile);
        this.selectedTool.onTileUpdate = tile => this.onTileUpdate(tile);
    }

    onTileSelect(tile: Tile): void {

        this.setState({ selectedTile: tile, })
    }

    onTileUpdate(tile: Tile): void {

        this.setState({ map: this.state.map });
        CanvasUtils.drawTile(this.ctx, tile, this.tileSize, this.state.selectedLayer);
    }

    onTextureSelect(texture: string): void {

        this.setState({ selectedTexture: texture, })
        this.selectedTool.setTexture(texture);
    }

    onLayerSelected(layer: Layer): void {

        this.setState({ selectedLayer: layer, });
        this.selectedTool.setLayer(layer);

        if (!this.ctx) return;

        for (let tile of this.state.map.tiles) {

            CanvasUtils.drawTile(this.ctx, tile, this.tileSize, layer);
        }
    }

    render() {
        return (
            <>
                <h2>{this.state.map.name} - {this.state.map.width}x{this.state.map.height}</h2>
                <hr />
                <div className='container'>
                    <div>
                        <ToolBoxComponent onToolSelected={tool => this.onToolSelected(tool)} />
                        <hr />
                        <TilesetComponent onTextureSelected={texture => this.onTextureSelect(texture)} />
                    </div>
                    <canvas id="map-canvas" style={this.state.canvasStyle}></canvas>
                    <div className='components-right'>
                        <LayersComponent onLayerSelected={layer => this.onLayerSelected(layer)} />
                        <hr />
                        <TileInfoComponent tile={this.state.selectedTile} />
                    </div>
                </div>
            </>
        );
    }
}

export default TileMapComponent;
