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
                    <SinglePlaylist name={playlist.name} id={playlist.id} onDelete={props.onDelete}/>
                ))}
            </div>

            <button onClick={props.onGenerate} className="Generate">GENERATE!</button>
        </div>
    );
}

export default PlaylistsInGenerator;