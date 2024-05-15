import React, { useContext, useEffect, useState } from 'react'
import { MdDashboard, MdDesignServices } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbClockHour3Filled } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import { AuthContext } from '../../servicos/AuthContext';
import { Link } from 'react-router-dom';
import './Menu.scss'
const Menu = () => {
    const { authTokens, logout } = useContext(AuthContext);
    const { username } = authTokens.estabelecimento.estabelecimento.usuario
    const [telaPequena, setTelaPequena] = useState(false)
    const [menuExpandido, setMenuExpandido] = useState(false);
    const alternarMenu = () => {
        setMenuExpandido(!menuExpandido);
    };
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 930){
                setTelaPequena(true)
                setMenuExpandido(false)
            }else{
                setTelaPequena(false)
                setMenuExpandido(true)
            }

        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <aside className={`${menuExpandido ? 'expandido' : 'recolhido'}`}>
            <h1 className={`${menuExpandido ? 'mostrar' : 'remover'}`}> Ag<span className="sublinarTitulo">end<span className="mudarCor">AR</span>
            </span></h1>
            <nav>
                <Link className='navegacaoMenu' to="/painel/">
                    <abbr title="Painel">
                        <i><MdDashboard /></i>
                    </abbr>
                    <p className={`${menuExpandido ? 'mostrar' : 'remover'}`}>Painel</p>
                </Link>
                <Link className='navegacaoMenu' to="/configuracoes/">
                    <abbr title="Confirugações">
                        <i><IoSettingsSharp /></i>
                    </abbr>
                    <p className={`${menuExpandido ? 'mostrar' : 'remover'}`}>Configurações</p>
                </Link>
                <Link className='navegacaoMenu' to="/servicos/">
                    <abbr title="Serviços">
                        <i><MdDesignServices /></i>
                    </abbr>
                    <p className={`${menuExpandido ? 'mostrar' : 'remover'}`}>Serviços</p>
                </Link>
                <Link className='navegacaoMenu' to="/horarios/">
                    <abbr title="Horários">
                        <i><TbClockHour3Filled /></i>
                    </abbr>
                    <p className={`${menuExpandido ? 'mostrar' : 'remover'}`}>Horários</p>
                </Link>
                <Link className='navegacaoMenu' to="/agendamentos/">
                    <abbr title="Agendamentos">
                        <i><AiFillSchedule /></i>
                    </abbr>
                    <p className={`${menuExpandido ? 'mostrar' : 'remover'}`}>Agendamentos</p>
                </Link>
                <Link className='navegacaoMenu' to="/localizacao/">
                    <abbr title="Localização">
                        <i><FaLocationDot /></i>
                    </abbr>
                    <p className={`${menuExpandido ? 'mostrar' : 'remover'}`}>Localização</p>
                </Link>
            </nav>
            <hr className='linhaMenu' />
            <section className="sair">
                <button onClick={() => logout()}>
                    <abbr title="sair">
                        <CiLogout className='icone' />
                    </abbr>
                </button>
                <div className={`${menuExpandido ? 'mostrar' : 'remover'}`}>
                    <p>{username}</p>
                </div>
            </section>

            <button className={`${telaPequena ? 'removerBotoes' : 'menu-alternado'}`} onClick={alternarMenu}>
                {menuExpandido ?
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

export default Menu
