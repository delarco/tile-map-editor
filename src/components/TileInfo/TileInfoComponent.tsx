import './TileInfoComponent.css';
import { useContext } from "react";
import { TileContext, TileContextType } from '../../context/TileContext';

const TileInfoComponent = () => {

    const { tile } = useContext(TileContext) as TileContextType;

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
                        <ul className='tile-properties'>
                            <li>
                                x: {tile.x} &nbsp; y: {tile.y}
                            </li>
                            <li>
                                <label htmlFor='collision'>Collision</label>
                                <input type='checkbox'
                                    id='collision'
                                    readOnly={true}
                                    checked={tile.collision}
                                    // onChange={() => toggleCollision()}
                                    />
                            </li>
                            <li>Wall: {tile.wall}</li>
                            <li>Floor: {tile.floor}</li>
                            <li>Ceiling: {tile.ceiling}</li>
                        </ul>
                    </div>
            }
        </div>
    );
};

export default TileInfoComponent;
