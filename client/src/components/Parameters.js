import React, { useState } from "react";
import Parameter from "./Parameter";

function Parameters(props) {
    const parameters = props.parameters;
    
    return(
        <div>
            {parameters.map((parameter) => (
                <Parameter parameter={parameter}/>
            ))}
        </div>
    );
}

export default Parameters;