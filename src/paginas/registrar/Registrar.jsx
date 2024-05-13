import React, { useState } from 'react'
import logo from '../../imagens/logo.png'
import './Registrar.scss'
import axios from 'axios';
import SelecionarEstado from '../../componentes/selecionarEstado/SelecionarEstado';
import Titulo from '../../componentes/titulos/Titulo';

const Registrar = () => {
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numeroEndereco, setNumeroEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [contato, setContato] = useState('');
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [municipioSelecionadoNome, setMunicipioSelecionadoNome] = useState('');
    const [ufSelecionada, setUfSelecionada] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dados = {
            nome: nomeEmpresa,
            cep: cep,
            cidade: municipioSelecionadoNome,
            estado: ufSelecionada,
            rua: rua,
            bairro: bairro,
            numeroEndereco: numeroEndereco,
            email: email,
            contato: contato,
            usuario: {
                username: usuario,
                password: senha,
            },
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/estabelecimento/', dados);
            console.log(response.data);
            if (response.status === 201) {
                setNomeEmpresa('');
                setCep('');
                setRua('');
                setBairro('');
                setNumeroEndereco('');
                setEmail('');
                setContato('');
                setUsuario('');
                setSenha('');
            }
        } catch (error) {
            console.error('Erro ao registrar estabelecimento:', error);

        }
    }
    return (
        <main id='mainRegistrar'>
            <section className="secaoLogo">
                <img src={logo} alt="logomarca AgendAR" />
            </section>
            <section className="secaoFormulario">
                <Titulo cor="#fff" titulo="Registrar" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome da empresa:<input
                            type="text"
                            required
                            placeholder='Informe o nome da empresa'
                            value={nomeEmpresa}
                            onChange={(e) => setNomeEmpresa(e.target.value)}
                        />
                    </label>
                    <label>
                        Endereço:
                        <SelecionarEstado
                            municipioSelecionadoNome={municipioSelecionadoNome}
                            ufSelecionada={ufSelecionada}
                            setMunicipioSelecionadoNome={setMunicipioSelecionadoNome}
                            setUfSelecionada={setUfSelecionada}
                        />


                        <input
                            type="text"
                            required
                            placeholder='CEP'
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        /> <input
                            type="text"
                            required
                            placeholder='Bairro'
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                        /><input
                            type="text"
                            required
                            placeholder='Rua'
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                        /><input
                            type="text"
                            required
                            placeholder='Nº'
                            value={numeroEndereco}
                            onChange={(e) => setNumeroEndereco(e.target.value)}
                        />
                    </label>
                    <label >
                        Contato:<input
                            type="text"
                            required
                            placeholder='Contato'
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                        /><input
                            type="email"
                            required
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label >
                        Informações de autenticação:<input
                            type="text"
                            required
                            placeholder='Usuário'
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        /><input
                            type="password"
                            required
                            placeholder='Senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </label>
                    <button type="submit">Registrar</button>
                </form>
            </section>

        </main>

    )
}

export default Registrar