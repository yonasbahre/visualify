import React, { useEffect, useReducer, useState, useRef } from "react";
import './PieChart.css';

function PieChart(props) {
    //
    //
    // ========== Functions for calculating data and shape of chart ===========

    // Calculates starting positions for each wedge
    let startingOffset = 0;
    const sumOfPrevProportions = () => {
        if (props.proportions.length === 0) {
            return [];
        }

        let result = [...props.proportions];
        result[0] = startingOffset;

        for (let i = 1; i < result.length; i++) {
            result[i] = result[i - 1] + props.proportions[i - 1];
        }
        
        return result;
    }
    let startingPoints = sumOfPrevProportions(props.proportions);


    // Note that the diameter of the circle for this function doesn't match up
    // properly with the height of the viewbox. Not sure why.
    // The diameter of the circle is only half of the viewbox's length on each side.
    let diameter = props.diameter;             
    let circumference = diameter * Math.PI;
    let viewboxLength = 2 * diameter;

    // Determines color of wedge. May update this to get a better looking color distribution?
    const color = (index) => {
        return "hsl(" + ((360 / (index + 1)) * 7) % 360 + ", 70%, 65%)";
    }

    const widthInPX = (proportion) => {
        return (proportion * circumference) / 100;
    }

    const wedgeWidth = (widthInPX) => {
        return widthInPX + " " + circumference;
    }

    const labelCoords = (radius, proportion, startPoint, x) => {
        let midpoint = startPoint + (proportion / 2);
        midpoint = (midpoint + 75) % 100;
        midpoint = (midpoint / 100) * 2 * Math.PI;
        if (x) {
            return ((radius / 1.8) * Math.cos(midpoint)) + (0.9 * radius);
        }

        return ((radius / 1.8) * Math.sin(midpoint)) + radius;
    }


    //
    //
    //
    // ========== Functions for resizing/adjusting pie chart =============
    const IntervalRef = useRef(null);
    const [interacting, setInteracting] = useState(false);
    const [updater, setUpdater] = useState(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    // Adjusts pie chart. Increase if left click, decrease if right click
    const startCounter = (index, step) => {
        if (IntervalRef.current) return;
        IntervalRef.current = setInterval(() => {
            let newP = props.proportions;
            let denominator = 100 - newP[index];
            if (newP[index] > 1 || step > 0) {
                // newP[index] += step;

                for (let i = 0; i < newP.length; i++) {
                    if (i == index) {
                        newP[i] += step;
                    }
                    else {
                        newP[i] = ((newP[i] / denominator) * (denominator - step));
                    }
                }

                props.onRotate(newP);
            }
            forceUpdate();
        }, 50);
    }

    const stopCounter = () => {
        if (IntervalRef.current) {
            clearInterval(IntervalRef.current);
            IntervalRef.current = null;
        }
    }

    // Handles mouse input and calls the function to adjust the chart values
    const handleOnMouseDown = (event, index) => {
        if (event.which == 3 || event.button == 2) {    // Right click
            startCounter(index, -1)
        }
        else {                                          // Left click
            startCounter(index, 1);
        }
        
        // old
        window.addEventListener('mouse', event);
        setInteracting(true);
        const {pageX, pageY, clientX, clientY } = event;

        setUpdater(updater + 1);
        // updateAreaLocation
        // updateAngleValue
    }

    
    const handleOnMouseUp = (event) => {
        stopCounter();
        window.removeEventListener('mouse', event);
        setInteracting(false);
    }


    //
    //
    // Wedges to be returned
    let wedges = props.proportions.map((proportion, i) => 
        <svg >
            <circle 
                style={{zIndex:"5"}}
                onMouseDown={(e) => {handleOnMouseDown(e, i)}}
                onMouseUp={handleOnMouseUp}
                className="wedge" 
                r={diameter / 2} 
                cx={diameter} 
                cy={diameter} 
                fill="transparent" 
                stroke={color(i)} 
                strokeWidth={diameter} 
                strokeDasharray={wedgeWidth(widthInPX(proportion))}
                strokeDashoffset={-1 * widthInPX(startingPoints[i])} 
                transform={"rotate(-90) translate(-" + 2 * diameter + ")"}
                onClick={props.onClick}
            />
            <text style={{zIndex:"200"}} fontWeight="bold" x={labelCoords(diameter, proportion, startingPoints[i], true) - 1} y={labelCoords(diameter, proportion, startingPoints[i], false) - 20} fill="black">{props.labels[i]}s</text>
            <text x={labelCoords(diameter, proportion, startingPoints[i], true)} y={labelCoords(diameter, proportion, startingPoints[i], false)} fill="black">{proportion.toFixed(1)}%</text>
        </svg>

    );

    return(
        <div>
            {props.proportions.length === 0 ? 
                <div style={{margin: "0px 10px 10px 10px"}}><i>Add at least one song to your playlist to see your decade breakdown!</i></div>:
                <svg className="PieChart" height={viewboxLength} width={viewboxLength} viewBox={"0 0 " + viewboxLength + " " + viewboxLength}>
                    <circle r={diameter} cx={diameter} cy={diameter} fill="transparent" />
                    {wedges}
                </svg>
            }

        </div>
    );
}

export default PieChart;
