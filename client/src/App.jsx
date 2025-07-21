import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageResizer from './components/ImageResizer';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Navbar />
        <Hero />
        <main className="flex-grow px-4">
          <ImageResizer />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
