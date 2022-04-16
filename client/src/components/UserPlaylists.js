import React, { useState } from "react";
import AddSinglePlaylist from "./AddSinglePlaylist";
import './UserPlaylists.css';

function UserPlaylists(props) {
    const playlists = props.playlists;

    return (
        <div className="UserPlaylists">
            {playlists.map((playlist) => (
                <AddSinglePlaylist key={playlist.id} name={playlist.name} id={playlist.id} onAdd={props.onAdd}/>
            ))}
        </div>
    );
}

export default UserPlaylists;