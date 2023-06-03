import './MapEditorComponent.css';
import { ElementRef, useEffect, useRef, useState } from "react";
import { LayerProvider } from "../../context/LayerContext";
import { ToolProvider } from "../../context/ToolContext";
import { TileMap } from "../../models/TileMap.model";
import { TileProvider } from '../../context/TileContext';
import ToolBoxComponent from "../ToolBox/ToolBoxComponent";
import LayersComponent from "../Layers/LayersComponent";
import TileInfoComponent from "../TileInfo/TileInfoComponent";
import CanvasEventHandlerComponent from '../Canvas/CanvasComponent';
import CanvasComponent from "../Canvas/CanvasComponent";
import ExportComponent from '../Export/ExportComponent';
import TexturesComponent from '../Textures/TexturesComponent';
import { TextureProvider } from '../../context/TextureContext';


const MapEditorComponent = () => {

    type CanvasHandle = ElementRef<typeof CanvasEventHandlerComponent>;
    const canvasRef = useRef<CanvasHandle>(null);

    const [map] = useState<TileMap>(new TileMap('New map', 10, 10));
    const [tileSize] = useState<number>(30);

    useEffect(() => {

    }, []);

    return (
        <TileProvider>
            <LayerProvider>
                <TextureProvider>
                    <ToolProvider>
                        <h2>{map.name} - {map.width}x{map.height}</h2>
                        <hr />
                        <div className='container'>
                            <div>
                                <ToolBoxComponent />
                                <hr />
                                <TexturesComponent />
                            </div>
                            <CanvasComponent ref={canvasRef} map={map} tileSize={tileSize} />
                            <div className='components-right'>
                                <LayersComponent />
                                <hr />
                                <TileInfoComponent />
                            </div>
                        </div>
                        <ExportComponent map={map} />
                    </ToolProvider>
                </TextureProvider>
            </LayerProvider>
        </TileProvider>
    );
}

export default MapEditorComponent;
