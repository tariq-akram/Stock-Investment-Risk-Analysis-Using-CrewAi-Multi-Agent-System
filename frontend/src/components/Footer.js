import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}! (Placeholder)`);
    setEmail('');
  };

  return (
    <motion.footer
      className="bg-dark text-white py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>Stock Trading Analyzer</h5>
            <p>Empowering wealth creation with AI-driven insights.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Stay Updated</h5>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Connect</h5>
            <div className="social-links">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>© 2025 Stock Trading Analyzer. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;