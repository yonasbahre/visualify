import React, { useState } from 'react'

import { Basic } from 'react-dial-knob';

function KnobComponent(props) {
    const [value, setValue] = useState(props.value);


    const updateKnob = (e, data) => {
        // console.log("updateKnob", props.index);
        // props.updateParams(props.index, data);
        setValue(data);
    }

    return (
        <div>
            {/* <Basic 
                diameter={100} 
                min={0}
                max={100} 
                step={1}
                value={value}
                onValueChange={updateKnob}
                ariaLabelledBy={"label"}
            > 
                <p>{props.data}</p>
            </Basic> */}
        </div>
    );
}

export default KnobComponent;