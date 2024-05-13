import React from 'react'
import { RiArrowLeftWideLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './Titulo.scss'

const Titulo = (props) => {
    const navigate = useNavigate()
    const voltarPagina = () => {
        navigate(-1)
    }
    return (
        <h1 style={{ color: props.cor }} id='tituloPrincipal'>
            <button onClick={voltarPagina} style={{ color: props.cor }} >
                <RiArrowLeftWideLine className='icone'/>
            </button>
            {props.titulo}
        </h1>
    )
}

export default Titulo
