import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'; // importing react hooks
import AdCard from './components/AdCard';


function App() {
  const [ads, setAds] = useState([]); // will hold fetched data
    const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  const standardizeAd = (ad) => {
  const standardized = {
    campaign: ad.campaign_name || ad.campaign || ad.utm_campaign,
    adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium,
    creative: ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content,
    spend: ad.spend || ad.cost || 0, // Default to 0 if not present
    impressions: ad.impressions || 0,
    clicks: ad.clicks || ad.post_clicks || 0,
    results: ad.results || 0, // You'll need to allocate these from Google Analytics later
    originalData: ad,
  };
  return standardized;
};
  

useEffect(() => { // tells react to fetch data
  fetch('http://localhost:3000/fakeDataSet') // data will be fetched from the fakeDataSet API
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // if not, then throw error
      }
      return response.json();
    })
    .then(data => {
      const standardizedAds = data.map(ad => standardizeAd(ad));
      setAds(standardizedAds); 
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
      <div className="ad-cards-container">
        {ads.map((ad, index) => (
          <AdCard key={index} ad={ad} />
        ))}
      </div>
      {ads.map((ad, index) => ( 
        <li key={index}>{ad.campaign_name || ad.utm_campaign || 'No Campaign Name'}</li> 
      ))}  {/* .map iterates over the ads array  */}
    </ul>
  </div>
);
}

export default App;

