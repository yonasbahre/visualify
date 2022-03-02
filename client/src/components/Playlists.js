import {useState} from "react";
import axios from 'axios';

function Playlists({token}) {
    const [playlists, setPlaylists] = useState([])

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

            console.log(data);

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

    console.log(playlists);
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

export default Playlists;