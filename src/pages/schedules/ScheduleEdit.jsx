import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Notification from '../../componentes/notification/Notification';

const ScheduleEdit = () => {
    const { expandedSidebar } = useSidebarContext();
    const api = useAxios();
    const { idSchedule } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [formValues, handleInputChange, setFormValues] = useForm({ startTime: '', endTime: '', shift: '', dayOfTheWeek: '' });
    const navLinks = [
        { text: 'Atual', href: '/horarios/' },
        { text: 'Cadastrar', href: '/horarios/cadastrar/' },
        { text: 'Editar', href: `/horarios/editar/${idSchedule}` },
    ];

    const fetchSchedule = useCallback(async () => {
        try {
            const response = await api.get(`horarios/${idSchedule}`);
            if (response.status === 200) {
                setFormValues({
                    startTime: response.data.horario_inicio,
                    endTime: response.data.horario_fim,
                    dayOfTheWeek: response.data.dia_da_semana,
                    shift: response.data.turno,
                });
            }
        } catch (error) {
            console.error('Erro ao obter lista de horários: ', error);
        }
    }, [idSchedule, api, setFormValues]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const startTime = formValues.startTime.slice(0, 5);
            const endTime = formValues.endTime.slice(0, 5);
            const response = await api.patch(`horarios/${idSchedule}/`, {
                horario_fim: endTime,
                horario_inicio: startTime,
                dia_da_semana: formValues.dayOfTheWeek,
                turno: formValues.shift,
            });

            if (response.status === 200) {
                setMessage('Atualizado com sucesso!');
                setTimeout(() => {
                    setMessage('');
                }, 3000);

            }
        } catch (error) {
            console.error('Erro ao atualizar horário:', error);
            setErrorMessage(error.response.data);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <React.Fragment>
            <Header textTitle='Horários' textPhrase='Gerencie seus horários comerciais para que seus clientes possam agendar serviços.' />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMainSchedules' : 'collapseMainSchedules'}`}>
                <h2>Editar horário:</h2>
                <form onSubmit={handleUpdate} className='formSchedules'>
                    <label>Dia da semana:
                        <select
                            id="selectedDay"
                            value={formValues.dayOfTheWeek}
                            name='dayOfTheWeek'
                            onChange={handleInputChange}
                            disabled>
                            <option value="">Escolha um dia</option>
                            <option value="SEGUNDA">Segunda</option>
                            <option value="TERCA">Terça</option>
                            <option value="QUARTA">Quarta</option>
                            <option value="QUINTA">Quinta</option>
                            <option value="SEXTA">Sexta</option>
                            <option value="SABADO">Sabádo</option>
                            <option value="DOMINGO">Domingo</option>
                        </select>
                    </label>
                    <label>Turno:
                        <select id="selectedShift"
                            value={formValues.shift}
                            onChange={handleInputChange}
                            name='shift'
                            disabled>
                            <option value="">Escolha um turno</option>
                            <option value="MANHA">Manhã</option>
                            <option value="TARDE">Tarde</option>
                            <option value="NOITE">Noite</option>
                        </select>
                    </label>
                    <label>Horário ínicial:
                        <input
                            type="time"
                            name="startTime"
                            value={formValues.startTime}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>Horário final:
                        <input
                            type="time"
                            name="endTime"
                            value={formValues.endTime}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <section className="buttonFormSchedules">
                        <button type="submit">Atualizar Horário</button>
                    </section>
                </form>
            </main>
            <Sidebar />
        </React.Fragment>
    );
}

export default ScheduleEdit;
