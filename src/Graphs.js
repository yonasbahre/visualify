import React from 'react';
import './Graphs.css';

import { HorizontalBar } from 'react-chartjs-2'

const state = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Genres',
      backgroundColor: 'black',
      borderColor: 'white',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ],  
}

class Graphs extends React.Component {
  render()  {
    return(
      <div>
        <h1 className = 'webTitle'>Visualify</h1>   
        <button variant='contained' className = 'playlistButton'>+ Playlist</button>
        <h3 className = 'graphHeading'>Parameters</h3>        
        <HorizontalBar className = 'graphStyle' width={500} height={200} data={state} options={{responsive: false, maintainAspectRatio: false, scales: {xAxes: [{ticks: {beginAtZero: true, fontColor: 'white'}}], yAxes: [{ticks: {fontColor: 'white'}}]}, legend: {labels: {fontColor: 'white'}}}}/>
      </div>
    )
  } 
}

export default Graphs;
