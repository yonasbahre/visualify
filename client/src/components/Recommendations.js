import {useState} from "react";
import axios from 'axios';

function Recommendations({token, songIDs}) {
    const [recommendations, setRecommendations] = useState([])

    const danceability = window.localStorage.getItem("danceability")
    const speechiness = window.localStorage.getItem("speechiness")
    const acousticness = window.localStorage.getItem("acousticness")
    const liveness = window.localStorage.getItem("liveness")
    const happiness = window.localStorage.getItem("happiness")
    const tempo = window.localStorage.getItem("tempo")


    const getRecommendations = async (e) => {
        e.preventDefault()
        const {data} = await axios
            .get("https://api.spotify.com/v1/recommendations", {
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
        <div id="Playlists">
            { playlists.length == 0 ? 
                <button onClick={getPlaylists}>get playlists</button>
              : 
                <div>
                  { renderPlaylists() }
                </div>
            }
        </div>
    );
}

export default Recommendations;