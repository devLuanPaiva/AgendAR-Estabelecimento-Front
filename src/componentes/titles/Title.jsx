import React from 'react'
import { RiArrowLeftWideLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './Title.scss'

const Title = (props) => {
    const navigate = useNavigate()
    const returnPage = () => {
        navigate(-1)
    }
    return (
        <h1 style={{ color: props.color }} id='tituloPrincipal'>
            <button onClick={returnPage} style={{ color: props.color }} >
                <abbr title="Voltar">
                    <RiArrowLeftWideLine className='icone'/>
                </abbr>
            </button>
            {props.title}
        </h1>
    )
}

export default Title
