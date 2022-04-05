import React, { useState } from "react";
import "./Parameters.css"

function Parameter(props) {
    return (
        <div className="Parameter">
            {props.parameter.name}
            {props.parameter.chart}
        </div>
    );
}

export default Parameter;