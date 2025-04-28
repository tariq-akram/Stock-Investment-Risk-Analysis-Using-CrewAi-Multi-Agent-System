import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import HeroSection from './components/HeroSection';
import EnhancedStockForm from './components/EnhancedStockForm';
import ResultsDashboard from './components/ResultsDashboard';
import StockNews from './components/StockNews';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App() {
  const [results, setResults] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <div className={`app ${theme}`}>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
        <main className="container my-5">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <motion.h1
            className="text-center mb-5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Stock Trading Analyzer
          </motion.h1>
          <EnhancedStockForm setResults={setResults} />
          <ResultsDashboard results={results} />
          <StockNews symbol={results?.symbol || 'AAPL'} />
        </main>
      </motion.div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;