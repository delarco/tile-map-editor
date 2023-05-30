import './TileComponent.css';
import React from "react";
import { Tile } from '../../models/Tile.model';

interface Props {
    tile: Tile | null,
}

interface State {
    tile: Tile | null,
}

class TileComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tile: props.tile,
        };
    }

    static getDerivedStateFromProps(props: Props, state: State) {

        if (props.tile !== state.tile) {
            return {
                tile: props.tile
            };
        }

        return null;
    }

    onCollisionToggle() {

        if (!this.props.tile || !this.state.tile) return;
        this.props.tile.collision = !this.props.tile.collision;
        this.setState({tile: this.props.tile});
    }

    render() {
        return (
            <div className='tile-info-container'>
                <h3>Selected Tile</h3>
                <hr />
                {
                    !this.state.tile
                        ? <span className='no-selection'>
                            No tile selected
                        </span>
                        : <div>
                            <ul>
                                <li>
                                    x: {this.state.tile.x} &nbsp; y: {this.state.tile.y}
                                </li>
                                <li>

                                    <label htmlFor='collision'>Collision</label>
                                    <input type='checkbox'
                                        id='collision'
                                        checked={this.state.tile.collision}
                                        onChange={() => this.onCollisionToggle()} />

                                </li>
                            </ul>
                        </div>
                }
            </div>
        );
    }
}

export default TileComponent;
