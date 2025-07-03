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
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Globe, Layers3 } from "lucide-react";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/PSX_20250621_214108.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-300 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
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
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Completed Projects",
      description: "Bringing ideas to life",
      animation: "fade-right",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Experience",
      description: "Continuous learning journey",
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
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      {/* Experience Modal */}
      {showExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-2xl p-6 max-w-md w-full relative border border-white/10">
            <button
              onClick={() => setShowExperience(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close Experience Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              INTERNSHIP
            </h3>
            <p className="text-lg font-semibold mb-1 text-white">The Special Character</p>
            <p className="text-sm text-gray-300 mb-3">Software Developer Intern</p>
            <ul className="list-disc pl-5 text-gray-300 mb-4 text-sm space-y-1">
              <li>Conceptualized and built SportsWalla, a box cricket booking platform.</li>
              <li>Built using Next.js, Medusa, Payload CMS, and Razorpay for full-stack development.</li>
              <li>Developed admin dashboards, secure payment flows, and scalable backend infrastructure.</li>
            </ul>
            <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
              <span>05/2025–07/2025</span>
              <span>Ahmedabad, India</span>
            </div>
          </div>
        </div>
      )}

      {/* Improved CV Modal - Desktop Only */}
      {showCVModal && !isMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl shadow-2xl p-3 max-w-5xl w-full h-[95vh] relative border border-white/10 flex flex-col">
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Resume
              </h3>
              <button
                onClick={() => setShowCVModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
                aria-label="Close CV Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* PDF Viewer - Maximum Space */}
            <div className="flex-1 mb-2 rounded-lg overflow-hidden bg-white shadow-inner">
              <iframe
                src="/Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                title="Resume PDF"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            
            {/* Compact Footer */}
            <div className="flex gap-2 justify-center px-2">
              <a
                href="/Resume.pdf"
                download="Tejas_Detroja_Resume.pdf"
                className="rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-4 py-2 text-sm font-medium flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" /> Download
              </a>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#a855f7]/50 text-[#a855f7] px-4 py-2 text-sm font-medium hover:bg-[#a855f7]/10 transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> New Tab
              </a>
              <button
                onClick={() => setShowCVModal(false)}
                className="rounded-lg bg-gray-700 text-white px-4 py-2 text-sm font-medium hover:bg-gray-600 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Tejas Detroja
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              As a passionate Computer Science student at PDEU, I'm deeply immersed in the world of full-stack web development. My journey has been marked by building various projects that bring ideas to life on the web. I've also gained valuable real-world experience through a web developer internship. While I enjoy crafting seamless user experiences. I'm most passionate about exploring the intricacies of backend development, where I love designing robust and efficient systems.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <button
                type="button"
                onClick={handleViewCV}
                data-aos="fade-up"
                data-aos-duration="800"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> 
                {isMobile ? 'View Resume' : 'View CV'}
              </button>
              <a href="#Projects" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 cursor-pointer">
          {stats.map((stat) => {
            if (stat.icon === Globe) {
              // Experience card opens modal
              return (
                <div key={stat.label} onClick={() => setShowExperience(true)}>
                  <StatCard {...stat} />
                </div>
              );
            } else if (stat.label === "Completed Projects") {
              // Completed Projects card redirects to #Portfolio
              return (
                <a key={stat.label} href="#Portfolio">
                  <StatCard {...stat} />
                </a>
              );
            } else {
              return <StatCard key={stat.label} {...stat} />;
            }
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);