// src/components/Hero.jsx
import React from 'react';

const Hero = () => (
  <section className="text-center px-4 py-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
    <h2 className="text-4xl font-bold mb-4">Resize & Compress Your Image</h2>
    <p className="text-lg max-w-xl mx-auto">
      Upload an image and choose your custom width, height, or size (in KB). Get a preview before download.
    </p>
  </section>
);

export default Hero;
