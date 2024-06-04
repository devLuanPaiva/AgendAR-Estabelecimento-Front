import React, { useContext } from 'react'
import { MdDashboard, MdDesignServices } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbClockHour3Filled } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Sidebar.scss'
import { useSidebarContext } from './SidebarProvider';
const Sidebar = () => {
    const { authTokens, logout } = useContext(AuthContext);
    const { username } = authTokens.estabelecimento.estabelecimento.usuario
    const { smallScreen, expandedSidebar, toggleSidebar } = useSidebarContext()

    return (
        <aside className={`${expandedSidebar ? 'expanded' : 'collected'}`}>
            <h1 className={`${expandedSidebar ? 'show' : 'remove'}`}> Ag<span className="underlineTitle">end<span className="changeColor">AR</span>
            </span></h1>
            <nav>
                <Link className='sidebarNavigation' to="/painel/">
                    <abbr title="Painel">
                        <i><MdDashboard /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'show' : 'remove'}`}>Painel</p>
                </Link>
                <Link className='sidebarNavigation' to="/configuracoes/">
                    <abbr title="Confirugações">
                        <i><IoSettingsSharp /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'show' : 'remove'}`}>Configurações</p>
                </Link>
                <Link className='sidebarNavigation' to="/servicos/">
                    <abbr title="Serviços">
                        <i><MdDesignServices /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'show' : 'remove'}`}>Serviços</p>
                </Link>
                <Link className='sidebarNavigation' to="/horarios/">
                    <abbr title="Horários">
                        <i><TbClockHour3Filled /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'show' : 'remove'}`}>Horários</p>
                </Link>
                <Link className='sidebarNavigation' to="/agendamentos/">
                    <abbr title="Agendamentos">
                        <i><AiFillSchedule /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'show' : 'remove'}`}>Agendamentos</p>
                </Link>
                <Link className='sidebarNavigation' to="/localizacao/">
                    <abbr title="Localização">
                        <i><FaLocationDot /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'show' : 'remove'}`}>Localização</p>
                </Link>
            </nav>
            <hr className='line' />
            <section className="exit">
                <button onClick={() => logout()}>
                    <abbr title="Sair">
                        <CiLogout className='icon' />
                    </abbr>
                </button>
                <div className={`${expandedSidebar ? 'show' : 'remove'}`}>
                    <p>{username}</p>
                </div>
            </section>

            <button className={`${smallScreen ? 'removeButtons' : 'sidebarAltenate'}`} onClick={toggleSidebar}>
                {expandedSidebar ?
                    <abbr title="Recolher">
                        <IoMdArrowDropleftCircle className='icon' />
                    </abbr> :
                    <abbr title="Expandir">
                        <IoMdArrowDroprightCircle className='icon' />
                    </abbr>}
            </button>
        </aside>
    )
}

export default Sidebar