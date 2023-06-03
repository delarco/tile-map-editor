import { LayerContext, LayerContextType } from "../../context/LayerContext";
import "./LayersComponent.css"
import React, { useEffect } from "react";

export enum Layer {
    WALL,
    FLOOR,
    CEILING,
    MINIMAP,
}

const LayersComponent = () => {

    const { layer: selectedLayer, selectLayer } = React.useContext(LayerContext) as LayerContextType;

    useEffect(() => {

        selectLayer(Layer.WALL);
    }, []);

        return (
            <div className='layers-container' >
                <h3>Layers</h3>
                <hr />
                <ul className="layer-list">
                    <li>
                        <label htmlFor='layer-wall'>Wall</label>
                        <input id="layer-wall"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.WALL}
                            onChange={() => selectLayer(Layer.WALL)} />
                    </li>
                    <li>
                        <label htmlFor='layer-floor'>Floor</label>
                        <input id="layer-floor"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.FLOOR}
                            onChange={() => selectLayer(Layer.FLOOR)} />
                    </li>
                    <li>
                        <label htmlFor='layer-ceiling'>Ceiling</label>
                        <input id="layer-ceiling"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.CEILING}
                            onChange={() => selectLayer(Layer.CEILING)} />
                    </li>
                    <li>
                        <label htmlFor='layer-minimap'>Minimap</label>
                        <input id="layer-minimap"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.MINIMAP}
                            onChange={() => selectLayer(Layer.MINIMAP)} />
                    </li>
                </ul>
            </div>
        );
}

export default LayersComponent;
