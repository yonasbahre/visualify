import React, { useState } from "react";
import Parameter from "./Parameter";

function Parameters({parameters, updateParams}) {
    return(
        <div id="parameters">
            {parameters.map((parameter) => (
                <Parameter key={parameter.name} parameter={parameter} updateParams={updateParams}/>
            ))}
        </div>
    );
}

export default Parameters;