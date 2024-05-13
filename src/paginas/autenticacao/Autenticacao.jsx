import axios from 'axios'
import logo from '../../imagens/logo.png'
import './Autenticacao.scss'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../servicos/AuthContext'
import Titulo from '../../componentes/titulos/Titulo'
import { useNavigate } from 'react-router-dom'

const Autenticacao = () => {
    const [usuario, setUsuario] = useState('')
    const { updateTokens } = useContext(AuthContext)
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/token/', {
                username: usuario,
                password: senha,
            });
            const { access, refresh } = response.data;
            
            const estabelecimento = await axios.get('http://127.0.0.1:8000/user-info/', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            updateTokens(access, refresh, estabelecimento.data)

            navigate('/painel')
        }
        catch (error) {
            console.error('Erro ao se autenticar:', error);

        }
    }
    return (
        <main id='mainAutenticacao'>
            <section className="secaoLogo">
                <img src={logo} alt="logomarca AgendAR" />
            </section>
            <section className="secaoFormulario">
                <Titulo cor="#fff" titulo="Autenticação" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuário<input type="text" placeholder='Usuário' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </label>
                    <label>
                        Senha<input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </label>
                    <button type='submit'>Acessar</button>
                </form>
            </section>

        </main>
    )
}

export default Autenticacao