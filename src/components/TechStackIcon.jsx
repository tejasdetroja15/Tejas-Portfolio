import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 rounded-2xl bg-primary-card/20 hover:bg-primary-card/30 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover-scale cursor-pointer shadow-soft hover:shadow-soft-lg border border-border-default/20 hover:border-accent-purple/20">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-premium rounded-full opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`} 
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-text-secondary font-semibold text-sm md:text-base tracking-wide group-hover:text-text-primary transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 