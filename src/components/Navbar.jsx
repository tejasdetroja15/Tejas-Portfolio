import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Projects", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 100,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* Scroll Progress Indicator */}
            <div className="scroll-progress" id="scroll-progress"></div>
            
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                    isOpen
                        ? "bg-primary-bg/95 backdrop-blur-xl"
                        : scrolled
                        ? "bg-primary-bg/80 backdrop-blur-xl border-b border-border-default/20"
                        : "bg-transparent"
                }`}
            >
                <div className="premium-container">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a
                                href="#Home"
                                onClick={(e) => scrollToSection(e, "#Home")}
                                className="group flex items-center space-x-2 focus:outline-none"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-premium rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    <div className="relative bg-primary-card rounded-lg p-2 border border-accent-purple/20">
                                        <Sparkles className="w-6 h-6 text-accent-purple" />
                                    </div>
                                </div>
                                <span className="text-xl font-semibold bg-gradient-premium bg-clip-text text-transparent">
                                    Tejas Detroja
                                </span>
                            </a>
                        </div>
            
                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                {navItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="group relative px-3 py-2 text-sm font-medium transition-all duration-300 focus:outline-none"
                                    >
                                        <span
                                            className={`relative z-10 transition-all duration-300 ${
                                                activeSection === item.href.substring(1)
                                                    ? "text-text-primary font-medium"
                                                    : "text-text-secondary group-hover:text-text-primary"
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                        <span
                                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-premium transform origin-left transition-transform duration-300 rounded-full ${
                                                activeSection === item.href.substring(1)
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
            
                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`relative p-3 rounded-xl transition-all duration-300 focus:outline-none ${
                                    isOpen 
                                        ? "bg-accent-purple/20 border border-accent-purple/30" 
                                        : "bg-primary-card/50 border border-border-default/30 hover:bg-primary-card"
                                }`}
                                aria-label="Open navigation menu"
                            >
                                <div className="relative">
                                    {!isOpen ? (
                                        <Menu className="w-6 h-6 text-text-primary" />
                                    ) : (
                                        <X className="w-6 h-6 text-text-primary" />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            
                {/* Mobile Menu Overlay */}
                <div
                    className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
                        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                >
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
                            isOpen ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Side Drawer */}
                    <div
                        className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-primary-bg/95 backdrop-blur-xl border-l border-border-default/20 shadow-soft-lg transform transition-transform duration-500 ${
                            isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-border-default/20">
                                <span className="text-lg font-semibold text-text-primary">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-primary-card transition-colors duration-200 focus:outline-none"
                                    aria-label="Close Menu"
                                >
                                    <X className="w-5 h-5 text-text-secondary" />
                                </button>
                            </div>
                            
                            {/* Navigation Items */}
                            <div className="flex-1 px-6 py-8">
                                <div className="space-y-2">
                                    {navItems.map((item, index) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e) => scrollToSection(e, item.href)}
                                            className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none ${
                                                activeSection === item.href.substring(1)
                                                    ? "bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                                                    : "text-text-secondary hover:text-text-primary hover:bg-primary-card"
                                            }`}
                                            style={{
                                                transitionDelay: `${index * 100}ms`,
                                                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                                                opacity: isOpen ? 1 : 0,
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;