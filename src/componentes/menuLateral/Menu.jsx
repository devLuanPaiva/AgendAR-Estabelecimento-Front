import React, { useContext } from 'react'
import { MdDashboard, MdDesignServices } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbClockHour3Filled } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from '../../servicos/AuthContext';
import { Link } from 'react-router-dom';
const Menu = () => {
    const { authTokens, logout } = useContext(AuthContext);
    const { username } = authTokens.estabelecimento.estabelecimento.usuario
    const { email } = authTokens.estabelecimento.estabelecimento
    return (
        <aside>
            <h1>Ag<span className="sublinarTitulo">end<span className="mudarCor">AR</span>
            </span></h1>
            <nav>
                <Link to="/painel/">
                    <abbr title="Painel">
                        <i><MdDashboard /></i>
                    </abbr>
                    <p>Painel</p>
                </Link>
                <Link to="/configuracoes/">
                    <abbr title="Confirugações">
                        <i><IoSettingsSharp /></i>
                    </abbr>
                    <p>Configurações</p>
                </Link>
                <Link to="/servicos/">
                    <abbr title="Serviços">
                        <i><MdDesignServices /></i>
                    </abbr>
                    <p>Serviços</p>
                </Link>
                <Link to="/horarios/">
                    <abbr title="Horários">
                        <i><TbClockHour3Filled /></i>
                    </abbr>
                    <p>Horários</p>
                </Link>
                <Link to="/agendamentos/">
                    <abbr title="Agendamentos">
                        <i><AiFillSchedule /></i>
                    </abbr>
                    <p>Agendamentos</p>
                </Link>
                <Link to="/localizacao/">
                    <abbr title="Localização">
                        <i><FaLocationDot /></i>
                    </abbr>
                    <p>Localização</p>
                </Link>
            </nav>
            <hr />
            <div className="logout">
                <button onClick={()=> logout()}>
                    <abbr title="Sair">
                        <i><CiLogout /></i>
                    </abbr>
                </button>
                <p>{username}</p>
                <p>{email}</p>
            </div>
        </aside>
    )
}

export default Menu
