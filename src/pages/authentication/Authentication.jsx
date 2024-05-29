import axios from 'axios'
import logo from '../../images/logoOnBookAndMobile.png'
import './Authentication.scss'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Title from '../../componentes/titles/Title'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../../componentes/notification/Notification'
import useForm from '../../hooks/useForm'

const Authentication = () => {
    const { updateTokens, logout } = useContext(AuthContext)
    const [formValues, handleInputChange] = useForm({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('');
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
                username: formValues.username,
                password: formValues.password,
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
            setErrorMessage(error.response.data.detail);
        }
    }
    return (


        <main id='mainAuthentication'>
            <section className="logoSection">
                <img src={logo} alt="logomarca AgendAR" />
            </section>
            <section className="formSection">
                <Title color="#fff" title="Autenticação" />
                {errorMessage && <Notification type="error" message={errorMessage} />}
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuário<input
                            type="text"
                            placeholder='Usuário'
                            required
                            value={formValues.username}
                            onChange={handleInputChange}
                            name='username'
                        />
                    </label>
                    <label>
                        Senha<input
                            type="password"
                            placeholder='Senha'
                            required
                            value={formValues.password}
                            onChange={handleInputChange}
                            name='password'
                        />
                    </label>
                    <section className="buttonSection">
                        <button type='submit'>Acessar</button>
                        <p>Não tem uma conta? <Link id='linkAuthentication' to='/registrarEstabelecimento'>Registre-se aqui</Link></p>
                    </section>
                </form>
            </section>

        </main>
    )
}

export default Authentication