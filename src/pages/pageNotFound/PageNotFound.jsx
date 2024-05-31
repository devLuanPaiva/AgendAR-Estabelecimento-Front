import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PageNotFound.scss'

const PageNotFound = () => {
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
        <main className='pageNotFound'>
            <h1>Oops!</h1>
            <section>
                <h2>Erro 404 - Página não encontrada.</h2>
                <button onClick={returnPage} className="link-back">Voltar para a página anterior</button>
            </section>
        </main>
    );
}

export default PageNotFound;
