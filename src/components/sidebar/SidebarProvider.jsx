import React, { createContext, useContext, useEffect, useState } from 'react'
const SidebarContext = createContext()
export const useSidebarContext = () => useContext(SidebarContext)

const SidebarProvider = ({ children }) => {
    const [smallScreen, setSmallScreen] = useState(false);
    const [expandedSidebar, setExpandedSidebar] = useState(false);

    const toggleSidebar = () => {
        setExpandedSidebar(!expandedSidebar);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 930) {
                setSmallScreen(true);
                setExpandedSidebar(false);
            } else {
                setSmallScreen(false);
                setExpandedSidebar(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <SidebarContext.Provider value={{smallScreen, expandedSidebar, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarProvider
