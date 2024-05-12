import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../servicos/AuthContext'

const Autenticacao = () => {
    const [usuario, setUsuario] = useState('')
    const {updateTokens} = useContext(AuthContext)
    const [senha, setSenha] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/token/', {
                username: usuario,
                password: senha,
            });
            const { access, refresh } = response.data;
            updateTokens(access, refresh)
        }
        catch (error) {
            console.error('Erro ao se autenticar:', error);

        }
    }
    return (
        <>
            <aside></aside>
            <main>
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuário<input type="text" placeholder='Usuário' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </label>
                    <label>
                        Senha<input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </label>
                    <button type='submit'>Acessar</button>
                </form>
            </main>
        </>
    )
}

export default Autenticacao
