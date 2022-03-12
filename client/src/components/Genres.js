import {useState} from "react";
import axios from 'axios';

function Genres({token, songIDs}) {
    const [tracks, setTrack] = useState([])
    const [genreMap, setGenreMap] = useState(new Map())

    const updateGenreMap = (key,value) => {
        setGenreMap(new Map(genreMap.set(key,value)));
    }

    // build get request
    let getRequest = "https://api.spotify.com/v1/tracks?ids=";
    songIDs.forEach((songID) => {
        getRequest += songID +  "%";
    })
    getRequest = getRequest.slice(0, -1);   // removes last %

    const getTracks = async (e) => {
        e.preventDefault()
        const {data} = await axios
            .get(getRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        setTrack(data)
    }

    tracks.forEach((track) => {
        const genres = track.artists.genres;
        genres.forEach((genre) => {
            if (genresMap.has(genre)) {
                updateGenreMap(genre, genresMap.get(genre) + 1);
            } else {
                updateGenreMap(genre, 1);
            }
        });
    });

    return (
        <div id="features">
            { features.length == 0 ? 
                <button onClick={getFeatures}>get genres</button>
              : 
              <ul>
                {genresMap.keys().map(k => (
                    <li key={k}>k: genresMap.get(k)</li>
                ))}
              </ul>        
            }
        </div>
    );
}

export default Genres;