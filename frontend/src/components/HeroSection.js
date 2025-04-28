import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.section
      className="hero-section text-center py-5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h2
          className="mb-4 hero-title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Unlock Wealth with Smart Trading
        </motion.h2>
        <motion.p
          className="lead mb-4 hero-subtitle"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Analyze stocks with AI-powered insights and make informed decisions.
        </motion.p>
        <motion.a
          href="#analyze"
          className="btn btn-primary btn-lg hero-btn" // Added hero-btn class
          whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Start Analyzing
        </motion.a>
      </div>
    </motion.section>
  );
};

export default HeroSection;