import {useEffect, useState} from "react";
import Playlists from "./components/Playlists"


import './App.css';
import Console from "./components/Consoles";
import Accordion from "./components/Accordion";
import Parameters from "./components/Parameters";
import CurrentSong from "./components/CurrentSong";
import NewPlaylist from "./components/NewPlaylist";
import PlaylistsInGenerator from "./components/PlaylistsInGenerator";
import UserPlaylists from "./components/UserPlaylists";

function App() {
    // Isabel's stuff
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


    // Sample Data
    const [newPlaylists, setNewPlaylists] = useState([
        {
            title: "Song 1",
            artist: "Artist 1",
            id: 0
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            id: 1
        },
        {
            title: "Song 1",
            artist: "Artist 1",
            id: 2
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            id: 3
        },
        {
            title: "Song 1",
            artist: "Artist 1",
            id: 4
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            id: 5
        },
        {
            title: "Song 1",
            artist: "Artist 1",
            id: 6
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            id: 7
        },
        {
            title: "Song 1",
            artist: "Artist 1",
            id: 8
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            id: 9
        },
        {
            title: "Song 1",
            artist: "Artist 1",
            id: 10
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            id: 11
        }
    ]);

    const [listOfPlaylists, setListOfPlaylists] = useState ([]);

    const [userPlaylists, SetUserPlaylists] = useState([
        {
            title: "Playlist 1",
            miscData: "delete this later and replace w/ actual data",
            id: 0
        },
        {
            title: "Playlist 2",
            miscData: "delete this later and replace w/ actual data",
            id: 1
        },
        {
            title: "Playlist 3",
            miscData: "delete this later and replace w/ actual data",
            id: 2
        },
        {
            title: "Playlist 4",
            miscData: "delete this later and replace w/ actual data",
            id: 3
        },
        {
            title: "Playlist 5",
            miscData: "delete this later and replace w/ actual data",
            id: 4
        },
        {
            title: "Playlist 6",
            miscData: "delete this later and replace w/ actual data",
            id: 5
        },
        {
            title: "Playlist 1",
            miscData: "delete this later and replace w/ actual data",
            id: 6
        },
        {
            title: "Playlist 2",
            miscData: "delete this later and replace w/ actual data",
            id: 7
        },
        {
            title: "Playlist 3",
            miscData: "delete this later and replace w/ actual data",
            id: 8
        },
        {
            title: "Playlist 4",
            miscData: "delete this later and replace w/ actual data",
            id: 9
        },
        {
            title: "Playlist 5",
            miscData: "delete this later and replace w/ actual data",
            id: 10
        },
        {
            title: "Playlist 6",
            miscData: "delete this later and replace w/ actual data",
            id: 11
        }
    ]);

    const [parameters, SetParameters] = useState([
        {
            name: "Parameter 1",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },        
        {
            name: "Parameter 2",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 3",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 1",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },        
        {
            name: "Parameter 2",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 3",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 1",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },        
        {
            name: "Parameter 2",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 3",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 1",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },        
        {
            name: "Parameter 2",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Parameter 3",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        }
    ]);

    const [currentSong, SetCurrentSong] = useState(
        {
            title: "The World Is Yours",
            artist: "Nas",
            album: "Illmatic",
            genre: "Hip-Hop/Rap",
            year: "1994"
        }
    );

    //==========================================================================
    //==========================================================================
    // Actual functionality here! Lmk if there's a better way to organize this

    const deleteSong = (id) => {
        // Put code here to actually remove song from wherever you're storing the playlist

        // Remove song from UI
        setNewPlaylists(newPlaylists.filter((newPlaylist) => newPlaylist.id !== id));
    }
    
    const addPlaylist = (id) => {
        // Put code here to actually add the playlist data to the app

        // Add playlist to right panel
        const newList = userPlaylists.filter((userPlaylist) => userPlaylist.id === id); 
        setListOfPlaylists([...listOfPlaylists, newList[0]]);

        // Remove Playlist from left panel
        SetUserPlaylists(userPlaylists.filter((userPlaylist) => userPlaylist.id !== id));
    }

    const deletePlaylist = (id) => {
        // Put code here to actually remove the song

        // Send playlist back to left panel
        const newList = listOfPlaylists.filter((listOfPlaylist) => listOfPlaylist.id === id);
        SetUserPlaylists([...userPlaylists, newList[0]]);

        // Remove Playlist from UI
        setListOfPlaylists(listOfPlaylists.filter((listOfPlaylist) => listOfPlaylist.id != id));
    }

    // Adds current song to playlist
    const addSong = () => {

    }

    // Skips current song, does NOT add song to playlist
    const skipSong = () => {

    }

    // Exports playlist to Spotify
    const exportPlaylist = (name) => {
        console.log("Exported playlist " + name + "!");
    }


    // Basic structure of page
    return (
        <div className="App">

            <div className="App-header">
                <h1>Visualify</h1>
                <button>
                    LOGIN WITH SPOTIFY
                </button>
            </div>

            <div className="App-Main">
                {/*Left console*/}
                <Console 
                    height="600px"
                    overflowX="hidden"
                    overflowY="scroll"
                    content = {
                        <div>
                            <Accordion
                                label="Add Playlists to Generator" 
                                content={<UserPlaylists playlists={userPlaylists} onAdd={addPlaylist}/>}
                            />

                            <Parameters parameters={parameters} />
                        </div>
                    } 
                />

                <div className="centerConsole">
                    <CurrentSong 
                        currentSong={currentSong}
                        addSong={addSong}
                        skipSong={skipSong}
                    />
                </div>

                <div className="rightConsole">
                    <Console 
                        height="350px"
                        content={<NewPlaylist 
                            playlist={newPlaylists} 
                            onDelete={deleteSong}
                            onExport={exportPlaylist}
                        />} 
                    />

                    <Console 
                        height="250px" 
                        content={<PlaylistsInGenerator 
                            playlists={listOfPlaylists}
                            onDelete={deletePlaylist}
                        />} 
                    />
                </div>
            </div>




        </div>
    );



    /* Commenting out the button so I can add basic UI elements
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
                    : <h2>Please login</h2>
                }
            </div>
        </div>
    );
    */
}

export default App;