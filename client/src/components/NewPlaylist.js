import React, { useState } from 'react';
import SongInPlaylist from './SongInPlaylist';
import './NewPlaylist.css'

function NewPlaylist(props) {
    const songs = props.playlist;
    const [inputText, setInputText] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Click dat');

        if (inputText === '') {
            alert('Please name your playlist.');
            return;
        }

        // Clear everything (including the songs in playlist and playlists in the generator)
        setInputText('');

        props.onExport(inputText);
        alert('Playlist exported successfully!');
    }
    
    return (
        <div className="NewPlaylist">
            <form>
                <input 
                    className="PlaylistNameForm" 
                    type="text"
                    placeholder="Enter name of new playlist"
                    style={{fontStyle: "italic"}}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                >
                </input>
            </form>


            <div className="SongList">
                {songs.map((song) => (
                    <SongInPlaylist title={song.title} artist={song.artist} id={song.id} onDelete={props.onDelete}/>
                ))}
            </div>

            <button onClick={onSubmit} className="ExportToSpotify">EXPORT TO SPOTIFY</button>
        </div>
    );

}

export default NewPlaylist;
