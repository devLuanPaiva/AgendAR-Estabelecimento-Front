import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../services/AuthContext';
import useAxios from '../../services/useAxios';
import { BsTelephoneFill } from "react-icons/bs";
import { FaTrash, FaUserClock } from "react-icons/fa";
import { MdDesignServices, MdSchedule } from "react-icons/md";
import './Appointments.scss'

const Appointments = () => {
    const { expandedSidebar } = useSidebarContext()
    const { authTokens } = useContext(AuthContext)
    const { id } = authTokens.estabelecimento.estabelecimento
    const [listAppointments, setListAppointments] = useState([])
    const api = useAxios()
    const navLinks = [
        { text: 'Hoje', href: '/agendamentos/' },
        { text: 'Semanais', href: '/agendamentos/semanais' },
        { text: 'Cadastrar', href: '/agendamentos/cadastrar' },
    ];

    const fetchAppointments = useCallback(async () => {
        try {
            const response = await api.get(`agendamentos/hoje/?estabelecimento_id=${id}`)
            if (response.status === 200) {
                
                setListAppointments(response.data);
            }

        } catch (error) {
            console.error('Erro ao obter lista de agendamentos do dia: ', error);
            return null;
        }
    }, [id, api])

    useEffect(() => {
        fetchAppointments()
    }, [fetchAppointments])
    const formatTime = (time) => {
        return time ? time.slice(0, 5) : 'Fechado'
    }

    const deleteAppointment = async (appointment) => {
        let url = ''
        if (appointment.cliente) {
            url = 'clientes'
        }
        else {
            url = 'estabelecimentos'
        }
        try {
            const response = await api.delete(`agendamentos/${url}/${appointment.id}`)
            if (response.status === 204) {
                fetchAppointments()
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            return null;
        }

    }
    const formatPhoneNumber = (contact) => {
        const cleaned = ('' + contact).replace(/\D/g, '');
        const match = RegExp(/^(\d{2})(\d{5})(\d{4})$/).exec(cleaned);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return contact;
    }
    return (
        <React.Fragment>
            <Header textTitle='Agendamentos' textPhrase='Visualize e gerencie os agendamentos do seu estabelecimento.' />
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainAppointments' : 'collapseMainAppointments'}`}>

                <h2>Agendamentos para hoje:</h2>
                {listAppointments.length > 0 ?
                    <ul className='listAppointments'>
                        {listAppointments
                            .toSorted((a, b) => {
                                return new Date('1970/01/01 ' + a.horario_selecionado) - new Date('1970/01/01 ' + b.horario_selecionado);
                            })
                            .map((appointment, index) => (
                                <li key={index}>
                                    <h3>Agendamento</h3>
                                    <p><FaUserClock className='icon' /> {appointment.nome || appointment.cliente.nome}</p>
                                    <p><BsTelephoneFill className='icon' />
                                        {formatPhoneNumber(appointment.contato || appointment.cliente.contato)}</p>
                                    <p><MdDesignServices className='icon' /> {appointment.servico_nome}</p>
                                    <p><MdSchedule className='icon' /> {formatTime(appointment.horario_selecionado)}</p>

                                    <section className="buttons">
                                        <button onClick={() => deleteAppointment(appointment)}><FaTrash className='icon' /></button>

                                    </section>
                                </li>
                            ))}
                    </ul>
                    : <p>Não existe agendamentos para hoje.</p>
                }
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default Appointments
