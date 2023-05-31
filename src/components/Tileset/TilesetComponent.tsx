import "./TilesetComponent.css"
import React from "react";

interface Props {

}

interface State {

}

class TilesetComponent extends React.Component<Props, State> {

    private textureFiles = [
        'ground-01.png',
        'grass-01.png',
        'grass-01-snow-01.png',
        'grass-01-snow-02.png',
        'north.png',
        'south.png',
        'east.png',
        'west.png',
    ];

    constructor(props: Props) {
        super(props);

        this.state = { };
    }

    render() {
        return (
            <div className='tileset-container'>
                <h3>Tileset</h3>
                <hr />
                <div className="texture-list">
                    {
                        this.textureFiles.map(file => (
                            <img className="texture" src={'assets/textures/' + file} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default TilesetComponent;
