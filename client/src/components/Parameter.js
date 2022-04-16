import React, { useState } from "react";
import { Basic } from 'react-dial-knob';

import "./Parameters.css"

function Parameter(props) {
    const [value, setValue] = useState(props.parameter.data);

    const updateKnob = (data) => {
        setValue(data);
        props.updateParams(props.parameter.index, data);
    }

    return (
        
        <div className="Parameter">
            {props.parameter.name}
            { props.parameter.index == 5 ?
                <Basic 
                    diameter={100} 
                    min={90}
                    max={160} 
                    step={1}
                    value={value}
                    onValueChange={updateKnob}
                    ariaLabelledBy={"label"}
                 > 
                    <p>{props.data}</p>
                </Basic>
            :
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
            }
        </div>
    );
}

export default Parameter;