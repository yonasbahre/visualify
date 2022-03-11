import React, { useState } from "react";
import './PlaylistsInGenerator.css';
import SinglePlaylist from "./SinglePlaylist";

function PlaylistsInGenerator(props) {
    const playlists = props.playlists;
    
    return (
        <div className="PlaylistsInGenerator">
            <i>Playlists Currently in Generator:</i>

            <div className="Playlists">
                {playlists.map((playlist) => (
                    <SinglePlaylist title={playlist.title} id={playlist.id} onDelete={props.onDelete}/>
                ))}
            </div>
        </div>
    );
}

export default PlaylistsInGenerator;