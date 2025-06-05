import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'; // importing react hooks


function App() {
  const [ads, setAds] = useState([]); // will hold fetched data
  

useEffect(() => { // tells react to fetch data
  fetch('http://localhost:3000/fakeDataSet') // data will be fetched from the fakeDataSet API
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // if not, then throw error
      }
      return response.json();
    })
    .then(data => {
      setAds(data); 
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
      console.error("Error fetching data:", error); // logs error message to console
    });
}, []); 

return (
  <div className="App">
    <h1>Ad Dashboard</h1>  {/* Main heading of the page */}
    {loading && <p>Loading ads...</p>}  {/* Conditional rendering, if left is true then, right will render  */}
    {error && <p>Error: {error.message}</p>}
    <ul>
      {ads.map((ad, index) => ( 
        <li key={index}>{ad.campaign_name || ad.utm_campaign || 'No Campaign Name'}</li> 
      ))}  {/* .map iterates over the ads array  */}
    </ul>
  </div>
);
}

export default App;

