import {useEffect, useState} from "react";
import './App.css';

import Features from "./components/Features";
import Genres from "./components/Genres";
import PlaylistItems from "./components/PlaylistItems";
import Playlists from "./components/Playlists";
import Recommendations from "./components/Recommendations";

function App() {
    const CLIENT_ID = "b1973aa897914a7a8b045880ef919a81"
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const playlistID = "1LNoeW9X4ArpKeNnl0gPWK";
    const songIDs = ["11dxtPJKR4E0wlSr0A0t47", "37ynsCQ2PUTc9hbWygrbKy", "25z6kpmIwkCUqk2IORrJ5v", "25z6kpmIwkCUqk2IORrJ5v"];
    const features = {
        "danceability": "0.5",
        "speechiness": "0.5",
        "acousticness": "0.5",
        "liveness": "0.5",
        "happiness": "0.5",
        "tempo": "110"
    };

    return (
        <div id="App">
            <div id="App-header">
                <h1>Spotify React</h1>
            </div>
            {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                    Login to Spotify</a>
                : <button onClick={logout}>Logout</button>
             }
            {token ?
                <div>
                    <Genres token={token} songIDs={songIDs} />
                    <Features token={token} songIDs={songIDs} />
                    <Recommendations token={token} features={features} songIDs={songIDs} />
                    <PlaylistItems token={token} playlistID={playlistID} />
                    <Playlists token={token} />
                </div>
                : <h2>Please login</h2>
            }
        </div>
    );
}

export default App;