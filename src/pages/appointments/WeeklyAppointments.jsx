import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import { GrView } from "react-icons/gr";
import { FaTrash, FaUserClock } from "react-icons/fa";
import { MdDesignServices, MdSchedule } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import './Appointments.scss'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../services/AuthContext';
import useAxios from '../../services/useAxios';


const WeeklyAppointments = () => {
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
            const response = await api.get(`agendamentos/semana/?estabelecimento_id=${id}`)
            if (response.status === 200) {
                const sortedAppointments = response.data.sort((a, b) => {
                    return a.horario_selecionado.localeCompare(b.horario_selecionado);
                });
                setListAppointments(sortedAppointments);
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
    const formatDay = (day) => {
        return new Date(day).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
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
    return (
        <React.Fragment>
            <Header textTitle='Agendamentos' textPhrase='Visualize e gerencie os agendamentos do seu estabelecimento.' />
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainAppointments' : 'collapseMainAppointments'}`}>
                <h2>Agendamentos da semana:</h2>
                {listAppointments.length > 0 ?
                    <ul className='listAppointments'>
                        {listAppointments.map((appointment, index) => (
                            <li key={index}>
                                <h3>Agendamento</h3>
                                <p><FaUserClock className='icon' /> {appointment.nome || appointment.cliente.nome}</p>
                                <p><MdDesignServices className='icon' /> {appointment.servico_nome}</p>
                                <p><RiCalendarScheduleLine className='icon' /> {formatDay(appointment.dia_selecionado)} </p>
                                <p><MdSchedule className='icon' /> {formatTime(appointment.horario_selecionado)}</p>

                                <section className="buttons">
                                    <button onClick={() => deleteAppointment(appointment)}><FaTrash className='icon' /></button>
                                    <button><GrView className='icon' /></button>
                                </section>
                            </li>
                        ))}
                    </ul>
                    : <p>Não existe agendamentos para esta semana.</p>
                }
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default WeeklyAppointments
