import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      className="btn btn-outline-secondary mb-4 d-flex align-items-center"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className="me-2" />
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </motion.button>
  );
};

export default ThemeToggle;