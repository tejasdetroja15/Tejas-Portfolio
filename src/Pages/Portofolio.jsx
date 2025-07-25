import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, Layers } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Updated tech stack array with proper paths
const techStacks = [  
  { icon: "/html.svg", language: "HTML" },
  { icon: "/css.svg", language: "CSS" },
  { icon: "/javascript.svg", language: "JavaScript" },
  { icon: "/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/reactjs.svg", language: "ReactJS" },
  { icon: "/vite.svg", language: "Vite" },
  { icon: "/nodejs.svg", language: "Node JS" },
  { icon: "/cplusplus.svg", language: "C++" },
  { icon: "/python.svg", language: "Python" },
  { icon: "/firebase.svg", language: "Firebase" },
  { icon: "/vercel.svg", language: "Vercel" },
  { icon: "/render.svg", language: "Render" },
  { icon: "/github.svg", language: "Github" },
  { icon: "/mongodb.svg", language: "Mongodb" },
  { icon: "/expressjs.svg", language: "Express" }
  
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllTechStack, setShowAllTechStack] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialProjectItems = isMobile ? 4 : 6;
  const initialTechItems = isMobile ? 6 : 8;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false,
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectCollection);
      const projectData = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || []
      }));
      
      setProjects(projectData);
      localStorage.setItem("projects", JSON.stringify(projectData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = (type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else if (type === 'techstack') {
      setShowAllTechStack(prev => !prev);
    }
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialProjectItems);
  const displayedTechStack = showAllTechStack ? techStacks : techStacks.slice(0, initialTechItems);

  if (loading) {
    return (
      <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
        <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            <span style={{
              color: '#6366f1',
              backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Portfolio Showcase
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Loading your portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="Projects">
      <div id="Portofolio" className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden">
        {/* TEST: Display all projects fetched from Firestore */}
        {/* <div style={{background: '#222', color: '#fff', padding: '1rem', marginBottom: '2rem'}}>
          <h2>Test Firestore Projects Fetch</h2>
          {projects.length === 0 ? (
            <p>No projects found in Firestore.</p>
          ) : (
            projects.map(project => (
              <div key={project.id} style={{marginBottom: '1rem'}}>
                <strong>{project.Title}</strong>
                <div>{project.Description}</div>
              </div>
            ))
          )}
        </div> */}

        {/* Header section */}
        <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            <span style={{
              color: '#6366f1',
              backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Portfolio Showcase
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Explore my journey through projects, certifications, and technical expertise. 
            Each section represents a milestone in my continuous learning path.
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
                backdropFilter: "blur(10px)",
                zIndex: 0,
              },
            }}
            className="md:px-4"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              sx={{
                minHeight: "70px",
                "& .MuiTab-root": {
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: "600",
                  color: "#94a3b8",
                  textTransform: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "20px 0",
                  zIndex: 1,
                  margin: "8px",
                  borderRadius: "12px",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-2px)",
                    "& .lucide": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                  "&.Mui-selected": {
                    color: "#fff",
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                    boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                    "& .lucide": {
                      color: "#a78bfa",
                    },
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 0,
                },
                "& .MuiTabs-flexContainer": {
                  gap: "8px",
                },
              }}
            >
              <Tab
                icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
                label="Projects"
                {...a11yProps(0)}
              />
              <Tab
                icon={<Layers className="mb-2 w-5 h-5 transition-all duration-300" />}
                label="Tech Stack"
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={setValue}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className="flex flex-col gap-6 pb-[5%]">
                {displayedProjects.map((project, index) => (
                  <div key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
                    <CardProject
                      Img={project.ImgUrl}
                      Title={project.Title}
                      // Description={project.Description}
                      Link={project.ProjectLink}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
              {projects.length > initialProjectItems && (
                <div className="text-center">
                  <ToggleButton 
                    onClick={() => toggleShowMore('projects')}
                    isShowingMore={showAllProjects}
                  />
                </div>
              )}
            </TabPanel>
            
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-[5%]">
                {displayedTechStack.map((tech, index) => (
                  <div key={tech.language} data-aos="fade-up" data-aos-delay={index * 100}>
                    <TechStackIcon
                      TechStackIcon={tech.icon}
                      Language={tech.language}
                    />
                  </div>
                ))}
              </div>
              {techStacks.length > initialTechItems && (
                <div className="text-center">
                  <ToggleButton 
                    onClick={() => toggleShowMore('techstack')}
                    isShowingMore={showAllTechStack}
                  />
                </div>
              )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
}