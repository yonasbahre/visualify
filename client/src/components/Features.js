import {useState} from "react";
import axios from 'axios';

function Features({token, songIDs}) {
    console.log("features");
    const [features, setFeatures] = useState([])

    let danceabilityTotal = 0;
    let speechinessTotal = 0;
    let acousticnessTotal = 0;
    let livenessTotal = 0;
    let happinessTotal = 0;
    let tempoTotal = 0;

    // build get request
    let getRequest = "https://api.spotify.com/v1/audio-features?ids=";
    songIDs.forEach((songID) => {
        getRequest += songID +  "%";
    })
    console.log("after for each songID");
    getRequest = getRequest.slice(0, -1);   // removes last %

    console.log("after build get Request");
    const getFeatures = async (e) => {
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
            setFeatures(data)
    }

    getFeatures();
    console.log("after calling getFeatures");

    features.forEach((song) => {
        danceabilityTotal += song.danceability;
        speechinessTotal += song.speechiness;
        acousticnessTotal += song.acousticness;
        livenessTotal += song.liveness;
        happinessTotal += song.valence; // renamed to happiness
        tempoTotal += song.tempo;
    });

    const danceability = danceabilityTotal / features.length;
    const speechiness = speechinessTotal / features.length;
    const acousticness = acousticnessTotal / features.length;
    const liveness = livenessTotal / features.length;
    const happiness = happinessTotal / features.length;
    const temp = tempoTotal / features.length;

    return (
        <div>
        </div>
    );
}

export default Features;