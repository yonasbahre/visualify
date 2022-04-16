import './Accordion.css'
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';


function Accordion(props) {
    
    const [isActive, setIsActive] = useState(props.isActive);
    console.log(isActive);

    return(
        <div className="Accordion">
            <div className="header" onClick={() => setIsActive(!isActive)} >
                <div>{props.label}</div>
                <div>{isActive ? <FaChevronUp /> : <FaChevronDown />}</div>
            </div>

            {isActive && <div className="content">{props.content}</div>}

        </div>
    );
}

export default Accordion;