import React, { useState } from "react";
import "./PlaylistsInGenerator.css"
import { FaTrashAlt } from 'react-icons/fa';

function SinglePlaylist(props) {
    return (
        <div className="SinglePlaylist">
            <div>{props.name}</div>
            <div>
                <FaTrashAlt 
                    style={{cursor: "pointer"}}
                    onClick={() => props.onDelete(props.id)}
                />
            </div>
        </div>
    );

}

export default SinglePlaylist;