import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import "./CurrentSong.css";

function CurrentSong(props) {
    const song = props.currentSong;

    return(

        <div className="CurrentSongParent">

            {!song ? 
                <div className="CurrentSongEmpty"><i>Add playlists and generate to see recommended songs!</i></div>: 
                <div className="CurrentSong">
                    <div className="Cover">
                    <img 
                        // Placeholder image
                        src={song.image}
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
                            <h1>{song.name}</h1>
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
                        
                    </div>

                </div>

            }



        </div>
    );
}

export default CurrentSong;