import {useState} from "react";
import axios from 'axios';

function PlaylistsItems({token, playlistIDs}) {
    console.log("PlaylistsItems");
    const [playlistItems, setPlaylistItems] = useState([])
    setPlaylistItems("");

    const playlistID = playlistIDs[0];

    const getRequest = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=10&offset=5"

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
        console.log(data);

        setPlaylistItems(data)
    }

    return (
        <div id="Playlists Items">
            { playlistItems.length == 0 ? 
                <button onClick={getPlaylistItems}>get playlists items</button>
              : 
                <div>
                  <p>playlists items</p>
                </div>
            }
        </div>
    );
}

export default PlaylistsItems;