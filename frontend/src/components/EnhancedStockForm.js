import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Select from 'react-select';
import api from '../services/api';
import { usePopper } from 'react-popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faClock, faShieldAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';

const stockOptions = [
  { value: 'AAPL', label: 'Apple Inc. (AAPL)' },
  { value: 'MSFT', label: 'Microsoft Corp. (MSFT)' },
  { value: 'GOOGL', label: 'Alphabet Inc. (GOOGL)' },
  { value: 'AMZN', label: 'Amazon.com Inc. (AMZN)' },
  { value: 'TSLA', label: 'Tesla Inc. (TSLA)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const EnhancedStockForm = ({ setResults }) => {
  const [formData, setFormData] = useState({
    stock: null,
    investmentGoal: 'growth',
    timeHorizon: 'medium',
    lossComfort: 'moderate',
  });
  const [loading, setLoading] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mapToRiskTolerance = () => {
    const { investmentGoal, timeHorizon, lossComfort } = formData;
    let score = 0;
    if (investmentGoal === 'growth') score += 2;
    else if (investmentGoal === 'income') score += 1;
    if (timeHorizon === 'long') score += 1;
    else if (timeHorizon === 'short') score += 2;
    if (lossComfort === 'high') score += 2;
    else if (lossComfort === 'low') score += 1;

    if (score >= 4) return 'High';
    if (score === 3) return 'Medium';
    return 'Low';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.stock) {
      toast.error('Please select a stock symbol.');
      return;
    }
    setLoading(true);
    try {
      const riskTolerance = mapToRiskTolerance();
      const response = await api.post('/analyze/', {
        symbol: formData.stock.value,
        risk_tolerance: riskTolerance,
      });
      setResults(response.data);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      toast.error('Error analyzing stock. Please try again.');
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="card p-4 mb-5 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 className="mb-4" variants={itemVariants}>
        Analyze Your Investment
      </motion.h3>
      <motion.div className="mb-3" variants={itemVariants}>
        <label className="form-label">
          <FontAwesomeIcon icon={faChartBar} className="me-2" />
          Stock Symbol
        </label>
        <div
          ref={setReferenceElement}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Select
            options={stockOptions}
            value={formData.stock}
            onChange={(selected) => handleInputChange('stock', selected)}
            placeholder="Search for a stock..."
            classNamePrefix="react-select"
          />
        </div>
        {showTooltip && (
          <div
            ref={setPopperElement}
            style={{ ...styles.popper, backgroundColor: '#003087', color: '#FFF', padding: '8px 12px', borderRadius: '5px', zIndex: 1000 }}
            {...attributes.popper}
          >
            Choose a stock to analyze, e.g., Apple (AAPL).
          </div>
        )}
      </motion.div>
      <motion.div className="mb-3" variants={itemVariants}>
        <label className="form-label">
          <FontAwesomeIcon icon={faDollarSign} className="me-2" />
          Investment Goal
        </label>
        <select
          className="form-select"
          value={formData.investmentGoal}
          onChange={(e) => handleInputChange('investmentGoal', e.target.value)}
        >
          <option value="growth">Growth</option>
          <option value="income">Income</option>
          <option value="preservation">Capital Preservation</option>
        </select>
      </motion.div>
      <motion.div className="mb-3" variants={itemVariants}>
        <label className="form-label">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          Time Horizon
        </label>
        <select
          className="form-select"
          value={formData.timeHorizon}
          onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
        >
          <option value="short">Short-term (&lt; 1 year)</option>
          <option value="medium">Medium-term (1-5 years)</option>
          <option value="long">Long-term (5+ years)</option>
        </select>
      </motion.div>
      <motion.div className="mb-3" variants={itemVariants}>
        <label className="form-label">
          <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
          Comfort with Losses
        </label>
        <select
          className="form-select"
          value={formData.lossComfort}
          onChange={(e) => handleInputChange('lossComfort', e.target.value)}
        >
          <option value="low">Low (Prefer stability)</option>
          <option value="moderate">Moderate</option>
          <option value="high">High (Can handle volatility)</option>
        </select>
      </motion.div>
      <motion.button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: loading ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: loading ? Infinity : 0, duration: 0.8 }}
      >
        {loading ? 'Analyzing...' : 'Analyze Now'}
      </motion.button>
    </motion.form>
  );
};

export default EnhancedStockForm;