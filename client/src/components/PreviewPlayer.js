import React, { useEffect, useState } from 'react';
import Spotify from 'react-spotify-embed';


function PreviewPlayer(props) {
    const link = props.playerLink;

    return(
        <div>
            <Spotify wide link={link} />
        </div>
    );
}

export default PreviewPlayer;