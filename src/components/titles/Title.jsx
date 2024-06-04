import React from 'react'
import { RiArrowLeftWideLine } from "react-icons/ri";
import { useLocation, useNavigate } from 'react-router-dom';
import './Title.scss'

const Title = ({color, title}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const returnPage = () => {
        if (location.pathname === '/autenticacao') {
            navigate('/')
        } else {
            navigate(-1)
        }
    }
    return (
        <h1 style={{ color: color }} id='titleMain'>
            <button onClick={returnPage} style={{ color: color }} >
                <abbr title="Voltar">
                    <RiArrowLeftWideLine className='icon' />
                </abbr>
            </button>
            {title}
        </h1>
    )
}

export default Title
