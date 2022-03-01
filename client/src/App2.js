import React, { Component, useEffect } from "react";
import Playlists from "./components/Playlists"
import "./App.css";


/* 
http://localhost:3000#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

function App() {
    const CLIENT_ID = "b1973aa897914a7a8b045880ef919a81";
    const REDIRECT_URL = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

    const [token, setToken] = useState("");
    
    useEffect(() => {
        if (window.location.hash) {
          const { token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
    
          window.localStorage.clear();
          window.localStorage.setItem("token", token);
          setToken(token);
        }
      }, []);
    
      const handleLogin = () => {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&show_dialog=true`;
      };

      const logout = () => {
          setToken("");
          window.localStorage.clear();
      }
    
    
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Visualify</h1>
          </header>
          <p className="App-intro"></p>
          {!token ? 
            <div>
              <button onClick={handleLogin}>login to spotify</button>
              <Playlists accessToken={token}/>
            </div>
          :               
            <button onClick={logout}>logout</button>
          }
        </div>
    );
} 

export default App;