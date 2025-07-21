// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="text-center py-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700 mt-auto">
    <p className="text-gray-600 dark:text-gray-300 text-sm">
      © {new Date().getFullYear()}   ImageResizer.   All rights reserved.
    </p>
  </footer>
);

export default Footer;
