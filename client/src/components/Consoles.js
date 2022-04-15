import './Consoles.css'
import Accordion from './Accordion.js';

// A "console" is basically what I'm calling each major section
// w/ scrollbars. If you think I should rename this lmk
function Console(props) {    
    return (
        <div className="Console" style={{height: props.height, overflowX: props.overflowX, overflowY: props.overflowY}}>
            {props.content}
        </div>

    );
}


export default Console;