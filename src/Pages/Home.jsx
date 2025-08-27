/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  ArrowRight,
  Code,
  Zap,
} from "lucide-react";

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-bounce">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-premium rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative px-4 py-2 rounded-full bg-primary-card/80 backdrop-blur-xl border border-accent-purple/20">
        <span className="bg-gradient-premium bg-clip-text text-transparent text-sm font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-accent-purple" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-premium blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-premium bg-clip-text text-transparent">
          Full Stack 
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-1">
        <span className="absolute -inset-2 bg-gradient-premium blur-2xl opacity-20"></span>
        <span className="relative text-text-primary">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-3 py-1.5 rounded-full bg-primary-card/30 backdrop-blur-sm border border-border-default/20 text-xs text-text-secondary hover:bg-primary-card/50 hover:border-accent-purple/30 transition-all duration-300 hover-scale">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, variant = "primary" }) => (
  <a href={href} className="group">
    <button className={`relative w-full sm:w-auto ${
      variant === "primary" 
        ? "premium-button" 
        : "premium-button-outline"
    }`}>
      <span className="flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
        <span className="font-medium">
          {text}
        </span>
        <Icon
          className={`w-4 h-4 ${
            text === "Contact"
              ? "group-hover:translate-x-1"
              : "group-hover:rotate-45"
          } transform transition-all duration-300`}
        />
      </span>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-2.5">
      <div className="absolute inset-0 bg-gradient-premium rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-lg bg-primary-card/30 backdrop-blur-xl p-2.5 flex items-center justify-center border border-border-default/20 group-hover:border-accent-purple/30 transition-all duration-300 hover-scale">
        <Icon className="w-4 h-4 text-text-secondary group-hover:text-accent-purple transition-colors" />
      </div>
    </button>
  </a>
));

const FloatingElement = memo(({ className, delay = 0 }) => (
  <div className={`floating-element ${className}`} style={{ animationDelay: `${delay}s` }}></div>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Code. Create. Innovate.", "Deploying Dreams to Production", "Developer by Passion", "Tech Explorer"];
const TECH_STACK = ["React", "JavaScript", "Node.js", "Tailwind", "Python", "MongoDB"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/tejasdetroja15" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/tejas-detroja-7b046a323/" },
  { icon: Instagram, link: "https://www.instagram.com/_tejas_detroja/" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="pt-32 pb-20 relative overflow-hidden" id="Home">
      {/* Floating Background Elements */}
      <FloatingElement className="w-96 h-96 top-1/4 left-1/4 opacity-10" />
      <FloatingElement className="w-80 h-80 bottom-1/4 right-1/4 opacity-8" delay={2} />
      <FloatingElement className="w-64 h-64 top-1/2 left-1/2 opacity-6" delay={4} />

      {/* Hero Section */}
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="premium-container flex items-center min-h-[80vh]">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex w-full items-center justify-between max-w-6xl mx-auto">
            
            {/* Left Column - Content */}
            <div className="w-1/2 space-y-8 pr-8">
              <div className="flex justify-start">
                <StatusBadge />
              </div>
              
              <MainTitle />

              {/* Typing Effect */}
              <div className="h-10 flex items-center">
                <span className="text-xl text-text-secondary font-light">
                  {text}
                </span>
                <span className="w-[2px] h-6 bg-gradient-premium ml-2 animate-pulse rounded-full"></span>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech, index) => (
                  <TechStack key={index} tech={tech} />
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <CTAButton href="#Projects" text="View Projects" icon={ExternalLink} />
                <CTAButton href="#Contact" text="Get In Touch" icon={Mail} variant="outline" />
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} {...social} />
                ))}
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="w-1/2 flex justify-center items-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-premium rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-primary-card/20 backdrop-blur-xl rounded-2xl p-6 border border-border-default/30 shadow-soft-lg">
                  <img 
                    src="/test2.gif"
                    alt="Development workspace"
                    className="rounded-xl shadow-soft w-full max-w-md h-auto object-cover"
                  />
                  {/* Floating Icons */}
                  <div className="absolute -top-3 -right-3 bg-accent-purple/20 backdrop-blur-xl rounded-full p-2 border border-accent-purple/30">
                    <Code className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 bg-accent-green/20 backdrop-blur-xl rounded-full p-2 border border-accent-green/30">
                    <Zap className="w-5 h-5 text-accent-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden w-full space-y-8 text-center">
            
            {/* Status Badge */}
            <div className="flex justify-center">
              <StatusBadge />
            </div>
            
            {/* Title */}
            <MainTitle />

            {/* Typing Effect */}
            <div className="h-8 flex items-center justify-center">
              <span className="text-lg text-text-secondary font-light">
                {text}
              </span>
              <span className="w-[2px] h-5 bg-gradient-premium ml-2 animate-pulse rounded-full"></span>
            </div>

            {/* Mobile Hero Image */}
            <div className="relative mx-auto max-w-xs">
              <div className="absolute -inset-4 bg-gradient-premium rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-primary-card/20 backdrop-blur-xl rounded-xl p-4 border border-border-default/30 shadow-soft">
                <img 
                  src="/test2.gif"
                  alt="Development workspace"
                  className="rounded-lg shadow-soft w-full h-48 object-cover"
                />
                {/* Floating Icons */}
                <div className="absolute -top-2 -right-2 bg-accent-purple/20 backdrop-blur-xl rounded-full p-1.5 border border-accent-purple/30">
                  <Code className="w-4 h-4 text-accent-purple" />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-accent-green/20 backdrop-blur-xl rounded-full p-1.5 border border-accent-green/30">
                  <Zap className="w-4 h-4 text-accent-green" />
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {TECH_STACK.map((tech, index) => (
                <TechStack key={index} tech={tech} />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <CTAButton href="#Projects" text="View Projects" icon={ExternalLink} />
              <CTAButton href="#Contact" text="Get In Touch" icon={Mail} variant="outline" />
            </div>

            {/* Social Links */}
            <div className="flex gap-3 justify-center">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-text-muted text-sm">Scroll to explore</span>
          <ArrowRight className="w-5 h-5 text-accent-purple rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default memo(Home);