import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { PacmanLoader } from 'react-spinners';

const ResultsDashboard = ({ results }) => {
  const [expanded, setExpanded] = useState({
    advice: true,
    risk: true,
    price: true,
    returns: true,
  });
  const [loadingImages, setLoadingImages] = useState({ price: true, returns: true });

  if (!results) return null;

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <motion.div
      className="card p-4 mb-5 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4">Analysis Results for {results.symbol}</h2>
      <div className="accordion">
        <div className="accordion-item">
          <h3
            className="accordion-header d-flex justify-content-between align-items-center"
            onClick={() => toggleSection('advice')}
            style={{ cursor: 'pointer' }}
          >
            Trade Recommendations
            <FontAwesomeIcon icon={expanded.advice ? faChevronUp : faChevronDown} />
          </h3>
          <AnimatePresence>
            {expanded.advice && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{results.trade_advice}</p>
                <a
                  href={`https://finance.yahoo.com/quote/${results.symbol}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  View on Yahoo Finance
                </a>
                <a
                  href={`https://www.google.com/finance/quote/${results.symbol}:NASDAQ`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  View on Google Finance
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="accordion-item">
          <h3
            className="accordion-header d-flex justify-content-between align-items-center"
            onClick={() => toggleSection('risk')}
            style={{ cursor: 'pointer' }}
          >
            Risk Assessment
            <FontAwesomeIcon icon={expanded.risk ? faChevronUp : faChevronDown} />
          </h3>
          <AnimatePresence>
            {expanded.risk && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{results.risk_assessment}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="accordion-item">
          <h3
            className="accordion-header d-flex justify-content-between align-items-center"
            onClick={() => toggleSection('price')}
            style={{ cursor: 'pointer' }}
          >
            Price and SMA Chart
            <FontAwesomeIcon icon={expanded.price ? faChevronUp : faChevronDown} />
          </h3>
          <AnimatePresence>
            {expanded.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {loadingImages.price && (
                  <div className="text-center my-3">
                    <PacmanLoader color="#003087" size={25} />
                  </div>
                )}
                <motion.img
                  src={results.chart_data.price_chart}
                  alt="Price Chart"
                  className="img-fluid mb-3"
                  onLoad={() => setLoadingImages((prev) => ({ ...prev, price: false }))}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: loadingImages.price ? 'none' : 'block' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="accordion-item">
          <h3
            className="accordion-header d-flex justify-content-between align-items-center"
            onClick={() => toggleSection('returns')}
            style={{ cursor: 'pointer' }}
          >
            Cumulative Returns
            <FontAwesomeIcon icon={expanded.returns ? faChevronUp : faChevronDown} />
          </h3>
          <AnimatePresence>
            {expanded.returns && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {loadingImages.returns && (
                  <div className="text-center my-3">
                    <PacmanLoader color="#003087" size={25} />
                  </div>
                )}
                <motion.img
                  src={results.chart_data.returns_chart}
                  alt="Returns Chart"
                  className="img-fluid"
                  onLoad={() => setLoadingImages((prev) => ({ ...prev, returns: false }))}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: loadingImages.returns ? 'none' : 'block' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;