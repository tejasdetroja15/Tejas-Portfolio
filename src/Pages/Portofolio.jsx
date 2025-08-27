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
import { Code, Award, Boxes, Layers, Sparkles, ArrowDown } from "lucide-react";

// Premium Toggle Button Component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-6 py-3
      text-text-secondary 
      hover:text-text-primary 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-3
      bg-primary-card/50 
      hover:bg-primary-card
      rounded-xl
      border 
      border-border-default/30
      hover:border-accent-purple/30
      backdrop-blur-xl
      group
      relative
      overflow-hidden
      hover-lift
    "
  >
    <span className="relative z-10 flex items-center gap-3">
      {isShowingMore ? "See Less" : "See More"}
      <ArrowDown
        className={`
          w-4 h-4 transition-transform duration-300 
          ${isShowingMore ? "rotate-180 group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      />
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-premium transition-all duration-300 group-hover:w-full"></span>
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
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
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
    // Initialize AOS with premium settings
    AOS.init({
      once: false,
      duration: 800,
      easing: 'ease-out-cubic',
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
      // localStorage.setItem("projects", JSON.stringify(projectData));
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
      <div className="pt-32 pb-20 relative overflow-hidden" id="Portfolio">
        <div className="premium-container">
          <div className="text-center" data-aos="fade-in-up" data-aos-duration="1000">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-4">
              Portfolio Showcase
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Loading your portfolio...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 relative overflow-hidden" id="Portfolio">
      {/* Floating Background Elements */}
      <div className="floating-element w-96 h-96 top-1/4 right-1/4 opacity-5" />
      <div className="floating-element w-80 h-80 bottom-1/4 left-1/4 opacity-5" delay={2} />
      
      <div className="premium-container relative z-10">
          {/* Header section */}
          <div className="text-center mb-16" data-aos="fade-in-up" data-aos-duration="1000">
            <div className="inline-block relative group mb-4">
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent">
                Portfolio Showcase
              </h2>
            </div>
            <p className="text-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
              Explore my journey through projects, certifications, and technical expertise. 
              Each section represents a milestone in my continuous learning path.
            </p>
          </div>

          <Box sx={{ width: "100%" }}>
            <AppBar
              position="static"
              elevation={0}
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(75, 85, 99, 0.2)",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(180deg, rgba(99, 102, 241, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)",
                  zIndex: 0,
                },
              }}
              className="md:px-6"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
                sx={{
                  minHeight: "80px",
                  "& .MuiTab-root": {
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: "600",
                    color: "#9CA3AF",
                    textTransform: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    padding: "24px 0",
                    zIndex: 1,
                    margin: "8px",
                    borderRadius: "16px",
                    "&:hover": {
                      color: "#FAFAFA",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      transform: "translateY(-2px)",
                      "& .lucide": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                    "&.Mui-selected": {
                      color: "#FAFAFA",
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))",
                      boxShadow: "0 8px 32px rgba(99, 102, 241, 0.15)",
                      "& .lucide": {
                        color: "#A78BFA",
                      },
                    },
                  },
                  "& .MuiTabs-indicator": {
                    height: 0,
                  },
                  "& .MuiTabs-flexContainer": {
                    gap: "12px",
                  },
                }}
              >
                <Tab
                  icon={<Code className="mb-2 w-6 h-6 transition-all duration-300" />}
                  label="Projects"
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<Layers className="mb-2 w-6 h-6 transition-all duration-300" />}
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
                <div className="flex flex-col gap-8 pb-12">
                  {displayedProjects.map((project, index) => (
                    <div key={project.id} data-aos="fade-in-up" data-aos-delay={index * 150}>
                      <CardProject
                        Img={project.ImgUrl}
                        Title={project.Title}
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 pb-12">
                  {displayedTechStack.map((tech, index) => (
                    <div key={tech.language} data-aos="fade-in-scale" data-aos-delay={index * 100}>
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