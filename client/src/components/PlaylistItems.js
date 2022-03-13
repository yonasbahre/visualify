import {useState} from "react";
import axios from 'axios';

function PlaylistsItems({token, playlistID}) {
    const [playlistItems, setPlaylistItems] = useState([])

    const getRequest = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?fields=items(track(id%2C%20name))";

    const getPlaylistItems = async (e) => {
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

            setPlaylistItems(data.items)
    }

    const renderPlaylistItems = () => {
        return playlistItems.map(item => (
            <div key={item.track.id}>
                {item.track.name}
            </div>
        ))
    }
    return (
        <div id="Playlists Items">
            { playlistItems.length == 0 ? 
                <button onClick={getPlaylistItems}>get playlists items</button>
              : 
                <div>
                  <p>playlists items</p>
                  { renderPlaylistItems() }
                </div>
            }
        </div>
    );
}

export default PlaylistsItems;