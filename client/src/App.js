import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';

function App() {
    const CLIENT_ID = "b1973aa897914a7a8b045880ef919a81"
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [playlists, setPlaylists] = useState([])

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

    const getPlaylists = async (e) => {
        e.preventDefault()
        const {data} = await axios
            .get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        setPlaylists(data.items)
    }

    const renderPlaylists = () => {
        return playlists.map(playlist => (
            <div key={playlist.id}>
                {playlist.images.length ? <img width={"100%"} src={playlist.images[0].url} alt=""/> : <div>No Image</div>}
                {playlist.name}
            </div>
        ))
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
                    <div>
                        <button onClick={getPlaylists}>get playlists</button>
                    </div>
                    : <h2>Please login</h2>
                }
                { renderPlaylists() }
            </div>
        </div>
    );
}

export default App;