import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Services.scss'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider'
import { FaTrash } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext'
import useAxios from '../../hooks/useAxios'

const Services = () => {
  const { expandedSidebar } = useSidebarContext()
  const { authTokens } = useContext(AuthContext)
  const { id } = authTokens.estabelecimento.estabelecimento
  const [listServices, setListServices] = useState([])
  const api = useAxios()

  const deleteService = async (id) => {
    try {
      const response = await api.delete(`servicos/${id}/`)
      if (response.status === 204) {
        fetchServices()
      }

    } catch (error) {
      console.error('Erro ao deletar:', error);
      return null;
    }
  }
  const fetchServices = useCallback(async () => {
    try {
      const response = await api.get(`servicos/?estabelecimento_id=${id}`)
      if (response.status === 200) {
        setListServices(response.data)
      }
    } catch (error) {
      console.error('Erro ao obter lista de serviços:', error);
      return null;
    }
  }, [id, api])
  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const navLinks = [
    { text: 'Atual', href: '/servicos/' },
    { text: 'Cadastrar', href: '/servicos/cadastrar/' },
  ];
  return (
    <React.Fragment>
      <Header textTitle='Serviços' textPhrase='Gerencie os serviços oferecidos pelo seu estabelecimento.' />
      <Nav links={navLinks} />
      <main className={`${!expandedSidebar ? 'expandMainServices' : 'collapseMainServices'}`}>

        <h2>Serviços cadastrados:</h2>
        {listServices.length > 0 ?
          <ul className='listServices'>
            {listServices.map((servico, index) => (
              <li key={index}>
                <h3>{servico.nome}</h3>
                <div className="valueAndTrash">
                  <p>{servico.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                  <button onClick={() => deleteService(servico.id)}><FaTrash className='icon' /></button>
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
