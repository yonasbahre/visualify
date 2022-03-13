import {useState} from "react";
import axios from 'axios';

function Genres({token, songIDs}) {
    const [genresMap, setGenresMap] = useState(new Map())

    const updateGenresMap = (key,value) => {
        setGenresMap(new Map(genresMap.set(key,value)));
    }

    // build get request for get tracks
    let getTracksGetRequest = "https://api.spotify.com/v1/tracks?ids=";
    songIDs.forEach((songID) => {
        getTracksGetRequest += songID +  "%2C";
    })
    getTracksGetRequest = getTracksGetRequest.slice(0, -3);   // removes last %

    // set up get request for get artists later
    let getArtistGetRequest = "https://api.spotify.com/v1/artists?ids=";

    const getGenres = async (e) => {
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
        console.log(tracksData);

        // get artist IDs from track data
        let tempArtistIDs = [];
        tracksData.tracks.forEach((track) => {
            if (track) {
                track.artists.forEach((artist) => {
                    tempArtistIDs.push(artist.id);
                });
    
            }
        });

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
        console.log(artistsData.artists);
        

        // fill the genres map
        artistsData.artists.forEach((artist) => {
            const genres = artist.genres;
            genres.forEach((genre) => {
                if (genresMap.has(genre)) {
                    updateGenresMap(genre, genresMap.get(genre) + 1);
                } else {
                    updateGenresMap(genre, 1);
                }
            });
        });
    
        console.log(genresMap);
    }

    const renderGenres = () => {
        return [...genresMap.keys()].map(k => (
                <li key={k}>{k}: {genresMap.get(k)}</li>
        ));
    }
    


    return (
        <div id="features">
            { genresMap.size == 0 ? 
                <button onClick={getGenres}>get genres</button>
              : 
              <ul>
                { renderGenres() }
              </ul>        
            }
        </div>
    );
}

export default Genres;