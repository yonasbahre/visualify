import React from 'react'
import './Slider.css'

import { Slider } from '@material-ui/core'

class SliderComp extends React.Component
{
  render()
  {
    return (
      <div className = 'sliderStyle'>
        <h3 className = 'features'>Features</h3>
        <div className = 'inlineTextSlide'>
          <p className='sliderHead'>Danceability</p>             
          <Slider className = 'sliderStyling'/>              
        </div>        
      </div>  
)} 
}

 export default SliderComp;