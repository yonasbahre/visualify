import {useEffect, useState} from "react";
import axios from 'axios';

import './App.css';
import Console from "./components/Consoles";
import Accordion from "./components/Accordion";
import Parameters from "./components/Parameters";
import CurrentSong from "./components/CurrentSong";
import NewPlaylist from "./components/NewPlaylist";
import PlaylistsInGenerator from "./components/PlaylistsInGenerator";
import UserPlaylists from "./components/UserPlaylists";
import PieChart from "./components/PieChart";
import Recommendations from "./components/Recommendations";
import PreviewPlayer from "./components/PreviewPlayer";

function App() {
    // URLs and Sample Data
    const CLIENT_ID = "b1973aa897914a7a8b045880ef919a81"
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    let songIDs = [];

    // Percentages for each decade in pie chart
    const [proportions, setProportions] = useState([]);
    useEffect(() => {}, [proportions]);

    const [songYears, setSongYears] = useState([]);
    // Updates pie chart when songs are added to new playlist
    useEffect(() => {
        // Get the decade each song is from
        let tempYears = [];
        let numSongs = songYears.length;
        songYears.forEach(year => {
            tempYears.push(year.substring(0, 3) + "0");
        });
        console.log(tempYears);

        // Get number of times each decade occurs
        let newProportions = [];
        tempYears.forEach(year => {
            let found = newProportions.find(decade => decade.label === year);

            if (found === undefined) {
                newProportions.push({"label": year, "proportion": 1});
            }
            else {
                found.proportion++;
            }
        });

        // Convert number of times each decade occurs to a proportion
        newProportions.forEach(decade => {
            decade.proportion = (decade.proportion / numSongs) * 100;
        });

        console.log(newProportions);
        setProportions(newProportions);
    }, [songYears]);

    const [features, setFeatures] = useState({
        "danceability": 50,
        "speechiness": 50,
        "acousticness": 50,
        "liveness": 50,
        "happiness": 50,
        "tempo": 110,
    });

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
    // useEffect(() => {console.log("Size: " + recs.length)})

    const [isLoading, setIsLoading] = useState(false);

    const [newPlaylists, setNewPlaylists] = useState([]);

    const [listOfPlaylists, setListOfPlaylists] = useState ([]);

    const [userPlaylists, setUserPlaylists] = useState([]);

    const updateParams = (index, value) => {
        let x = parameters;
        if (value != null) {
            x[index].data = value;
            setParameters(x);
    
            setFeatures({
                "danceability": x[0].data,
                "speechiness": x[1].data,
                "acousticness": x[2].data,
                "liveness": x[3].data,
                "happiness": x[4].data,
                "tempo": x[5].data
            });
        }

    }

    const [parameters, setParameters] = useState([
        {
            name: "Danceability",
            data: features.danceability,
            index: 0,
        },        
        {
            name: "Speechiness",
            data: features.speechiness,
            index: 1,
        },
        {
            name: "Acousticness",
            data: features.acousticness,
            index: 2,
        },
        {
            name: "Liveness",
            data: features.liveness,
            index: 3,
        },        
        {
            name: "Happiness",
            data: features.happiness,
            index: 4,
        },
        {
            name: "Tempo",
            data: features.tempo,
            index: 5,
        }
    ]);

    const [isExpanded, setisExpanded] = useState(false);

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

    function getFeatureAverage(featureTotal, length, isTempo) {
        if (length > 0) {
            if (isTempo) {
                return (featureTotal / length).toFixed();                
            }
            return ((featureTotal / length)*100).toFixed();
        }
        return -1;
    }

    // get audio features from songs
    const getAudioFeaturesFromSongsAndUpdate = async (token, songs) => {
        let danceabilityTotal = 0;
        let speechinessTotal = 0;
        let acousticnessTotal = 0;
        let livenessTotal = 0;
        let happinessTotal = 0;
        let tempoTotal = 0;

        let getRequest = "https://api.spotify.com/v1/audio-features?ids=";
        songs.forEach((song) => {
            getRequest += song.id +  "%2C";
        })
        getRequest = getRequest.slice(0, -3);   // removes last %
    
        const {data} = await axios
            .get(getRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        if (data) {
            data.audio_features.forEach((song) => {
                danceabilityTotal += song.danceability;
                speechinessTotal += song.speechiness;
                acousticnessTotal += song.acousticness;
                livenessTotal += song.liveness;
                happinessTotal += song.valence; // renamed to happiness
                tempoTotal += song.tempo;
            });
    
            const length = data.audio_features.length;
    
            const danceability = getFeatureAverage(danceabilityTotal, length, false);
            const speechiness = getFeatureAverage(speechinessTotal, length, false);
            const acousticness = getFeatureAverage(acousticnessTotal, length, false);
            const liveness = getFeatureAverage(livenessTotal, length, false);
            const happiness = getFeatureAverage(happinessTotal, length, false);
            const tempo = getFeatureAverage(tempoTotal, length, true);
    
            const temp = {
                "danceability": danceability,
                "speechiness": speechiness,
                "acousticness": acousticness,
                "liveness": liveness,
                "happiness": happiness,
                "tempo": tempo,
            }
    
            return temp;
        }
        return -1;
    }

    // Generate recommendations based on current parameters
    const generateRecommendations = async () => {
        console.log("Generating recommendations!");
        setIsLoading(true);
        setisExpanded(false);
        // Extract songs IDs from each song in each playlist
        let sampleSongIDs = [];
        for (let i = 0; i < listOfPlaylists.length; i++) {
            const tempIDs = await getSongsFromPlaylist(token, listOfPlaylists[i].id); 
            sampleSongIDs = sampleSongIDs.concat(tempIDs);
        }
        songIDs = sampleSongIDs;

        // Print test: sampleSongIDs.forEach((sampleSongID) => {console.log("CurrSongID: " + sampleSongID)});
        

        let currRecs = [];
        const totalRecLimit = 20;
        const limitPerRequest = Math.ceil(50 / Math.ceil(songIDs.length/3));

        const recommendationGetRequest = (currentSongIDs, artistID, genre) => {
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
                // + "&target_tempo=" + features.tempo
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
                .get(recommendationGetRequest(currentSongIDs, artist.id, genre), {
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
        // console.log("I work! Length: " + currRecs.length);
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

        const tempFeatures = await getAudioFeaturesFromSongsAndUpdate(token, currRecs);
        if (tempFeatures != -1) {
            updateParams(0, tempFeatures.danceability);
            updateParams(1, tempFeatures.speechiness);
            updateParams(2, tempFeatures.acousticness);
            updateParams(3, tempFeatures.liveness);
            updateParams(4, tempFeatures.happiness);
            updateParams(5, tempFeatures.tempo);
        }

        setisExpanded(false);
        setIsLoading(false);
    }

    const deleteSong = (id) => {
        // Put code here to actually remove song from wherever you're storing the playlist

        // Remove song from UI
        setNewPlaylists(newPlaylists.filter((newPlaylist) => newPlaylist.id !== id));
        getSongYears();
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

        getSongYears();
        console.log(songYears);
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

    // Sets values for pie when song is added/removed to new playlist
    const getSongYears = () => {
        setSongYears(newPlaylists.map(song => song.song.album.release_date.substring(0, 4)));
    }

    // Fake pie chart data --- FOR TESTING PUPRPOSES
    // const temp = [{"label": "2010s", "proportion": 50}, {"label": "2020s", "proportion": 30}, {"label": "1990s", "proportion": 20}];

    // Updates pie chart data
    const onRotate = (newCoords) => {
        let oldCoords = proportions;
        for (let i = 0; i < oldCoords.length; i++) {
            oldCoords[i].proportion = newCoords[i];
        }
        setProportions(oldCoords);    
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
                                content={!token 
                                    ? <div style={{margin: "0px 10px 0px 10px"}}><i>Please log in to view your playlists.</i></div>
                                    : <UserPlaylists playlists={userPlaylists} onAdd={addPlaylist}/>
                                } 
                            />

                            <Accordion
                                id="audio-features-accordion"
                                label="Audio Features"   
                                isActive={isExpanded}
                                content={!token 
                                    ? <div style={{margin: "0px 10px 0px 10px"}}><i>Please log in to view your playlists.</i></div>
                                    : recs.length == 0 
                                    ? <div style={{margin: "0px 10px 0px 10px"}}><i>Please add at least one playlist to the generator and generate.</i></div>
                                    : 
                                    <div>
                                        <div style={{margin: "0px 10px 10px 10px"}}>
                                            Decade Breakdown <br/>
                                            <i>Hold left to increase, right to decrease!</i>
                                        </div>
                                        <PieChart 
                                            onRotate={onRotate} 
                                            diameter={126} 
                                            style={{margin: "auto"}} 
                                            proportions={proportions.map(p => p.proportion)}
                                            labels={proportions.map(p => p.label)} 
                                        />
                                        <Parameters parameters={parameters} updateParams={updateParams} />
                                    </div>
                                    

                                } 
                            />
                        </div>
                    } 
                />

                {isLoading ?
                    <div id="loader"></div>
                : 
                <div className="centerConsole">
                        <CurrentSong 
                            currentSong={currentSong}
                            addSong={addSong}
                            skipSong={skipSong}
                        />
                        <PreviewPlayer playerLink={playerLink}/>
                    </div>
                }

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
}

export default App;