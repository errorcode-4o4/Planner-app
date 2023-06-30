import React, { useEffect, useState } from 'react';

export default function NewsWidget() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json');
      const data = await response.json();
      setNewsData(data.articles);
    } catch (error) {
      console.log('Error fetching news data:', error);
    }
  };

  return (
    <div style={{ minWidth: 300, maxHeight: 400, overflow: 'scroll' }}>
      <h3>News Widget</h3>
      {newsData.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {newsData.map((newsItem, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <img src={newsItem.urlToImage} alt="News" style={{ width: '100%' }} />
              <h4 style={{ fontWeight: 'bold' }}>{newsItem.title}</h4>
              <p>{newsItem.description}</p>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
}
