import axios from 'axios'
import logo from '../../imagens/logo.png'
import './Authentication.scss'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../services/AuthContext'
import Title from '../../componentes/titles/Title'
import { useNavigate } from 'react-router-dom'

const Authentication = () => {
    const [username, setUsername] = useState('')
    const { updateTokens, logout} = useContext(AuthContext)
    const [password, setPassword] = useState('')
    useEffect(() => {
        const handleLogout = () => {
            logout();
        };
        handleLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/token/', {
                username: username,
                password: password,
            });
            const { access, refresh } = response.data;

            const establishment = await axios.get('http://127.0.0.1:8000/user-info/', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            updateTokens(access, refresh, establishment.data)

            navigate('/painel')
        }
        catch (error) {
            console.error('Erro ao se autenticar:', error);

        }
    }
    return (
        <main id='mainAuthentication'>
            <section className="logoSection">
                <img src={logo} alt="logomarca AgendAR" />
            </section>
            <section className="formSection">
                <Title color="#fff" title="Autenticação" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuário<input type="text" placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Senha<input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className="button">
                        <button type='submit'>Acessar</button>
                    </div>
                </form>
            </section>

        </main>
    )
}

export default Authentication