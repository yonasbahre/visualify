import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import './UserPlaylists.css';

function AddSinglePlaylist(props) {
    return (
        <div className="AddSinglePlaylist">
            <div>{props.title}</div>
            <div><FaPlus onClick={() => props.onAdd(props.id)} style={{cursor: "pointer"}}/></div>            
        </div>
    );
}

export default AddSinglePlaylist;