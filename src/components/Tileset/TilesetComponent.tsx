import "./TilesetComponent.css"
import React from "react";

interface Props {
    onTextureSelected: (texture: string) => void;
}

interface State {
    selectedTexture: string | null,
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

        this.state = {
            selectedTexture: null,
        };
    }

    private selectTexture(texture: string): void {

        this.setState({ selectedTexture: texture, })
        this.props.onTextureSelected(texture);
    }

    render() {
        return (
            <div className='tileset-container'>
                <h3>
                    Tileset
                    <div className="selected-texture-info"
                        style={{ visibility: this.state.selectedTexture ? 'visible' : "hidden" }}>
                        <img src={'assets/textures/' + this.state.selectedTexture} />
                        <span>32x32</span>
                    </div>
                </h3>
                <hr />
                <div className="texture-list">
                    {
                        this.textureFiles.map((file, index) => (
                            <img key={index}
                                className={this.state.selectedTexture == file ? 'texture selected' : 'texture'}
                                src={'assets/textures/' + file}
                                onClick={() => this.selectTexture(file)} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default TilesetComponent;
