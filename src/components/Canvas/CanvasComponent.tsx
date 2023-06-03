import "./CanvasComponent.css"
import { LayerContext, LayerContextType } from "../../context/LayerContext";
import { ToolContext, ToolContextType } from "../../context/ToolContext";
import React, { ForwardRefRenderFunction, forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { TileMap } from "../../models/TileMap.model";
import { Tile } from "../../models/Tile.model";
import { Position } from "../../models/Position.model";
import { Tool, ToolActionParams } from "../../tools/Tool";
import { HoverTool } from "../../tools/HoverTool";
import { CanvasUtils } from "../../utils/Canvas.utils";
import { TileContext } from "../../context/TileContext";
import { TileContextType } from "../../context/TileContext";
import { TextureContext, TextureContextType } from "../../context/TextureContext";

type CanvasUpdateProps = {
    map: TileMap,
    tileSize: number,
}

type CanvasUpdateHandler = {
    //doSomething: () => void,
}

const CanvasComponent: ForwardRefRenderFunction<CanvasUpdateHandler, CanvasUpdateProps> = (
    { map, tileSize },
    forwardedRef,
) => {

    const { layer } = useContext(LayerContext) as LayerContextType;
    const { tool } = useContext(ToolContext) as ToolContextType;
    const { selectTile } = useContext(TileContext) as TileContextType;
    const { texture } = useContext(TextureContext) as TextureContextType;

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [canvasStyle, setCanvasStyle] = useState<{ width: string, height: string }>();
    const [mouseOnCanvas, setMouseOnCanvas] = useState<boolean>(false);

    const [pluginTools] = useState<Array<Tool>>(
        [new HoverTool(),]
    );

    const setupCanvas = (): void => {

        const canvasElement = document.querySelector<HTMLCanvasElement>('#map-canvas');

        if (!canvasElement) {
            alert('canvas not found');
            return;
        }

        setCanvas(canvasElement);

        setCanvasStyle({
            width: `${map.width! * tileSize}px`,
            height: `${map.height! * tileSize}px`,
        });

        const ctx = canvasElement.getContext("2d");

        if (!ctx) {
            alert('context error');
            return;
        }

        setContext(ctx);

        canvasElement.width = map.width * tileSize;
        canvasElement.height = map.height * tileSize;

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.lineWidth = 1;
        ctx.imageSmoothingEnabled = false;
    };

    const bindEvents = (): void => {

        document.onclick = onDocumentMouseEvent;
        document.onmousedown = onDocumentMouseEvent;
        document.onmouseup = onDocumentMouseEvent;
        document.onmousemove = onDocumentMouseEvent;

        if (tool && !tool.onTileSelect) tool.onTileSelect = onTileSelected;
        if (tool && !tool.onTileUpdate) tool.onTileUpdate = onTileUpdate;
    };

    const checkCanvasArea = (x: number, y: number): boolean => {

        if (!canvas) return false;

        const rect = canvas.getBoundingClientRect();

        return x >= rect.left
            && x <= rect.right
            && y >= rect.top
            && y <= rect.bottom;
    };

    const getTileFromCanvasPosition = (x: number, y: number): Tile | null => {

        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        const cursorPos = new Position(x - rect.left, y - rect.top);
        const cursorTile = new Position(Math.floor(cursorPos.x / tileSize), Math.floor(cursorPos.y / tileSize));

        if (cursorTile.x >= 0
            && cursorTile.y >= 0
            && cursorTile.x < map.width
            && cursorTile.y < map.height) {

            const index = cursorTile.y * map.width + cursorTile.x;
            return map.tiles[index];
        }

        return null;
    }

    const onDocumentMouseEvent = (event: MouseEvent) => {

        if (checkCanvasArea(event.clientX, event.clientY)) {

            event.preventDefault();

            setMouseOnCanvas(true);

            const tile = getTileFromCanvasPosition(event.clientX, event.clientY);

            if (tile) {

                const actionParams: ToolActionParams = {
                    canvas: canvas,
                    context: context,
                    button: event.buttons,
                    layer: layer,
                    texture: texture,
                    tile: tile,
                    tileSize: tileSize
                };

                switch (event.type) {

                    case "click":
                        tool?.tileClick(actionParams);
                        for (let tool of pluginTools) tool.tileClick(actionParams);
                        break;

                    case "mousedown":
                        tool?.tileMouseDown(actionParams);
                        for (let tool of pluginTools) tool.tileMouseDown(actionParams);
                        break;

                    case "mouseup":
                        tool?.tileMouseUp(actionParams);
                        for (let tool of pluginTools) tool.tileMouseUp(actionParams);
                        break;

                    case "mousemove":
                        tool?.tileMouseMove(actionParams);
                        for (let tool of pluginTools) tool.tileMouseMove(actionParams);
                        break;
                }
            }
        }
        else {

            if (event.type == "mousemove") {

                if (mouseOnCanvas) {

                    setMouseOnCanvas(false);
                    tool?.canvasMouseLeave();
                    for (let tool of pluginTools) tool.canvasMouseLeave();
                }
            }
        }

    };

    const onTileSelected = (tile: Tile) => {

        selectTile(tile);
    };

    const onTileUpdate = (tile: Tile) => {

        if(!context) return;

        // this.setState({ map: this.state.map });
        CanvasUtils.drawTile(context, tile, tileSize, layer);
    };

    useImperativeHandle(forwardedRef, () => ({
        // clear() { },
        // pesquisa(terms: string) { }
    }));

    useEffect(() => {

        setupCanvas();

    }, []);

    bindEvents();

    if(context) CanvasUtils.drawGrid(context, tileSize, "#00F");

    return (
        <>
            <canvas id="map-canvas" style={canvasStyle}></canvas>
            {
                pluginTools.map((tool, index) =>
                    <React.Fragment key={index}>
                        {tool.domElement}
                    </React.Fragment>
                )
            }
        </>
    );
}

export default forwardRef(CanvasComponent);
