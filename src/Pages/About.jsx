/* eslint-disable react/display-name */
import React, { useEffect, memo, useMemo, useState } from "react";
import {
  FileText,
  Code,
  Award,
  ArrowUpRight,
  Sparkles,
  UserCheck,
  X,
  Download,
  ExternalLink,
  Globe,
  Layers3,
  Star,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center mb-16">
    <div className="inline-block relative group">
      <h2
        className="text-5xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent"
        data-aos="fade-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-4 text-text-secondary max-w-2xl mx-auto text-lg flex items-center justify-center gap-3"
      data-aos="fade-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-accent-purple" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-accent-purple" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center">
    <div className="relative group" data-aos="fade-in-scale" data-aos-duration="1000">
      {/* Premium gradient backgrounds */}
      <div className="absolute -inset-8 opacity-30 z-0">
        <div className="absolute inset-0 bg-gradient-premium rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute inset-0 bg-gradient-to-l from-accent-green to-accent-blue rounded-full blur-3xl animate-float opacity-50" />
      </div>
      
      <div className="relative">
        <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-soft-lg transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-accent-purple/20 rounded-full z-20 transition-all duration-700 group-hover:border-accent-purple/40 group-hover:scale-105" />

          {/* Premium overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 via-transparent to-accent-green/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <img
            src="/PSX_20250621_214108.jpg"
            alt="Tejas Detroja - Full Stack Developer"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Premium hover effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-accent-purple/20 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-soft" />
          </div>
        </div>
        
        {/* Floating badges */}
        <div className="absolute -top-4 -right-4 bg-accent-purple/20 backdrop-blur-xl rounded-full p-3 border border-accent-purple/30 animate-float">
          <Star className="w-6 h-6 text-accent-purple" />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-accent-green/20 backdrop-blur-xl rounded-full p-3 border border-accent-green/30 animate-float" style={{ animationDelay: '1s' }}>
          <Code className="w-6 h-6 text-accent-green" />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation, onClick }) => (
    <div
      data-aos={animation}
      data-aos-duration="1300"
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative z-10 bg-primary-card/50 backdrop-blur-xl rounded-2xl p-8 border border-border-default/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-soft-lg h-full flex flex-col justify-between hover-lift">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent-purple/10 border border-accent-purple/20 transition-transform group-hover:rotate-6 group-hover:scale-110">
            <Icon className="w-8 h-8 text-accent-purple" />
          </div>
          <span
            className="text-5xl font-bold bg-gradient-premium bg-clip-text text-transparent"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-text-secondary mb-3 font-medium"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-sm text-text-muted leading-relaxed"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent-purple transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </div>
  )
);

const AboutPage = () => {
  const { totalProjects, YearExperience } = useMemo(() => {
    // Using fallback data instead of localStorage
    const fallbackProjects = [
      { id: 1, name: "Project 1" },
      { id: 2, name: "Project 2" },
      { id: 3, name: "Project 3" },
    ];
    return {
      totalProjects: fallbackProjects.length,
      YearExperience: 1,
    };
  }, []);

  // Experience modal state
  const [showExperience, setShowExperience] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (showExperience || showCVModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showExperience, showCVModal]);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
        duration: 800,
        easing: 'ease-out-cubic',
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const stats = [
    {
      icon: Layers3,
      color: "from-accent-purple to-accent-blue",
      value: totalProjects,
      label: "Completed Projects",
      description: "Bringing ideas to life with innovative solutions",
      animation: "fade-right",
    },
    {
      icon: Globe,
      color: "from-accent-green to-accent-purple",
      value: YearExperience,
      label: "Years Experience",
      description: "Continuous learning and growth journey",
      animation: "fade-left",
    },
  ];

  const handleViewCV = () => {
    if (isMobile) {
      // On mobile, directly open PDF in new tab
      window.open('/Resume.pdf', '_blank');
    } else {
      // On desktop, show modal
      setShowCVModal(true);
    }
  };

  return (
    <div className="pt-32 pb-20 relative overflow-hidden" id="About">
      {/* Floating Background Elements */}
      <div className="floating-element w-96 h-96 top-1/4 left-1/4 opacity-5" />
      <div className="floating-element w-80 h-80 bottom-1/4 right-1/4 opacity-5" delay={2} />
      
      <div className="premium-container relative z-10">
        {/* Experience Modal */}
        {showExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-primary-card/95 backdrop-blur-xl rounded-2xl shadow-soft-lg p-8 max-w-md w-full relative border border-border-default/30">
              <button
                onClick={() => setShowExperience(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors duration-200"
                aria-label="Close Experience Modal"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-premium bg-clip-text text-transparent">
                INTERNSHIP
              </h3>
              <p className="text-lg font-semibold mb-2 text-text-primary">The Special Character</p>
              <p className="text-sm text-text-secondary mb-4">Software Developer Intern</p>
              <ul className="list-disc pl-5 text-text-secondary mb-6 text-sm space-y-2">
                <li>Conceptualized and built SportsWalla, a box cricket booking platform.</li>
                <li>Built using Next.js, Medusa, Payload CMS, and Razorpay for full-stack development.</li>
                <li>Developed admin dashboards, secure payment flows, and scalable backend infrastructure.</li>
              </ul>
              <div className="flex justify-between text-xs text-text-muted pt-4 border-t border-border-default/30">
                <span>05/2025–07/2025</span>
                <span>Ahmedabad, India</span>
              </div>
            </div>
          </div>
        )}

        {/* Improved CV Modal - Desktop Only */}
        {showCVModal && !isMobile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-primary-card/95 backdrop-blur-xl rounded-2xl shadow-soft-lg p-6 max-w-6xl w-full h-[90vh] relative border border-border-default/30 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">
                  Resume
                </h3>
                <button
                  onClick={() => setShowCVModal(false)}
                  className="text-text-muted hover:text-text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-primary-bg/50"
                  aria-label="Close CV Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* PDF Viewer */}
              <div className="flex-1 mb-4 rounded-xl overflow-hidden bg-white shadow-soft">
                <iframe
                  src="/Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  title="Resume PDF"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              
              {/* Footer */}
              <div className="flex gap-3 justify-center">
                <a
                  href="/Resume.pdf"
                  download="Tejas_Detroja_Resume.pdf"
                  className="premium-button text-sm px-6 py-2 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-outline text-sm px-6 py-2 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> New Tab
                </a>
                <button
                  onClick={() => setShowCVModal(false)}
                  className="px-6 py-2 rounded-lg bg-primary-bg text-text-primary text-sm font-medium hover:bg-primary-card transition-all duration-300 border border-border-default/30"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Header />

        <div className="w-full mx-auto pt-12 relative">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <span className="bg-gradient-premium bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <span
                  className="block mt-2 text-text-primary"
                  data-aos="fade-right"
                  data-aos-duration="1300"
                >
                  Tejas Detroja
                </span>
              </h2>

              <p
                className="text-lg lg:text-xl text-text-secondary leading-relaxed text-justify"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                As a passionate Computer Science student at PDEU, I'm deeply immersed in the world of full-stack web development. My journey has been marked by building various projects that bring ideas to life on the web. I've also gained valuable real-world experience through a web developer internship. While I enjoy crafting seamless user experiences, I'm most passionate about exploring the intricacies of backend development, where I love designing robust and efficient systems.
              </p>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 w-full">
                <button
                  type="button"
                  onClick={handleViewCV}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="premium-button w-full lg:w-auto px-8 py-3 flex items-center justify-center lg:justify-start gap-3"
                >
                  <FileText className="w-5 h-5" /> 
                  {isMobile ? 'View Resume' : 'View CV'}
                </button>
                <a href="#Projects" className="w-full lg:w-auto">
                  <button
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="premium-button-outline w-full lg:w-auto px-8 py-3 flex items-center justify-center lg:justify-start gap-3"
                  >
                    <Code className="w-5 h-5" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            <ProfileImage />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            {stats.map((stat) => {
              if (stat.icon === Globe) {
                // Experience card opens modal
                return (
                  <div key={stat.label} onClick={() => setShowExperience(true)}>
                    <StatCard {...stat} />
                  </div>
                );
              } else if (stat.label === "Completed Projects") {
                // Completed Projects card redirects to #Projects
                return (
                  <a key={stat.label} href="#Projects">
                    <StatCard {...stat} />
                  </a>
                );
              } else {
                return <StatCard key={stat.label} {...stat} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);