import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import "./CurrentSong.css";

function CurrentSong(props) {
    const song = props.currentSong;

    return(
        <div className="CurrentSong">
            <div className="Cover">
                <img 
                    // Placeholder image
                    src="https://m.media-amazon.com/images/I/81oJg8R1C4L._SL1500_.jpg"
                    sizes="500"
                >
                </img>
            </div>

            <div className="AddSong">
                <button onClick={props.addSong}><FaThumbsUp opacity={0.75}/></button>
            </div>

            <div className="SkipSong">
                <button onClick={props.skipSong}><FaThumbsDown opacity={0.75}/></button>
            </div>

            <div className="SongInfo">
                <div style={{textAlign: "center", marginBottom: "-20px"}}>
                    <h1>{song.title}</h1>
                </div>

                <div style={{fontSize: "x-large", textAlign: "center"}}> 
                    <i>{song.artist}</i>
                </div>

                <div style={{marginLeft: "5px", marginRight: "5px"}}>
                    <i>Album: </i>{song.album}
                </div>

                <div style={{marginLeft: "5px", marginRight: "5px"}}>
                    <i>Released: </i>{song.year}
                </div>

                <div style={{marginLeft: "5px", marginRight: "5px"}}>
                    <i>Genre: </i>{song.genre}
                </div>
                
            </div>
        </div>
    );
}

export default CurrentSong;