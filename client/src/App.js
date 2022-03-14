import {useEffect, useState} from "react";
import axios from 'axios';

import Playlists from "./components/Playlists";
import PlaylistItems from "./components/PlaylistItems";
import Features from "./components/Features";
import Genres from "./components/Genres";
import './App.css';
import Console from "./components/Consoles";
import Accordion from "./components/Accordion";
import Parameters from "./components/Parameters";
import CurrentSong from "./components/CurrentSong";
import NewPlaylist from "./components/NewPlaylist";
import PlaylistsInGenerator from "./components/PlaylistsInGenerator";
import UserPlaylists from "./components/UserPlaylists";
import Recommendations from "./components/Recommendations";
import PreviewPlayer from "./components/PreviewPlayer";
//import getRecs from "./components/Recommendations";

function App() {
    // URLs and Sample Data
    const CLIENT_ID = "b1973aa897914a7a8b045880ef919a81"
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const playlistID = "1LNoeW9X4ArpKeNnl0gPWK";
    let songIDs = ["11dxtPJKR4E0wlSr0A0t47", "37ynsCQ2PUTc9hbWygrbKy", "25z6kpmIwkCUqk2IORrJ5v", "25z6kpmIwkCUqk2IORrJ5v"];
    const features = {
        "danceability": "0.5",
        "speechiness": "0.5",
        "acousticness": "0.5",
        "liveness": "0.5",
        "happiness": "0.5",
        "tempo": "110"
    };

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

        // Load user playlists if they're logged in        
        if (token) {
            loadUserPlaylists(token);
            console.log("Token: " + token);
        }    

    }, [])

    // Song recommendations
    const [recs, setRecs] = useState([]);
    useEffect(() => {console.log("Size: " + recs.length)})

    // More sample Data
    const [newPlaylists, setNewPlaylists] = useState([]);

    /*
    const [newPlaylists, setNewPlaylists] = useState([
        {
            name: "Song 1",
            artist: "Artist 1",
            id: 0
        },
        {
            name: "Song 2",
            artist: "Artist 2",
            id: 1
        },
        {
            name: "Song 1",
            artist: "Artist 1",
            id: 2
        },
        {
            name: "Song 2",
            artist: "Artist 2",
            id: 3
        },
        {
            name: "Song 1",
            artist: "Artist 1",
            id: 4
        },
        {
            name: "Song 2",
            artist: "Artist 2",
            id: 5
        },
        {
            name: "Song 1",
            artist: "Artist 1",
            id: 6
        },
        {
            name: "Song 2",
            artist: "Artist 2",
            id: 7
        },
        {
            name: "Song 1",
            artist: "Artist 1",
            id: 8
        },
        {
            name: "Song 2",
            artist: "Artist 2",
            id: 9
        },
        {
            name: "Song 1",
            artist: "Artist 1",
            id: 10
        },
        {
            name: "Song 2",
            artist: "Artist 2",
            id: 11
        }
    ]); */

    const [listOfPlaylists, setListOfPlaylists] = useState ([]);

    const [userPlaylists, setUserPlaylists] = useState([]);
    /*
    const [userPlaylists, setUserPlaylists] = useState([
        {
            name: "Playlist 1",
            miscData: "delete this later and replace w/ actual data",
            id: 0
        },
        {
            name: "Playlist 2",
            miscData: "delete this later and replace w/ actual data",
            id: 1
        },
        {
            name: "Playlist 3",
            miscData: "delete this later and replace w/ actual data",
            id: 2
        },
        {
            name: "Playlist 4",
            miscData: "delete this later and replace w/ actual data",
            id: 3
        },
        {
            name: "Playlist 5",
            miscData: "delete this later and replace w/ actual data",
            id: 4
        },
        {
            name: "Playlist 6",
            miscData: "delete this later and replace w/ actual data",
            id: 5
        },
        {
            name: "Playlist 1",
            miscData: "delete this later and replace w/ actual data",
            id: 6
        },
        {
            name: "Playlist 2",
            miscData: "delete this later and replace w/ actual data",
            id: 7
        },
        {
            name: "Playlist 3",
            miscData: "delete this later and replace w/ actual data",
            id: 8
        },
        {
            name: "Playlist 4",
            miscData: "delete this later and replace w/ actual data",
            id: 9
        },
        {
            name: "Playlist 5",
            miscData: "delete this later and replace w/ actual data",
            id: 10
        },
        {
            name: "Playlist 6",
            miscData: "delete this later and replace w/ actual data",
            id: 11
        }
    ]);
    */

    const [parameters, setParameters] = useState([
        {
            name: "Danceability",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },        
        {
            name: "Speechiness",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Acousticness",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Liveness",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },        
        {
            name: "Happiness",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        },
        {
            name: "Tempo",
            data: 0,
            chart: <h1>Chart go brrr</h1>
        }
    ]);

    /*
    const [currentSong, setCurrentSong] = useState(
        {
            name: "The World Is Yours",
            artist: "Nas",
            album: "Illmatic",
            genre: "Hip-Hop/Rap",
            year: "1994"
        }
    ); */

    const [currentSong, setCurrentSong] = useState();
    const [playerLink, setPlayerLink] = useState("https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=2c4a5f07d56842c6");

    //==========================================================================
    //==========================================================================
    // Actual functionality here! Lmk if there's a better way to organize this
    


    const login = (e) => {
        e.preventDefault();
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
    }

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        window.location.reload();
    }

    // Loads user's playlists from the Spotify API
    const loadUserPlaylists = async (token) => {
        if (!token) {
            return [];
        }

        console.log("Loading playlists!");
        const {data} = await axios
            .get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });    

        setUserPlaylists(data.items);
    }

    // Get IDs of tracks in playlist
    const getSongsFromPlaylist = async (token, playlistID) => {
        let playlistSongs = [];
        const getRequest = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?fields=items(track(id%2C%20name))";

        const {data} = await axios
            .get(getRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        let items = data.items;
        items.forEach((item) => {playlistSongs.push(item.track.id)});
        return playlistSongs;
    }

    // Generate recommendations based on current parameters
    const generateRecommendations = async () => {
        console.log("Generating recommendations!");
        // Extract songs IDs from each song in each playlist
        let sampleSongIDs = [];
        for (let i = 0; i < listOfPlaylists.length; i++) {
            console.log("Playlist ID: " + listOfPlaylists[i].id);
            const tempIDs = await getSongsFromPlaylist(token, listOfPlaylists[i].id); 
            sampleSongIDs = sampleSongIDs.concat(tempIDs);
        }
        songIDs = sampleSongIDs;

        // Print test: sampleSongIDs.forEach((sampleSongID) => {console.log("CurrSongID: " + sampleSongID)});
        

        let currRecs = [];
        const totalRecLimit = 20;
        const limitPerRequest = Math.ceil(50 / Math.ceil(songIDs.length/3));

        const getRequest = (currentSongIDs, artistID, genre) => {
            let getReq = "https://api.spotify.com/v1/recommendations?"
                + "limit=" + limitPerRequest 
                + "&seed_artists=" + artistID
                + "&seed_genres=" + genre
                + "&seed_tracks=";
            currentSongIDs.forEach((songID) => {
                getReq += songID + "%2C";
            });
            getReq = getReq.slice(0, -3);
            getReq = getReq 
                + "&target_acousticness=" + features.acousticness
                + "&target_danceability=" + features.danceability 
                + "&target_liveness=" + features.liveness
                + "&target_speechiness=" + features.speechiness
                + "&target_tempo=" + features.tempo
                + "&target_valence=" + features.happiness;
            
            return getReq;
        };

        let tempRecs = []
        // loops through 3 songs at a time 
        for (let i = 0; i < songIDs.length; i+=3) {
            // use three songs per recommendation
            const currentSongIDs = songIDs.slice(i, i + 3);

            // get the the track data as tracksData
            //e.persist()
            const {data: tracksData} = await axios
            .get("https://api.spotify.com/v1/tracks?ids=" + songIDs[i], {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });
            // the first artist of the first song in currentSongIDs
            const artist = tracksData.tracks[0].artists[0];
            
            // get the artists data as artistsData
            const {data: artistsData} = await axios
                .get("https://api.spotify.com/v1/artists?ids=" + artist.id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            // the first genre of artist
            const genre = artistsData.artists[0].genres[0];

            // get recommended songs
            const {data} = await axios
                .get(getRequest(currentSongIDs, artist.id, genre), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            
            // add songs from request to array
            tempRecs = tempRecs.concat(data.tracks);
        }

        // remove any duplicate songs
        // https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
        let uniqueRecs = tempRecs.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === tempRecs.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
        });

        // limits length of array to totalRecLimit
        if (uniqueRecs.length > totalRecLimit) {
            uniqueRecs = uniqueRecs.slice(0, totalRecLimit);
        }
          
        currRecs = uniqueRecs;
        console.log("I work! Length: " + currRecs.length);
        setRecs(currRecs);
        setCurrentSong(
            {
                index: 0,
                song: currRecs[0],
                name: currRecs[0].name,
                artist: currRecs[0].artists[0].name,
                album: currRecs[0].album.name,
                year: currRecs[0].album.release_date.substring(0, 4),
                image: currRecs[0].album.images[0].url,
                link: "https://open.spotify.com/track/" + currRecs[0].id
            }
        );
        setPlayerLink("https://open.spotify.com/track/" + currRecs[0].id);    
    }

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
        setUserPlaylists(userPlaylists.filter((userPlaylist) => userPlaylist.id !== id));
    }

    const deletePlaylist = (id) => {
        // Put code here to actually remove the song

        // Send playlist back to left panel
        const newList = listOfPlaylists.filter((listOfPlaylist) => listOfPlaylist.id === id);
        setUserPlaylists([...userPlaylists, newList[0]]);

        // Remove Playlist from UI
        setListOfPlaylists(listOfPlaylists.filter((listOfPlaylist) => listOfPlaylist.id != id));
    }

    // Adds current song to playlist
    const addSong = () => {
        // Add song to new playlist
        setNewPlaylists([...newPlaylists,
            {
                song: currentSong.song,
                name: currentSong.name,
                artist: currentSong.artist,
                id: currentSong.song.id
            }
        ]);

        // Going to next song
        const currIndex = currentSong.index + 1;
        setPlayerLink("https://open.spotify.com/track/" + recs[currIndex].id);
        setCurrentSong(
            {
                index: currIndex,
                song: recs[currIndex],
                name: recs[currIndex].name,
                artist: recs[currIndex].artists[0].name,
                album: recs[currIndex].album.name,
                year: recs[currIndex].album.release_date.substring(0, 4),
                image: recs[currIndex].album.images[0].url
            }
        ); 
    }

    // Skips current song, does NOT add song to playlist
    const skipSong = () => {
        // Going to next song
        const currIndex = currentSong.index + 1;
        setPlayerLink("https://open.spotify.com/track/" + recs[currIndex].id);
        setCurrentSong(
            {
                index: currIndex,
                song: recs[currIndex],
                name: recs[currIndex].name,
                artist: recs[currIndex].artists[0].name,
                album: recs[currIndex].album.name,
                year: recs[currIndex].album.release_date.substring(0, 4),
                image: recs[currIndex].album.images[0].url
            }
        ); 
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

                {!token ?
                <button onClick={login}>LOGIN WITH SPOTIFY</button>
                : <button onClick={logout}>LOGOUT</button>
                }

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
                                content={!token ? 
                                    <div style={{margin: "0px 10px 0px 10px"}}><i>Please log in to view your playlists.</i></div>: 
                                    <UserPlaylists playlists={userPlaylists} onAdd={addPlaylist}/>
                                }    
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
                    <PreviewPlayer playerLink={playerLink}/>
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
                            onGenerate={generateRecommendations}
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
    */
}

export default App;