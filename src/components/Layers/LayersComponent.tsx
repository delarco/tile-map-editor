import { LayerContext, LayerContextType } from "../../context/LayerContext";
import "./LayersComponent.css"
import React, { ForwardRefRenderFunction, forwardRef, useEffect } from "react";

export enum Layer {
    WALL,
    FLOOR,
    CEILING,
    MINIMAP,
}

type LayersProps = {
    onLayerChange: (layer: Layer) => void;
}

type LayersHandler = {

}

const LayersComponent: ForwardRefRenderFunction<LayersHandler, LayersProps> = (
    { onLayerChange },
    forwardedRef
) => {

    const { layer: selectedLayer, selectLayer } = React.useContext(LayerContext) as LayerContextType;

    const changeLayer = (layer: Layer) => {

        selectLayer(layer);
        onLayerChange(layer);
    };

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
                            onChange={() => changeLayer(Layer.WALL)} />
                    </li>
                    <li>
                        <label htmlFor='layer-floor'>Floor</label>
                        <input id="layer-floor"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.FLOOR}
                            onChange={() => changeLayer(Layer.FLOOR)} />
                    </li>
                    <li>
                        <label htmlFor='layer-ceiling'>Ceiling</label>
                        <input id="layer-ceiling"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.CEILING}
                            onChange={() => changeLayer(Layer.CEILING)} />
                    </li>
                    <li>
                        <label htmlFor='layer-minimap'>Minimap</label>
                        <input id="layer-minimap"
                            type='radio'
                            name="layer"
                            checked={selectedLayer == Layer.MINIMAP}
                            onChange={() => changeLayer(Layer.MINIMAP)} />
                    </li>
                </ul>
            </div>
        );
}

export default forwardRef(LayersComponent);
