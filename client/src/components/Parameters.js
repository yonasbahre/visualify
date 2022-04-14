import React, { useState } from "react";
import Parameter from "./Parameter";

function Parameters(props) {
    const parameters = props.parameters;
    
    return(
        <div id="parameters">
            {parameters.map((parameter) => (
                <Parameter key={parameter.name} parameter={parameter}/>
            ))}
        </div>
    );
}

export default Parameters;