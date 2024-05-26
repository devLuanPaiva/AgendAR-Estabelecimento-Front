import React from 'react'
import { RiArrowLeftWideLine } from "react-icons/ri";
import { useLocation, useNavigate } from 'react-router-dom';
import './Title.scss'

const Title = (props) => {
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
        <h1 style={{ color: props.color }} id='titleMain'>
            <button onClick={returnPage} style={{ color: props.color }} >
                <abbr title="Voltar">
                    <RiArrowLeftWideLine className='icon' />
                </abbr>
            </button>
            {props.title}
        </h1>
    )
}

export default Title
