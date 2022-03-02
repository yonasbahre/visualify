import {useEffect, useState} from "react";
import Playlists from "./components/Playlists"
import './App.css';

function App() {
    const CLIENT_ID = "b1973aa897914a7a8b045880ef919a81"
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [playlistsItems, setPlaylistsItems] = useState([])

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

    const getPlaylistsItems = async (e) => {
        e.preventDefault()
        const {data} = await axios
            .get("https://api.spotify.com/v1/playlists/1LNoeW9X4ArpKeNnl0gPWK/tracks", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(data);

        setPlaylistsItems(data.items)
    }

    return (
        <div id="App">
            <div id="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>
                }
                {token ?
                    <Playlists token={token} />
                    // { getPlaylistsItems() }
                    : <h2>Please login</h2>
                }
            </div>
        </div>
    );
}

export default App;