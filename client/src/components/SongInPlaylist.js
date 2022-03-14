import React from "react";
import { FaTrashAlt } from 'react-icons/fa';
import './NewPlaylist.css'


function SongInPlaylist(props) {
    return (
        <div className="SongInPlaylist">
            <div className="SongTitle">
                <div>{props.name}</div>
                <div><FaTrashAlt onClick={() => props.onDelete(props.id)} style={{cursor: "pointer"}}/></div>
            </div>

            <i>{props.artist}</i>            
        </div>
    );
}

export default SongInPlaylist;