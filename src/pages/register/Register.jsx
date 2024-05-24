import React, { useState } from 'react'
import logo from '../../imagens/logo.png'
import './Register.scss'
import axios from 'axios';
import Title from '../../componentes/titles/Title';
import SelectStateAndCity from '../../componentes/selectStateAndCity/SelectStateAndCity';

const Register = () => {
    const [companyName, setCompanyName] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [selectedCityName, setSelectedCityName] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dados = {
            nome: companyName,
            cep: zipcode,
            cidade: selectedCityName,
            estado: selectedState,
            rua: street,
            bairro: district,
            email: email,
            contato: contact,
            usuario: {
                username: username,
                password: password,
            },
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/estabelecimento/', dados);
            console.log(response.data);
            if (response.status === 201) {
                setCompanyName('');
                setZipcode('');
                setStreet('');
                setDistrict('');
                setEmail('');
                setContact('');
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Erro ao registrar estabelecimento:', error);

        }
    }
    return (
        <main id='mainRegister'>
            <section className="logoSection">
                <img src={logo} alt="AgendAR logo" />
            </section>
            <section className="formSection">
                <Title color="#fff" title="Registrar" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome da empresa:<input
                            type="text"
                            required
                            placeholder='Informe o nome da empresa'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </label>
                    <label>
                        Endereço:
                        <SelectStateAndCity
                            selectedCityName={selectedCityName}
                            selectedState={selectedState}
                            setSelectedCityName={setSelectedCityName}
                            setSelectedState={setSelectedState}
                        />
                        <input
                            type="text"
                            required
                            placeholder='CEP'
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                        /> <input
                            type="text"
                            required
                            placeholder='Bairro'
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        /><input
                            type="text"
                            required
                            placeholder='Rua'
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </label>
                    <label >
                        Contato:<input
                            type="text"
                            required
                            placeholder='Contato'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /><input
                            type="password"
                            required
                            placeholder='Senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="buttonSection">
                        <button type='submit'>Registrar</button>
                    </div>
                </form>
            </section>

        </main>

    )
}

export default Register