import React, { useContext} from 'react'
import { MdDashboard, MdDesignServices } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbClockHour3Filled } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import { AuthContext } from '../../services/AuthContext';
import { Link } from 'react-router-dom';
import './Sidebar.scss'
import { useSidebarContext } from './SidebarProvider';
const Sidebar = () => {
    const { authTokens, logout } = useContext(AuthContext);
    const { username } = authTokens.estabelecimento.estabelecimento.usuario
    const {smallScreen, expandedSidebar, toggleSidebar} = useSidebarContext()

    return (
        <aside className={`${expandedSidebar ? 'expandido' : 'recolhido'}`}>
            <h1 className={`${expandedSidebar ? 'mostrar' : 'remover'}`}> Ag<span className="sublinarTitulo">end<span className="mudarCor">AR</span>
            </span></h1>
            <nav>
                <Link className='navegacaoMenu' to="/painel/">
                    <abbr title="Painel">
                        <i><MdDashboard /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>Painel</p>
                </Link>
                <Link className='navegacaoMenu' to="/configuracoes/">
                    <abbr title="Confirugações">
                        <i><IoSettingsSharp /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>Configurações</p>
                </Link>
                <Link className='navegacaoMenu' to="/servicos/">
                    <abbr title="Serviços">
                        <i><MdDesignServices /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>Serviços</p>
                </Link>
                <Link className='navegacaoMenu' to="/horarios/">
                    <abbr title="Horários">
                        <i><TbClockHour3Filled /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>Horários</p>
                </Link>
                <Link className='navegacaoMenu' to="/agendamentos/">
                    <abbr title="Agendamentos">
                        <i><AiFillSchedule /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>Agendamentos</p>
                </Link>
                <Link className='navegacaoMenu' to="/localizacao/">
                    <abbr title="Localização">
                        <i><FaLocationDot /></i>
                    </abbr>
                    <p className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>Localização</p>
                </Link>
            </nav>
            <hr className='linhaMenu' />
            <section className="sair">
                <button onClick={() => logout()}>
                    <abbr title="sair">
                        <CiLogout className='icone' />
                    </abbr>
                </button>
                <div className={`${expandedSidebar ? 'mostrar' : 'remover'}`}>
                    <p>{username}</p>
                </div>
            </section>

            <button className={`${smallScreen ? 'removerBotoes' : 'menu-alternado'}`} onClick={toggleSidebar}>
                {expandedSidebar ?
                    <abbr title="Recolher">
                        <IoMdArrowDropleftCircle className='icone' />
                    </abbr> :
                    <abbr title="Expandir">
                        <IoMdArrowDroprightCircle className='icone' />
                    </abbr>}
            </button>
        </aside>
    )
}

export default Sidebar
