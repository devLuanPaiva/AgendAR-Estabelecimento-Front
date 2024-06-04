import axios from 'axios'
import logo from '../../images/logoWhite.png'
import './Authentication.scss'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Title from '../../componentes/titles/Title'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../../componentes/notification/Notification'
import useForm from '../../hooks/useForm'
import { FaRegUser, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Authentication = () => {
    const { updateTokens, logout } = useContext(AuthContext)
    const [formValues, handleInputChange] = useForm({ username: '', password: '' })
    const [toggleButton, setToggleButton] = useState(false)
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
            const response = await axios.post('http://3.233.229.141:8000/token/', {
                username: formValues.username,
                password: formValues.password,
            });
            const { access, refresh } = response.data;

            const establishment = await axios.get('http://3.233.229.141:8000/user-info/', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            updateTokens(access, refresh, establishment.data)

            navigate('/painel')
        }
        catch (error) {
            console.error('Erro ao se autenticar:', error);
            if(error.response.data.detail === 'No active account found with the given credentials'){
                setErrorMessage('Nenhuma conta ativa encontrada com as credenciais fornecidas');
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            }
        }
    }

    const changeButton = () => {
        setToggleButton(!toggleButton)
    }

    return (
        <main id='mainAuthentication'>
            <section className="logoSection">
                <figure id='logo'>
                    <img src={logo} alt="logomarca AgendAR" />
                    </figure>
                <h1>bem vindo de volta!</h1>
            </section>
            <section className="formAuthentication">
                <Title color="#000" title="Autenticação" />
                {errorMessage && <Notification type="error" message={errorMessage} />}
                <form onSubmit={handleSubmit}>
                    <section className="credentials">
                        <label className="inputContainer">
                            <FaRegUser className='iconLeft' />
                            <input
                                type="text"
                                placeholder='Usuário'
                                required
                                value={formValues.username}
                                onChange={handleInputChange}
                                name='username'
                            />
                        </label>
                        <label className="inputContainer">
                            <RiLockPasswordLine className='iconLeft' />
                            <input
                                type={!toggleButton ? 'password' : 'text'}
                                placeholder='Senha'
                                required
                                value={formValues.password}
                                onChange={handleInputChange}
                                name='password'
                            />
                            <button type='button' onClick={changeButton}>
                                {!toggleButton ? <MdOutlineRemoveRedEye className='iconRight' /> : <FaRegEyeSlash className='iconRight' />}
                            </button>
                        </label>
                    </section>
                    <section className="buttonSection">
                        <Link to={'/'} className='forgotPassword'>Esqueceu a senha?</Link>
                        <button type='submit'>Acessar</button>
                        <p>Não tem uma conta? <Link id='linkAuthentication' to='/registrarEstabelecimento'>Registre-se aqui</Link></p>
                    </section>
                </form>
            </section>
        </main>
    )
}

export default Authentication
