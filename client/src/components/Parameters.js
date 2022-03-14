import React, { useState } from "react";
import Accordion from "./Accordion";
import Parameter from "./Parameter";

function Parameters(props) {
    const parameters = props.parameters;
    
    return(
        <div>
            {parameters.map((parameter) => (
                <Accordion
                    label={parameter.name}
                    content=<Parameter parameter={parameter}/>
                />
            ))}
        </div>
    );
}

export default Parameters;