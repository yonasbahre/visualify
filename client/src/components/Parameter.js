import React, { useState } from "react";
import { Basic } from 'react-dial-knob';

import "./Parameters.css"

function Parameter(props) {
    const [value, setValue] = useState(props.data);

    const updateKnob = (data) => {
        // console.log("updateKnob", props.index);
        // props.updateParams(props.index, data);
        setValue(data);
    }

    return (
        <div className="Parameter">
            {props.parameter.name}
            <Basic 
                diameter={100} 
                min={0}
                max={100} 
                step={1}
                value={value}
                onValueChange={updateKnob}
                ariaLabelledBy={"label"}
            > 
                <p>{props.data}</p>
            </Basic>
        </div>
    );
}

export default Parameter;