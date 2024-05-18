import React, { useContext, useEffect, useState } from 'react'
import './Services.scss'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider'
import api from '../../services/api'
import { FaTrash } from "react-icons/fa";
import { AuthContext } from '../../services/AuthContext'

const Services = () => {
  const { expandedSidebar } = useSidebarContext()
  const { authTokens } = useContext(AuthContext)
    const { id } = authTokens.estabelecimento.estabelecimento
  const [listServices, setListServices] = useState([])
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(`servicos/?estabelecimento_id=${id}`)
        if (response.status === 200) {
          setListServices(response.data)
        }
      } catch (error) {
        console.error('Erro ao obter lista de serviços:', error);
        return null;
      }
    }
    fetchServices()
  }, [])

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
        <ul className='listServices'>
          {listServices.map((servico, index) => (
            <li key={index}>
              <h3>{servico.nome}</h3>
              <p>{servico.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
              <button><FaTrash className='icon'/></button>
            </li>
          ))}
        </ul>
      </main>
      <Sidebar />
    </React.Fragment>
  )
}

export default Services
