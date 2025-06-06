import './App.css'; 

import React, { useState, useEffect } from 'react'; 
import AdCard from './components/AdCard'; 

function App() {
  const [ads, setAds] = useState([]);         
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     


  const [sortOrder, setSortOrder] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 



  const standardizeAd = (ad) => {
    return {
      campaign: ad.campaign_name || ad.campaign || ad.utm_campaign || 'N/A',
      adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium || 'N/A',
      creative: ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content || 'N/A',
      spend: ad.spend || ad.cost || 0,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || ad.post_clicks || 0,
      results: ad.results || 0,
    };
  };

  useEffect(() => {
    const fetchAndProcessAds = async () => {
      try {
        const response = await fetch('http://localhost:3000/fakeDataSet');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fullDataSet = await response.json(); 

        const combinedPlatformAds = [
          ...fullDataSet.facebook_ads,
          ...fullDataSet.twitter_ads,
        ].map(ad => standardizeAd(ad));

        const gaResultsMap = new Map();
        fullDataSet.google_analytics.forEach(gaEntry => {
          const standardizedGaEntry = standardizeAd(gaEntry);
          const key = `${standardizedGaEntry.campaign}_${standardizedGaEntry.adset}_${standardizedGaEntry.creative}`;
          gaResultsMap.set(key, gaEntry.results);
        });

        const mergedAds = combinedPlatformAds.map(platformAd => {
          const key = `${platformAd.campaign}_${platformAd.adset}_${platformAd.creative}`;
          const gaResult = gaResultsMap.get(key);
          return {
            ...platformAd,
            results: gaResult !== undefined ? gaResult : platformAd.results,
          };
        });

        setAds(mergedAds);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch or process ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessAds();
  }, []); 



  const handleSort = (order) => {
    setSortOrder(order); 
  };

  const handleClearSort = () => {
    setSortOrder(null); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredAds = ads.filter(ad =>
    (ad.campaign || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredAds = [...filteredAds]; 

  if (sortOrder === 'asc') {
    sortedAndFilteredAds.sort((a, b) => a.spend - b.spend);
  } else if (sortOrder === 'desc') {
    sortedAndFilteredAds.sort((a, b) => b.spend - a.spend);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ad Dashboard</h1>
      </header>

      <main>
        {loading && <p>Loading ads...</p>}
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error.message}</p>}

  
        <div className="controls-container" style={controlsContainerStyle}>
  
          <div className="sort-controls" style={sortControlsStyle}>
            <h4>Sort by Spend:</h4>
            <button
              onClick={() => handleSort('asc')}
   
              style={{ ...buttonStyle, backgroundColor: sortOrder === 'asc' ? '#4CAF50' : '#f0f0f0' }}
            >
              Ascending
            </button>
            <button
              onClick={() => handleSort('desc')}

              style={{ ...buttonStyle, backgroundColor: sortOrder === 'desc' ? '#4CAF50' : '#f0f0f0' }}
            >
              Descending
            </button>
            <button
              onClick={handleClearSort}
          
              style={{ ...buttonStyle, backgroundColor: sortOrder === null ? '#f0f0f0' : '#ffc107' }}
            >
              Clear Sort
            </button>
          </div>

    
          <div className="search-controls" style={searchControlsStyle}>
            <h4>Search by Campaign:</h4>
            <input
              type="text"
              placeholder="Search by Campaign Name"
              value={searchTerm} 
              onChange={handleSearchChange} 
              style={inputStyle}
            />
          </div>
        </div>
        {!loading && !error && filteredAds.length === 0 && <p>No ads found matching your criteria.</p>}

        {!loading && !error && sortedAndFilteredAds.length > 0 ? (
          <div className="ad-cards-container">
            {sortedAndFilteredAds.map((ad, index) => (
              <AdCard key={index} ad={ad} />
            ))}
          </div>
        ) : (

          !loading && !error && ads.length === 0 && <p>No ads to display initially.</p>
        )}
      </main>
    </div>
  );
}



const controlsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px auto',
  maxWidth: '800px',
  padding: '15px',
  border: '1px solid #eee',
  borderRadius: '8px',
  gap: '15px',
  backgroundColor: '#f9f9f9',
};

const sortControlsStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  marginBottom: '10px',
};

const searchControlsStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};

const buttonStyle = {
  padding: '8px 15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
};

const inputStyle = {
  padding: '8px 10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
  width: '250px',
};

const adCardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '20px',
  gap: '20px',
};

export default App;