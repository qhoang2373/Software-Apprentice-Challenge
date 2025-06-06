import React from 'react';

const AdCard = ({ ad }) => { 
  return (
    <div className="ad-card">
      <h3>Campaign: {ad.campaign}</h3>
      <p><strong>Adset:</strong> {ad.adset}</p>
      <p><strong>Creative:</strong> {ad.creative}</p>
      <p><strong>Spend:</strong> ${ad.spend !== undefined ? ad.spend.toFixed(2) : '0.00'}</p>
      <p><strong>Impressions:</strong> {ad.impressions !== undefined ? ad.impressions.toLocaleString() : '0'}</p>
      <p><strong>Clicks:</strong> {ad.clicks !== undefined ? ad.clicks.toLocaleString() : '0'}</p>
      <p><strong>Results:</strong> {ad.results !== undefined ? ad.results.toLocaleString() : '0'}</p>
    </div>
  );
};

export default AdCard;