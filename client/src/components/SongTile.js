import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import "./SongTile.css";

function SongTile(props) {
    const onAdd = () => {
        props.add(props.index);
    }

    const onSkip = () => {
        props.skip(props.index);
    }

    const setPreview = () => {
        props.setPreview(props.song.index);
        console.log("uh oh" + props.song.index);
    }

    return(
        <div className="SongTile">
            {!props.song ? 
                <div><i>Add playlists and generate to see recommended songs!</i></div>: 
                <div className="SongTileInner">

                    <div className="SongInfo">
                        <img src={props.song.image}></img>

                        <div className="InfoBackdrop" onClick={setPreview}>
                            <div style={{marginLeft: "5px"}}><b>{props.song.name}</b></div>
                            <div style={{marginLeft: "5px"}}><i>{props.song.artist}</i></div>
                        </div>
                    </div>

                    <div className="TileButtons">
                        <div className="AddSong">
                            <button onClick={onAdd}><FaThumbsUp opacity={0.75}/></button>
                        </div>

                        <div className="SkipSong">
                            <button onClick={onSkip}><FaThumbsDown opacity={0.75}/></button>
                        </div>
                    </div>

                </div>
            }

        </div>


    );
}

export default SongTile;