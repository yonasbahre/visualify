import React from "react";
import './Graph.css'

import { HorizontalBar } from 'react-chartjs-3'

class Graph extends React.Component {    

  constructor(props)  {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('New values submitted: ' + this.state.value);        
    event.preventDefault();
  }

  render()  {    

    let songYears = []
    let decade = []    
    let distinctSongYears = ['N', 'O', 'V', 'A', 'L', 'U', 'E'] 
    let countSongYears = []   
    let percSongYears = [0,0,0,0,0,0,0]   

    try{
      songYears = this.props.graphData
      songYears = songYears.map((i) => Number(i))
      console.log(songYears)

      distinctSongYears = []
      percSongYears = []

      for (let i = 0; i < songYears.length; i++)  {
        decade.push(Math.floor(songYears[i] / 10) * 10)            
      }
  
      for (let i = 0; i < songYears.length; i++)  {
        if (distinctSongYears.includes(decade[i])){
          console.log(" ")
        }
        else{
          distinctSongYears.push(decade[i])
        }
      }    
  
      distinctSongYears.sort(function(a, b){return a - b})   
      console.log(distinctSongYears)   

      // let countSongYears = new Array(distinctSongYears.length); for (let i=0; i<distinctSongYears.length; ++i) a[i] = 0;
      // new countSongYears(distinctSongYears.length+1).join('0').split('').map(parseFloat)  
      
      for(let i = 0; i < distinctSongYears.length; i++){
        countSongYears.push(0)
      }

  
      for (let i = 0; i < songYears.length; i++)  {    
        countSongYears[distinctSongYears.indexOf(decade[i])] += 1      
      }
      
      for(let i = 0; i < countSongYears.length; i++){
        percSongYears.push(Math.round(((countSongYears[i]/countSongYears.reduce((pv, cv) => pv + cv, 0)) * 100) * 100)/ 100)      
      }     
      console.log(percSongYears)      
    }      
    catch{
      console.log("No value")
    }        

    return(      
      <div>
        <HorizontalBar
          data = {{
            labels: distinctSongYears,       
            datasets: [{
              label: "Decade",
              data: percSongYears
            }]   
          }}      
          height = {400}
          width = {600}
          options = {{          
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />  
        <form onSubmit={this.handleSubmit}>
          <label style={{marginLeft: 5}}>
            Change Percentages  
            <input type="text" name="name" style={{marginLeft:10}}/>
          </label>
          <input type="submit" value="Submit" style={{marginLeft: 10}}/>
        </form>  
        <p style={{fontWeight: 'bold', marginLeft: 5}}>Note: Write the values for each one separated by commas.</p>
      </div>
    )
  }  
}

export default Graph