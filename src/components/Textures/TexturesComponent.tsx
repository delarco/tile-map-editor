import "./TexturesComponent.css"
import { TextureContext, TextureContextType } from "../../context/TextureContext";
import { Texture } from "../../models/Texture.model";
import { useContext, useEffect, useState } from "react";
import { ToolContext, ToolContextType } from "../../context/ToolContext";
import { SetTextureTool } from "../../tools/SetTextureTool";

const textureFiles = [
    'blank.png',
    'ground-01.png',
    'grass-01.png',
    'grass-01-snow-01.png',
    'grass-01-snow-02.png',
    'north.png',
    'south.png',
    'east.png',
    'west.png',
];

const TexturesComponent = () => {

    const [textures, setTextures] = useState<Array<Texture>>([]);
    const { texture: selectedTexture, selectTexture } = useContext(TextureContext) as TextureContextType;
    const { selectTool } = useContext(ToolContext) as ToolContextType;

    const textureSelected = (texture: Texture) => {

        selectTool(SetTextureTool.instance);
        selectTexture(texture);
    };

    useEffect(() => {

        const textures = textureFiles.map(file => {
            const texture = new Texture(file);

            if(file.toLowerCase().indexOf('blank.png') >= 0)
                texture.collision = false;

            return texture;
        });

        setTextures(textures);
        selectTexture(textures[0]);
    }, []);

    return (
        <div className='textures-container'>
            <h3>Textures</h3>
            <hr />
            <div className="selected-texture">
                <div className="image">
                    {selectedTexture?.domElement}
                </div>
                <div className="info">
                    Size: {selectedTexture?.width}x{selectedTexture?.height}
                    <br />
                    {selectedTexture?.filename}
                </div>
            </div>
            <hr />
            <ul className="texture-list">
                {
                    textures.map((texture, index) => (
                        <li key={index}
                            className={texture == selectedTexture ? "texture selected" : "texture"}
                            onClick={() => textureSelected(texture)}>
                            {texture.domElement}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TexturesComponent;
