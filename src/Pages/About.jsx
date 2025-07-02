  /* eslint-disable react/display-name */
  import React, { useEffect, memo, useMemo, useState } from "react";
  import {
    FileText,
    Code,
    Award,
    ArrowUpRight,
    Sparkles,
    UserCheck,
  } from "lucide-react";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import { Globe , Layers3 } from "lucide-react"; 
  
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
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const startDate = new Date("2021-11-06");
      const currentDate = new Date();
      const years =
        currentDate.getFullYear() -
        startDate.getFullYear() -
        (currentDate <
        new Date(
          currentDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
          ? 1
          : 0);

      return {
        totalProjects: storedProjects.length,
        YearExperience: years,
      };
    }, []);

    // Experience modal state
    const [showExperience, setShowExperience] = useState(false);

    // Disable background scroll when modal is open
    useEffect(() => {
      if (showExperience) {
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
    }, [showExperience]);

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

    return (
      <div
        className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
        id="About"
      >
        {/* Experience Modal */}
        {showExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-[#18122B] rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
              <button
                onClick={() => setShowExperience(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                INTERNSHIP
              </h3>
              <p className="text-lg font-semibold mb-1">The Special Character</p>
              <p className="text-sm text-gray-400 mb-2">Software Developer Intern</p>
              <ul className="list-disc pl-5 text-gray-300 mb-2 text-sm">
                <li>Conceptualized and built SportsWalla, a box cricket booking platform.</li>
                <li>Built using Next.js, Medusa, Payload CMS, and Razorpay for full-stack development.</li>
                <li>Developed admin dashboards, secure payment flows, and scalable backend infrastructure.</li>
              </ul>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>05/2025–07/2025</span>
                <span>Ahmedabad, India</span>
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
                As a passionate Computer Science student at PDEU, I'm deeply immersed in the world of full-stack web development. My journey has been marked by building various projects that bring ideas to life on the web. I've also gained valuable real-world experience through a web developer internship. While I enjoy crafting seamless user experiences, my keenest interest lies in the intricacies of the backend, where I love designing robust and efficient systems.
              </p>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
                <a
                  href="/Resume.pdf"
                  className="w-full lg:w-auto"
                  download
                >
                  <button
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                  </button>
                </a>
                <a href="#Portofolio" className="w-full lg:w-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {stats.map((stat) => (
              stat.icon === Globe ? (
                <div key={stat.label} onClick={() => setShowExperience(true)}>
                  <StatCard {...stat} />
                </div>
              ) : (
                <StatCard key={stat.label} {...stat} />
              )
            ))}
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
