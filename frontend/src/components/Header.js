import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png'; // Uncomment if you have a logo

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className="navbar navbar-expand-lg sticky-top"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          {/* <img src={logo} alt="Logo" height="40" className="me-2" /> */}
          <FontAwesomeIcon icon={faChartLine} className="me-2" />
          Stock Analyzer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <motion.span
            className="navbar-toggler-icon"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
        <motion.div
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id="navbarNav"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="navbar-nav ms-auto align-items-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <motion.a
                  className={`nav-link ${activeLink === item.name.toLowerCase() ? 'active' : ''}`}
                  href={item.href}
                  onClick={() => setActiveLink(item.name.toLowerCase())}
                  whileHover={{ scale: 1.1, color: '#FFD700' }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
            <li className="nav-item">
              <motion.a
                className="nav-link"
                href="#search"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </motion.a>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;