import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'; // importing react hooks


function App() {
  const [ads, setAds] = useState([]); // will hold fetched data

useEffect(() => { // tells react to fetch data 
  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:3000/fakeDataSet'); // data will be fetched from fakeDataSet
      if (!response.ok) { // Checks if the response was successful 
        throw new Error(`HTTP error! status: ${response.status}`); // if not, then throw error
      }
      const data = await response.json();

      setAds(data); // update the ads with fetched data
      // Set 'loading' state to false, indicating data fetching is complete
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  fetchAds();
}, []); 


return (
  <div className="App">  
    <h1>Ad Dashboard</h1> {/* Heading of the page */}
    {loading && <p>Loading ads...</p>} {/* Conditional rendering, if left is true, right will be true */}
    {error && <p>Error: {error.message}</p>}  
    <ul>
      {ads.map((ad, index) => ( 
        <li key={index}>{ad.campaign_name || ad.utm_campaign || 'No Campaign Name'}</li> 
      ))} {/* Iterates over Ad array  */}
    </ul>
  </div>
);
}

export default App;
