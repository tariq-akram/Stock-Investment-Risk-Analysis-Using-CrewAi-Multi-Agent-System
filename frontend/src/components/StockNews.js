import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=8V7DR8R07GIOFZCO`
        );
        const articles = response.data.feed?.slice(0, 5) || [];
        setNews(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };
    fetchNews();
  }, [symbol]);

  return (
    <motion.div
      className="card p-4 mb-5 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mb-4">
        <FontAwesomeIcon icon={faNewspaper} className="me-2" />
        Latest News for {symbol}
      </h3>
      {loading ? (
        <div className="text-center">
          <PacmanLoader color="#003087" size={25} />
        </div>
      ) : news.length > 0 ? (
        <div className="news-carousel">
          {news.map((article, index) => (
            <motion.div
              key={index}
              className="news-item p-3 mb-3 border rounded"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="d-flex">
                <img
                  src={article.banner_image || 'https://via.placeholder.com/100x60?text=News'}
                  alt="News Thumbnail"
                  className="news-image me-3"
                  style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <div>
                  <h5>{article.title}</h5>
                  <p>{article.summary?.slice(0, 150)}...</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No news available for {symbol}.</p>
      )}
    </motion.div>
  );
};

export default StockNews;