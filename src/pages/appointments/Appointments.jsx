import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSidebarContext } from '../../components/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaTrash, FaUserClock } from 'react-icons/fa';
import { MdDesignServices, MdSchedule } from 'react-icons/md';
// import './Appointments.scss';
import IsLoading from '../../components/isLoading/IsLoading';
import useFetch from '../../hooks/useFetch';
import { useMutation } from 'react-query';
import Notification from '../../components/notification/Notification';
const Appointments = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { expandedSidebar } = useSidebarContext();
    const { authTokens } = useContext(AuthContext);
    const { id } = authTokens.estabelecimento.estabelecimento;
    const api = useAxios();
    const navLinks = [
        { text: 'Hoje', href: '/agendamentos/' },
        { text: 'Semanais', href: '/agendamentos/semanais' },
        { text: 'Cadastrar', href: '/agendamentos/cadastrar' },
    ];
    const { data: listAppointments = [], isLoading, refetch } = useFetch(`agendamentos/hoje/?estabelecimento_id=${id}`);

    const formatTime = (time) => {
        return time ? time.slice(0, 5) : 'Fechado';
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
    const formatPhoneNumber = (contact) => {
        const cleaned = ('' + contact).replace(/\D/g, '');
        const match = RegExp(/^(\d{2})(\d{5})(\d{4})$/).exec(cleaned);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return contact;
    };

    return (
        <React.Fragment>
            <Header textTitle="Agendamentos" textPhrase="Visualize e gerencie os agendamentos do seu estabelecimento." />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <h2>Agendamentos para hoje:</h2>
                {listAppointments.length > 0 ? (
                    <ul className="generalList listAppointments">
                        {listAppointments
                            .toSorted((a, b) => {
                                return new Date('1970/01/01 ' + a.horario_selecionado) - new Date('1970/01/01 ' + b.horario_selecionado);
                            })
                            .map((appointment, index) => (
                                <li className='generalLi liAppointments' key={index}>
                                    <h3>Agendamento</h3>
                                    <p>
                                        <FaUserClock className="icon" /> {appointment.nome || appointment.cliente.nome}
                                    </p>
                                    <p>
                                        <BsTelephoneFill className="icon" />
                                        {formatPhoneNumber(appointment.contato || appointment.cliente.contato)}
                                    </p>
                                    <p>
                                        <MdDesignServices className="icon" /> {appointment.servico_nome}
                                    </p>
                                    <p>
                                        <MdSchedule className="icon" /> {formatTime(appointment.horario_selecionado)}
                                    </p>
                                    <section className="buttons">
                                        <button onClick={() => deleteAppointment(appointment)}>
                                            <FaTrash className="icon" />
                                        </button>
                                    </section>
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>Não existe agendamentos para hoje.</p>
                )}
            </main>
            <Sidebar />
        </React.Fragment>
    );
};

export default Appointments;
