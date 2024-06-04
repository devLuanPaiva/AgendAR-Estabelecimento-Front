import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.scss'
import { useSidebarContext } from '../../components/sidebar/SidebarProvider'

const Nav = ({ links }) => {
    const { expandedSidebar } = useSidebarContext()
    const location = useLocation()

    return (
        <nav className={`${!expandedSidebar ? 'expandNavigation' : 'collapseNavigation'}`}>
            {links.map((link, index) => {
                const isActive = location.pathname === link.href
                return (
                    <Link
                        key={index}
                        to={link.href}
                        className={`linksNavigation ${isActive ? 'activeLink' : ''}`}
                    >
                        {link.text}
                    </Link>
                )
            })}
            <hr className="line" />
        </nav>
    )
}
export default Nav
