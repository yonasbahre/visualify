import React, { useState } from "react";
import './PlaylistsInGenerator.css';
import SinglePlaylist from "./SinglePlaylist";

function PlaylistsInGenerator(props) {
    const playlists = props.playlists;

    const isGeneratorEmpty = () => {
        if (playlists.length === 0) {
            alert("Please add at least one playlist to the generator!");
            return;
        }

        props.onGenerate();
    }
    
    return (
        <div className="PlaylistsInGenerator">
            <i>Playlists Currently in Generator:</i>

            <div className="Playlists">
                {playlists.map((playlist) => (
                    <SinglePlaylist key={playlist.id} name={playlist.name} id={playlist.id} onDelete={props.onDelete}/>
                ))}
            </div>

            <button onClick={isGeneratorEmpty} className="Generate">GENERATE!</button>
        </div>
    );
}

export default PlaylistsInGenerator;