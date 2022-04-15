import React, { useState } from 'react'

import { Slider } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

function SlideComponent(props) {
    const useStyles = makeStyles(theme => ({
        rail: {
          background: "lightgrey"
        },
    }));

    const classes = useStyles();

    const updateSlide = (e, data) => {
        props.updateParams(props.index, data);
    }

    return (
        <div>
            <Slider 
                className="sliderStyling"
                defaultValue={props.value}
                onChange={updateSlide}
                classes={{rail: classes.rail}} 
            />
            <p>{props.data}</p>
        </div>
    );
}

export default SlideComponent;