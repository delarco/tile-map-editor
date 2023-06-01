import "./LayersComponent.css"
import React from "react";

export enum Layer {
    WALL,
    FLOOR,
    CEILING,
}

interface Props {
    onLayerSelected: (layer: Layer) => void;
}

interface State {
    selectedLayer: Layer,
}

class LayersComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { selectedLayer: Layer.WALL, };
    }

    public componentDidMount(): void {
        
        this.props.onLayerSelected(this.state.selectedLayer);
    }

    private selectLayer(layer: Layer): void {

        this.setState({ selectedLayer: layer, })
        this.props.onLayerSelected(layer);
    }

    render() {
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
                            checked={this.state.selectedLayer == Layer.WALL}
                            onChange={() => this.selectLayer(Layer.WALL)} />
                    </li>
                    <li>
                        <label htmlFor='layer-floor'>Floor</label>
                        <input id="layer-floor"
                            type='radio'
                            name="layer"
                            checked={this.state.selectedLayer == Layer.FLOOR}
                            onChange={() => this.selectLayer(Layer.FLOOR)} />
                    </li>
                    <li>
                        <label htmlFor='layer-ceiling'>Ceiling</label>
                        <input id="layer-ceiling"
                            type='radio'
                            name="layer"
                            checked={this.state.selectedLayer == Layer.CEILING}
                            onChange={() => this.selectLayer(Layer.CEILING)} />
                    </li>
                </ul>
            </div>
        );
    }
}

export default LayersComponent;
