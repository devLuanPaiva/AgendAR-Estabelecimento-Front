import React, { useContext, useState } from 'react'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import { BsTelephoneFill } from "react-icons/bs";
import { FaTrash, FaUserClock } from "react-icons/fa";
import { MdDesignServices, MdSchedule } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import './Appointments.scss'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import useFetch from '../../hooks/useFetch';
import IsLoading from '../../componentes/isLoading/IsLoading';
import { useMutation } from 'react-query';
import Notification from '../../componentes/notification/Notification';

const WeeklyAppointments = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { expandedSidebar } = useSidebarContext()
    const { authTokens } = useContext(AuthContext)
    const { id } = authTokens.estabelecimento.estabelecimento
    const api = useAxios()
    const navLinks = [
        { text: 'Hoje', href: '/agendamentos/' },
        { text: 'Semanais', href: '/agendamentos/semanais' },
        { text: 'Cadastrar', href: '/agendamentos/cadastrar' },
    ];

    const { data: listAppointments, isLoading, refetch } = useFetch(`agendamentos/semana/?estabelecimento_id=${id}`);
    const formatTime = (time) => {
        return time ? time.slice(0, 5) : 'Fechado'
    }
    const formatDay = (day) => {
        const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
        const date = new Date(day);
        date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
        return date.toLocaleDateString('pt-BR', options);
    }
    const formatPhoneNumber = (contact) => {
        const cleaned = ('' + contact).replace(/\D/g, '');
        const match = RegExp(/^(\d{2})(\d{5})(\d{4})$/).exec(cleaned);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return contact;
    }

    const { mutate: deleteAppointment } = useMutation(
        async (appointment) => {
            let url = '';
            if (appointment.cliente) {
                url = 'clientes';
            } else {
                url = 'estabelecimentos';
            }
            const response = await api.delete(`agendamentos/${url}/${appointment.id}`);
            return response.data;
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
            },
        }
    );
    if (isLoading) {
        return <IsLoading />;
    }
    return (
        <React.Fragment>
            <Header textTitle='Agendamentos' textPhrase='Visualize e gerencie os agendamentos do seu estabelecimento.' />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMainAppointments' : 'collapseMainAppointments'}`}>
                <h2>Agendamentos da semana:</h2>
                {listAppointments.length > 0 ?
                    <ul className='listAppointments'>
                        {listAppointments
                            .toSorted((a, b) => {
                                if (a.dia_selecionado !== b.dia_selecionado) {
                                    return new Date(a.dia_selecionado) - new Date(b.dia_selecionado)
                                }
                                return new Date('1970/01/01 ' + a.horario_selecionado) - new Date('1970/01/01 ' + b.horario_selecionado);
                            })
                            .map((appointment, index) => (
                                <li key={index}>
                                    <h3>Agendamento</h3>
                                    <p><FaUserClock className='icon' /> {appointment.nome || appointment.cliente.nome}</p>
                                    <p><BsTelephoneFill className='icon' />
                                        {formatPhoneNumber(appointment.contato || appointment.cliente.contato)}</p>
                                    <p><MdDesignServices className='icon' /> {appointment.servico_nome}</p>
                                    <p><RiCalendarScheduleLine className='icon' /> {formatDay(appointment.dia_selecionado)} </p>
                                    <p><MdSchedule className='icon' /> {formatTime(appointment.horario_selecionado)}</p>

                                    <section className="buttons">
                                        <button onClick={() => deleteAppointment(appointment)}><FaTrash className='icon' /></button>
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
