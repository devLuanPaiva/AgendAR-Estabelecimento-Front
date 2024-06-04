import React, { useContext, useState, useEffect } from 'react';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import './Settings.scss'
import Notification from '../../componentes/notification/Notification';

const Settings = () => {
  const api = useAxios();
  const { expandedSidebar } = useSidebarContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const { authTokens, updateTokens } = useContext(AuthContext);
  const { access, refresh } = authTokens;

  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    email: '',
    contato: '',
    usuario: {
      id: '',
      username: '',
      password: ''
    }
  });

  useEffect(() => {
    if (authTokens && authTokens.estabelecimento && authTokens.estabelecimento.estabelecimento) {
      setFormData({
        id: authTokens.estabelecimento.estabelecimento.id,
        nome: authTokens.estabelecimento.estabelecimento.nome,
        email: authTokens.estabelecimento.estabelecimento.email,
        contato: authTokens.estabelecimento.estabelecimento.contato,
        usuario: {
          id: authTokens.estabelecimento.estabelecimento.usuario.id,
          username: authTokens.estabelecimento.estabelecimento.usuario.username,
          password: ''
        }
      });
    }
  }, [authTokens, setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevState) => ({
        ...prevState,
        usuario: {
          ...prevState.usuario,
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      setErrorMessage('Os dados do estabelecimento não estão disponíveis.');
      return;
    }
    try {
      const response = await api.patch(`estabelecimento/${formData.id}/`, formData);
      if (response.status === 200) {
        setMessage('Informações atualizadas com sucesso!');
        const establishment = await api.get('user-info/');
        updateTokens(access, refresh, establishment.data);
      }
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      setErrorMessage(error.response?.data || 'Erro ao atualizar informações');
    }
  };

  const navLinks = [
    { text: 'Atual', href: '/configuracoes/' },
  ];

  return (
    <React.Fragment>
      <Header textTitle='Configurações' textPhrase='Atualize suas informações de cadastro.' />
      <Nav links={navLinks} />
      {errorMessage && <Notification type="error" message={errorMessage} />}
      {message && <Notification type="success" message={message} />}
      <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
        <h2>Atualize suas informações:</h2>
        <form onSubmit={handleSubmit} className='formSettings'>
          <label>Nome<input
            value={formData.nome}
            onChange={handleInputChange}
            name='nome'
            placeholder='Informe o novo nome'
            type="text"
          /></label>
          <label>E-mail<input
            value={formData.email}
            onChange={handleInputChange}
            name='email'
            placeholder='Informe o novo email'
            type="email"
          /></label>
          <label>Contato<input
            value={formData.contato}
            onChange={handleInputChange}
            name='contato'
            placeholder='Informe o novo contato'
            type="tel"
          /></label>
          <label>Usuário<input
            value={formData.usuario.username}
            onChange={handleUserChange}
            name='username'
            placeholder='Informe o novo usuário'
            type="text"
          /></label>
          <label>Senha<input
            value={formData.usuario.password}
            onChange={handleUserChange}
            name='password'
            placeholder='Informe a nova senha'
            type="password"
          /></label>
          <section className="buttonFormSettings"><button type="submit">Salvar</button></section>
        </form>
      </main>
      <Sidebar />
    </React.Fragment>
  );
};

export default Settings;
