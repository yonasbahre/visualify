import {useEffect, useState} from "react";
import Playlists from "./components/Playlists";
import PlaylistsItems from "./components/PlaylistsItems";
import Features from "./components/Features";
import './App.css';

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

    const playlistIDs = ["1LNoeW9X4ArpKeNnl0gPWK"];
    const songIDs = ["7ouMYWpwJ422jRcDASZB7P", "2C4VqPOruhp5EdPBeR92t6lQ", "2C2takcwOaAZWiXQijPHIx7B"];

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
                    <Features token={token} songIDs={songIDs} />
                    <PlaylistsItems token={token} playlistIDs={playlistIDs} />
                    <Playlists token={token} />
                </div>
                : <h2>Please login</h2>
            }
        </div>
    );
}

export default App;