import React, { useState } from 'react';
import logo from '../../images/logoWhite.png'
// import './Register.scss';
import axios from 'axios';
import Title from '../../components/titles/Title';
import SelectStateAndCity from '../../components/selectStateAndCity/SelectStateAndCity';
import Notification from '../../components/notification/Notification';
import useForm from '../../hooks/useForm';

const Register = () => {
    const [formValues, handleInputChange] = useForm({
        companyName: '',
        zipcode: '',
        street: '',
        district: '',
        email: '',
        contact: '',
        username: '',
        password: '',
    });

    const [selectedCityName, setSelectedCityName] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dados = {
            nome: formValues.companyName,
            cep: formValues.zipcode,
            cidade: selectedCityName,
            estado: selectedState,
            rua: formValues.street,
            bairro: formValues.district,
            email: formValues.email,
            contato: formValues.contact,
            usuario: {
                username: formValues.username,
                password: formValues.password,
            },
        };
        try {
            const response = await axios.post('https://backend-iota-hazel.vercel.app/api/estabelecimento/', dados);
            if (response.status === 201) {
                setMessage('Registrado com sucesso!');
                setTimeout(()=>{setMessage('')}, 5000)
            }
        } catch (error) {
            console.error('Erro ao registrar estabelecimento:', error);
            setErrorMessage(error.response.data.error);
            setTimeout(() => {setErrorMessage('')}, 5000);
        }
    };

    return (
        <main id='mainRegister'>
            <section className="logoSection">
                <figure id='logo'>
                    <img src={logo} alt="logomarca AgendAR" />
                </figure>
                <h1>cadastre sua empresa e impulsione seu crescimento com nosso sistema.
                </h1>
            </section>
            <section className="formRegister">
                <Title color="#000" title="Registrar" />
                {errorMessage && <Notification type="error" message={errorMessage} />}
                {message && <Notification type="success" message={message} />}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome da empresa:<input
                            type="text"
                            required
                            placeholder='Informe o nome da empresa'
                            name='companyName'
                            value={formValues.companyName}
                            onChange={handleInputChange}
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
                            name='zipcode'
                            value={formValues.zipcode}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            required
                            placeholder='Bairro'
                            name='district'
                            value={formValues.district}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            required
                            placeholder='Rua'
                            name='street'
                            value={formValues.street}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Contato:<input
                            type="text"
                            required
                            placeholder='Contato'
                            name='contact'
                            value={formValues.contact}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            required
                            placeholder='E-mail'
                            name='email'
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Informações de autenticação:<input
                            type="text"
                            required
                            placeholder='Usuário'
                            value={formValues.username}
                            name='username'
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            required
                            placeholder='Senha'
                            name='password'
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <section className="buttonSection">
                        <button type='submit' className='btn-blue'>Registrar</button>
                    </section>
                </form>
            </section>
        </main>
    );
};

export default Register;
