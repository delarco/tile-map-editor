import { TileMap } from "../../models/TileMap.model";
import "./ExportComponent.css"
import React from "react";


interface Props {
    map: TileMap,
}

interface State {
    map: any,
    visible: boolean,
}

class ExportComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            map: ExportComponent.formatMap(props.map),
            visible: true,
        };
    }

    static getDerivedStateFromProps(props: Props, state: State) {



        if (props.map !== state.map) {

            return {
                map: ExportComponent.formatMap(props.map)
            };
        }

        return null;
    }

    private static formatMap(map: TileMap): any {

        return {
            name: map.name || 'New Map',
            size: {
                width: map.width,
                height: map.height,
            },
            skybox: map.skybox || "",
            spawnLocations: map.spawnLocations.length > 0 
                ? map.spawnLocations
                : [{ "x": 0, "y": 0, "a": 0 }],
            musicList: map.musicList,
            sprites: map.sprites,
            tiles: map.tiles.map(tile => {
                return {
                    index: {
                        x: tile.x,
                        y: tile.y,
                    },
                    minimapColor: [
                        tile.minimapColor.r,
                        tile.minimapColor.g,
                        tile.minimapColor.b,
                    ],
                    collision: tile.collision,
                    wall: tile.wall,
                    floor: tile.floor,
                    ceiling: tile.ceiling,
                }
            })
            
            
        }

    }

    render() {
        return (
            <>
                <button onClick={() => this.setState({ visible: !this.state.visible })}>Export</button>
                {
                    !this.state.visible
                        ? null
                        :
                        <div className="json-content">
                            <pre>
                                {JSON.stringify(this.state.map, null, 2)}
                            </pre>
                        </div>
                }

            </>
        );
    }
}

export default ExportComponent;
