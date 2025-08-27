import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';

// Scroll Progress Indicator
const ScrollProgressIndicator = () => {
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return null;
};

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <ScrollProgressIndicator />
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer className="bg-primary-secondary border-t border-border-default/20">
            <div className="premium-container py-12">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></div>
                  <span className="text-text-muted text-sm">Crafted with passion</span>
                  <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></div>
                </div>
                <p className="text-text-secondary text-sm">
                  © 2025 Tejas Detroja. All Rights Reserved.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer className="bg-primary-secondary border-t border-border-default/20">
      <div className="premium-container py-12">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></div>
            <span className="text-text-muted text-sm">Crafted with passion</span>
            <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></div>
          </div>
          <p className="text-text-secondary text-sm">
            © 2025 Tejas Detroja. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;