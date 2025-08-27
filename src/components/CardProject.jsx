import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const [showIframe, setShowIframe] = useState(false);
  
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-2xl bg-primary-card/20 backdrop-blur-xl border border-border-default/20 shadow-soft-lg transition-all duration-300 hover:shadow-soft-lg hover-lift">
        <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-3 transition-opacity duration-300"></div>
        <div className="relative p-6 z-10">
          {id ? (
            <Link
              to={`/project/${id}`}
              onClick={handleDetails}
              className="text-3xl font-semibold bg-gradient-premium bg-clip-text text-transparent mb-4 cursor-pointer hover:underline transition-all duration-300"
            >
              {Title}
            </Link>
          ) : (
            <h3 className="text-3xl font-semibold bg-gradient-premium bg-clip-text text-transparent mb-4">
              {Title}
            </h3>
          )}
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-primary-bg/20">
            {showIframe && ProjectLink ? (
              <iframe
                src={ProjectLink}
                title="Live Website"
                className="w-full h-full rounded-xl"
                style={{ border: 'none' }}
                allowFullScreen
              />
            ) : (
              <img
                src={Img}
                alt={Title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {ProjectLink && (
              <button
                onClick={() => setShowIframe((prev) => !prev)}
                className="absolute bottom-3 right-3 bg-accent-purple/80 backdrop-blur-xl text-text-primary px-4 py-2 rounded-lg shadow-soft hover:bg-accent-purple transition-all duration-300 text-sm font-medium"
              >
                {showIframe ? "Hide Live Website" : "Show Live Website"}
              </button>
            )}
          </div>
          
          <div className="mt-6 space-y-4">
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-accent-purple hover:text-accent-blue transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-text-muted text-sm"></span>
              )}
              
     

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-card/30 hover:bg-primary-card/50 text-text-primary transition-all duration-300 hover-scale focus:outline-none border border-border-default/20 hover:border-accent-purple/30"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-text-muted text-sm">Details Not Available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;