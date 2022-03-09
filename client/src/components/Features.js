import {useState} from "react";
import axios from 'axios';

function Features({token, songIDs}) {
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
    getRequest = getRequest.slice(0, -1);   // removes last %

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

            setFeatures(data.audio_features)
    }

    features.forEach((song) => {
        danceabilityTotal += song.danceability;
        speechinessTotal += song.speechiness;
        acousticnessTotal += song.acousticness;
        livenessTotal += song.liveness;
        happinessTotal += song.valence; // renamed to happiness
        tempoTotal += song.tempo;
    });

    const danceability = getFeatureAverage(danceabilityTotal);
    const speechiness = getFeatureAverage(speechinessTotal);
    const acousticness = getFeatureAverage(acousticnessTotal);
    const liveness = getFeatureAverage(livenessTotal);
    const happiness = getFeatureAverage(happinessTotal);
    const tempo = getFeatureAverage(tempoTotal);

    function getFeatureAverage(featureTotal) {
        if (features.length > 0) {
            return (featureTotal / features.length).toFixed(3);
        }
        return -1;
    }

    return (
        <div id="features">
            { features.length == 0 ? 
                <button onClick={getFeatures}>get features</button>
              : 
                <div>
                  <p>danceability: {danceability}</p>
                  <p>speechiness: {speechiness}</p>
                  <p>acousticness: {acousticness}</p>
                  <p>liveness: {liveness}</p>
                  <p>happiness: {happiness}</p>
                  <p>tempo: {tempo}</p>
                </div>
            }
        </div>
    );
}

export default Features;