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

    // function that creates the genres map
    const getGenres = async (e) => {
        // get tracks data as tracksData
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

        // get artist IDs from track data
        let artistIDs = [];
        tracksData.tracks.forEach((track) => {
            if (track) {
                track.artists.forEach((artist) => {
                    artistIDs.push(artist.id);
                });
    
            }
        });

        // build get request for get tracks
        artistIDs.forEach((artistID) => {
            getArtistGetRequest += artistID +  "%2C";
        })
        getArtistGetRequest = getArtistGetRequest.slice(0, -3);   // removes last %

        // get the artists data as artistsData
        const {data: artistsData} = await axios
            .get(getArtistGetRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

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
    }

    // renders genres map as a list as - genre: count
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