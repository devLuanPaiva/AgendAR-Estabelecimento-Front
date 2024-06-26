import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSidebarContext } from '../../components/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
// import './Schedules.scss';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/notification/Notification';
import useFetch from '../../hooks/useFetch';
import IsLoading from '../../components/isLoading/IsLoading';
import { useMutation } from 'react-query';
import useAxios from '../../hooks/useAxios';

const Schedules = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { expandedSidebar } = useSidebarContext();
    const { authTokens } = useContext(AuthContext);
    const { id } = authTokens.estabelecimento.estabelecimento;
    const api = useAxios();
    const navigate = useNavigate();

    const navLinks = [
        { text: 'Atual', href: '/horarios/' },
        { text: 'Cadastrar', href: '/horarios/cadastrar/' },
    ];

    const { data: listSchedules, isLoading, refetch } = useFetch(`horarios/?estabelecimento_id=${id}`);

    const deleteScheduleMutation = useMutation(
        async (scheduleObject) => {
            const scheduleOfDAY = listSchedules.filter(
                schedule => schedule.dia_da_semana === scheduleObject.dia && schedule.horario_inicio === scheduleObject.inicio
            );
            const response = await api.delete(`horarios/${scheduleOfDAY[0].id}/`);
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

    const groupByDayAndShift = (schedules) => {
        if (!Array.isArray(schedules)) return {};
        return schedules.reduce((acc, schedule) => {
            const { dia_da_semana, turno, horario_inicio, horario_fim } = schedule;
            if (!acc[dia_da_semana]) {
                acc[dia_da_semana] = {
                    MANHA: { inicio: "Fechado", fim: "Fechado", dia: dia_da_semana },
                    TARDE: { inicio: "Fechado", fim: "Fechado", dia: dia_da_semana },
                    NOITE: { inicio: "Fechado", fim: "Fechado", dia: dia_da_semana },
                };
            }
            acc[dia_da_semana][turno] = { inicio: horario_inicio, fim: horario_fim, dia: dia_da_semana };
            return acc;
        }, {});
    };
    const groupedSchedules = groupByDayAndShift(listSchedules);
    const dayOrder = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
    const sortedDays = Object.keys(groupedSchedules).sort((a, b) => {
        return dayOrder.indexOf(a) - dayOrder.indexOf(b);
    });

    const editSchedule = (scheduleObject) => {
        const scheduleOfDAY = listSchedules.filter(
            schedule => schedule.dia_da_semana === scheduleObject.dia && schedule.horario_inicio === scheduleObject.inicio
        );
        navigate(`editar/${scheduleOfDAY[0].id}`);
    };

    const formatTime = (time) => {
        return time ? time.slice(0, 5) : 'Fechado';
    };

    const handleDelete = (scheduleObject) => {
        deleteScheduleMutation.mutate(scheduleObject);
    };

    return (
        <React.Fragment>
            <Header textTitle='Horários' textPhrase='Gerencie seus horários comerciais para que seus clientes possam agendar serviços.' />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <h2>Horários cadastrados:</h2>
                {listSchedules.length > 0 ?
                    <ul className="generalList ulSchedules">
                        {sortedDays.map((day, index) => (
                            <li key={index} className='liScheduleOfDay'>
                                <h3 className='captionSchedule'>{day === 'TERCA' ? 'TERÇA' : day === 'SABADO' ? 'SÁBADO' : day}</h3>
                                <section>
                                    <article className='articleSchedules'>
                                        <p>
                                            <abbr title="Manhã">M</abbr>: {
                                                groupedSchedules[day].MANHA.inicio !== "Fechado" ?
                                                    `${formatTime(groupedSchedules[day].MANHA.inicio)} às ${formatTime(groupedSchedules[day].MANHA.fim)}` : 'Fechado'}
                                        </p>
                                        {groupedSchedules[day].MANHA.inicio !== "Fechado" &&
                                            <div className="buttonsSchedule">
                                                <button onClick={() => editSchedule(groupedSchedules[day].MANHA)}>
                                                    <MdEdit className='icon' />
                                                </button>
                                                <button onClick={() => handleDelete(groupedSchedules[day].MANHA)}>
                                                    <FaTrash className='icon' />
                                                </button>
                                            </div>
                                        }
                                    </article>
                                    <article className='articleSchedules'>
                                        <p>
                                            <abbr title="Tarde">T</abbr>: {
                                                groupedSchedules[day].TARDE.inicio !== "Fechado" ?
                                                    `${formatTime(groupedSchedules[day].TARDE.inicio)} às ${formatTime(groupedSchedules[day].TARDE.fim)}` : 'Fechado'}
                                        </p>
                                        {groupedSchedules[day].TARDE.inicio !== "Fechado" &&
                                            <div className="buttonsSchedule">
                                                <button onClick={() => editSchedule(groupedSchedules[day].TARDE)}>
                                                    <MdEdit className='icon' />
                                                </button>
                                                <button onClick={() => handleDelete(groupedSchedules[day].TARDE)}>
                                                    <FaTrash className='icon' />
                                                </button>
                                            </div>
                                        }
                                    </article>
                                    <article className='articleSchedules'>
                                        <p>
                                            <abbr title="Noite">N</abbr>: {
                                                groupedSchedules[day].NOITE.inicio !== "Fechado" ?
                                                    `${formatTime(groupedSchedules[day].NOITE.inicio)} às ${formatTime(groupedSchedules[day].NOITE.fim)}` : 'Fechado'}
                                        </p>
                                        {groupedSchedules[day].NOITE.inicio !== "Fechado" &&
                                            <div className="buttonsSchedule">
                                                <button onClick={() => editSchedule(groupedSchedules[day].NOITE)}>
                                                    <MdEdit className='icon' />
                                                </button>
                                                <button onClick={() => handleDelete(groupedSchedules[day].NOITE)}>
                                                    <FaTrash className='icon' />
                                                </button>
                                            </div>
                                        }
                                    </article>
                                </section>
                            </li>
                        ))}
                    </ul>
                    : <p>Não existe horários cadastrados.</p>
                }
            </main>
            <Sidebar />
        </React.Fragment>
    );
};

export default Schedules;
