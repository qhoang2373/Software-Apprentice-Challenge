  import React from 'react';

  const AdCard = ({ ad }) => { // Receives 'ad' object as prop
    return (
      <div className="ad-card"> {/* Apply CSS styling here */}
        <h3>Campaign: {ad.campaign}</h3>
        <p>Adset: {ad.adset}</p>
        <p>Creative: {ad.creative}</p>
        <p>Spend: ${ad.spend.toFixed(2)}</p>
        <p>Impressions: {ad.impressions.toLocaleString()}</p>
        <p>Clicks: {ad.clicks.toLocaleString()}</p>
        <p>Results: {ad.results.toLocaleString()}</p>
      </div>
    );
  };

  export default AdCard;