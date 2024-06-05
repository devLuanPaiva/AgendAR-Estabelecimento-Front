import React, { useContext, useState } from 'react'
// import './Services.scss'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import Sidebar from '../../components/sidebar/Sidebar'
import { useSidebarContext } from '../../components/sidebar/SidebarProvider'
import { FaTrash } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext'
import Notification from '../../components/notification/Notification'
import useFetch from '../../hooks/useFetch'
import { useMutation } from 'react-query'
import useAxios from '../../hooks/useAxios'
import IsLoading from '../../components/isLoading/IsLoading'

const Services = () => {
  const api = useAxios()
  const { expandedSidebar } = useSidebarContext()
  const { authTokens } = useContext(AuthContext)
  const { id } = authTokens.estabelecimento.estabelecimento
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const { data: listServices, isLoading, refetch } = useFetch(`servicos/?estabelecimento_id=${id}`);

  const deleteServiceMutation = useMutation(
    async (id) => {
      const response = await api.delete(`servicos/${id}/`);
      return response;
    },
    {
      onSuccess: () => {
        setMessage('Deletado com sucesso!');
        setTimeout(() => {
          setMessage('');
        }, 3000);
        refetch();
      },
      onError: (error) => {
        console.error('Erro ao deletar:', error);
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  );
  if (isLoading) {
    return <IsLoading />;
  }

  const handleDelete = (id) => {
    deleteServiceMutation.mutate(id);
  };

  const navLinks = [
    { text: 'Atual', href: '/servicos/' },
    { text: 'Cadastrar', href: '/servicos/cadastrar/' },
  ];

  return (
    <React.Fragment>
      <Header textTitle='Serviços' textPhrase='Gerencie os serviços oferecidos pelo seu estabelecimento.' />
      <Nav links={navLinks} />
      {errorMessage && <Notification type="error" message={errorMessage} />}
      {message && <Notification type="success" message={message} />}
      <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>

        <h2>Serviços cadastrados:</h2>
        {listServices.length > 0 ?
          <ul className='generalList listServices '>
            {listServices.map((servico, index) => (
              <li className='generalLi' key={index}>
                <h3>{servico.nome}</h3>
                <div className="valueAndTrash">
                  <p>{servico.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                  <button onClick={() => handleDelete(servico.id)}><FaTrash className='icon' /></button>
                </div>
              </li>
            ))}
          </ul>
          : <p>Não existe serviços cadastrados.</p>
        }
      </main>
      <Sidebar />
    </React.Fragment>
  )
}

export default Services
