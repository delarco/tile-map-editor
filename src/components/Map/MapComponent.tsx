import React from "react";
import { TileMap } from "../../models/TileMap";
import './MapComponent.css';

interface Props { }

interface State {
    map: TileMap
}

class MapComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            map: new TileMap(),
        };
    }

    render() {
        return (
            <>
                <canvas id="map-canvas"></canvas>
            </>
        );
    }
}

export default MapComponent;
