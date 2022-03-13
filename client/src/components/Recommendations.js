import {useState} from "react";
import axios from 'axios';

function Recommendations({token, features, songIDs}) {
    const [recommendations, setRecommendations] = useState([])

    // up to how many unique songs will returned at the end
    const totalRecLimit = 20;

    // calculates how many songs should be gotten per request is needed to get 50 songs
    // based on how many given song IDs there are
    const limitPerRequest = Math.ceil(50 / Math.ceil(songIDs.length/3));

    // create getRequest
    // rn it has genre and artist hardcoded in
    function getRequest(currentSongIDs) {
        let getReq = "https://api.spotify.com/v1/recommendations?"
            + "limit=" + limitPerRequest 
            + "&seed_artists=0e86yPdC41PGRkLp2Q1Bph"
            + "&seed_genres=pop"
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

    const getRecommendations = async (e) => {
        let tempRecs = []
        // loops through 3 songs at a time 
        for (let i = 0; i < songIDs.length; i+=3) {
            // use three songs per recommendation
            const currentSongIDs = songIDs.slice(i, i + 3);
            
            // get recommended songs
            const {data} = await axios
                .get(getRequest(currentSongIDs), {
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
          
        setRecommendations(uniqueRecs);        
    }

    // renders recs as a bullet point list
    const renderRecs = () => {
        return recommendations.map(rec => (
            <li key={rec.id}>{rec.name}</li>
        ))
    }

    return (
        <div id="Playlists">
            { recommendations.length == 0 ? 
                <button onClick={getRecommendations}>get recommendations</button>
              : 
                <ul>
                  { renderRecs() }
                </ul>
            }
        </div>
    );
}

export default Recommendations;