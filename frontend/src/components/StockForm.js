import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const StockForm = ({ setResults }) => {
  const [symbol, setSymbol] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('Medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/analyze/', {
        symbol: symbol.toUpperCase(),
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
    <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm">
      <div className="mb-3">
        <label htmlFor="symbol" className="form-label">Stock Symbol</label>
        <input
          type="text"
          className="form-control"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g., AAPL"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="riskTolerance" className="form-label">Risk Tolerance</label>
        <select
          className="form-select"
          id="riskTolerance"
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Stock'}
      </button>
    </form>
  );
};

export default StockForm;