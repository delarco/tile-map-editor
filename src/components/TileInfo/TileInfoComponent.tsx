import './TileInfoComponent.css';
import { useContext } from "react";
import { TileContext, TileContextType } from '../../context/TileContext';
import { Tile } from '../../models/Tile.model';

const TileInfoComponent = () => {

    const { tile } = useContext(TileContext) as TileContextType;

    const toggleCollision = (tile: Tile) => {

        // TODO: event
        tile.collision = !tile.collision;
    };

    return (
        <div className='tile-info-container'>
            <h3>Selected Tile</h3>
            <hr />
            {
                !tile
                    ? <span className='no-selection'>
                        No tile selected
                    </span>
                    : <div>
                        <table className='tile-properties'>
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>x</td>
                                    <td>{tile.x}</td>
                                </tr>
                                <tr>
                                    <td>y</td>
                                    <td>{tile.y}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor='collision'>Collision</label>
                                    </td>
                                    <td>
                                        <input type='checkbox'
                                            id='collision'
                                            checked={tile.collision}
                                            onChange={() => toggleCollision(tile)}
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wall - North</td>
                                    <td>
                                        <div className='texture-wrapper'>{tile.wall.north?.domElement}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wall - South</td>
                                    <td>
                                        <div className='texture-wrapper'>{tile.wall.south?.domElement}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wall - East</td>
                                    <td>
                                        <div className='texture-wrapper'>{tile.wall.east?.domElement}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wall - West</td>
                                    <td>
                                        <div className='texture-wrapper'>{tile.wall.west?.domElement}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Floor</td>
                                    <td>
                                        <div className='texture-wrapper'>{tile.floor?.domElement}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ceiling</td>
                                    <td>
                                        <div className='texture-wrapper'>{tile.ceiling?.domElement}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default TileInfoComponent;
