import {useState} from "react";
import axios from 'axios';

function Genres({token, songIDs}) {
    const [tracks, setTracks] = useState([])
    const [artistIDs, setArtistIDs] = useState([])
    const [artistsInfo, setArtistsInfo] = useState([])
    const [genresMap, setGenresMap] = useState(new Map())

    const updateGenresMap = (key,value) => {
        setGenresMap(new Map(genresMap.set(key,value)));
    }

    // build get request for get tracks
    let getTracksGetRequest = "https://api.spotify.com/v1/tracks?ids=";
    songIDs.forEach((songID) => {
        getTracksGetRequest += songID +  "%";
    })
    getTracksGetRequest = getTracksGetRequest.slice(0, -1);   // removes last %

    // set up get request for get artists later
    let getArtistGetRequest = "https://api.spotify.com/v1/artists?ids=";

    const getTracks = async (e) => {
        // get tracks data
        e.preventDefault()
        const {data: tracksData} = await axios
            .get(getTracksGetRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        setTracks(tracksData.tracks)

        // get artist IDs from track data
        let tempArtistIDs = [];
        tracksData.tracks.forEach((track) => {
            track.artists.forEach((artist) => {
                tempArtistIDs.push(artist.id);
            });
        });

        setArtistIDs(tempArtistIDs);

        // build get request for get tracks
        tempArtistIDs.forEach((artistID) => {
            getArtistGetRequest += artistID +  "%2C";
        })
        getArtistGetRequest = getArtistGetRequest.slice(0, -3);   // removes last %
        console.log("getArtistGetRequest", getArtistGetRequest);

        // get the artists data
        const {data: artistsData} = await axios
            .get(getArtistGetRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });
        
        setArtistsInfo(artistsData.artists)
    }

    console.log("tracks", tracks);

    console.log("artistIDs", artistIDs);

    console.log("artistsInfo", artistsInfo);

    // tracks.forEach((track) => {
    //     const genres = track.artists.genres;
    //     genres.forEach((genre) => {
    //         if (genresMap.has(genre)) {
    //             updateGenresMap(genre, genresMap.get(genre) + 1);
    //         } else {
    //             updateGenresMap(genre, 1);
    //         }
    //     });
    // });

    // console.log(genresMap);

    // const getArtists = async (e) => {
    //     console.log("getArtists");
    //     e.preventDefault()
    //     const {data} = await axios
    //         .get(getArtistGetRequest, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //         console.log(data);
    //     setArtistsInfo(data)
    // }


    // tracks.forEach((track) => {
    //     const genres = track.artists.genres;
    //     genres.forEach((genre) => {
    //         if (genresMap.has(genre)) {
    //             updateGenresMap(genre, genresMap.get(genre) + 1);
    //         } else {
    //             updateGenresMap(genre, 1);
    //         }
    //     });
    // });

    // console.log(genresMap);

    return (
        <div id="features">
            { genresMap.size == 0 ? 
                <button onClick={getTracks}>get genres</button>
              : 
            //   <ul>
            //     {[genresMap.keys()].map(k => (
            //         <li key={k}>k: genresMap.get(k)</li>
            //     ))}
            //   </ul>        
            <p>genres</p>
            }
        </div>
    );
}

export default Genres;