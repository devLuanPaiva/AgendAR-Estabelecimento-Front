import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider'
import useAxios from '../../hooks/useAxios'
import { useParams } from 'react-router-dom'

const ScheduleEdit = () => {
    const { expandedSidebar } = useSidebarContext();
    const api = useAxios();
    const { idSchedule } = useParams()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [shift, setShift] = useState()
    const [dayOfTheWeek, setDayOfTheWeek] = useState()
    const navLinks = [
        { text: 'Atual', href: '/horarios/' },
        { text: 'Cadastrar', href: '/horarios/cadastrar/' },
        { text: 'Editar', href: `/horarios/editar/${idSchedule}` },

    ];

    const fetchSchedule = useCallback(async () => {
        try {
            const response = await api.get(`horarios/${idSchedule}`);
            if (response.status === 200) {
                setStartTime(response.data.horario_inicio);
                setEndTime(response.data.horario_fim)
                setDayOfTheWeek(response.data.dia_da_semana)
                setShift(response.data.turno)
            }
        } catch (error) {
            console.error('Erro ao obter lista de horários: ', error);
            return null;
        }
    }, [idSchedule, api]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch(`horarios/${idSchedule}/`, {
                horario_fim: endTime,
                horario_inicio: startTime,
            })
            if (response.status === 200) {
                setEndTime('')
                setStartTime('')
            }
        } catch (error) {
            console.error('Erro ao atualizar horário:', error);
            return null;
        }
    }
    return (
        <React.Fragment>
            <Header textTitle='Horários' textPhrase='Gerencie seus horários comerciais para que seus clientes possam agendar serviços.' />
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainSchedules' : 'collapseMainSchedules'}`}>
                <h2>Editar horário:</h2>
                <form onSubmit={handleUpdate} className='formSchedules'>
                <label >Dia da semana:<select
                        id="selectedDay"
                        value={dayOfTheWeek}
                        onChange={e => setDayOfTheWeek(e.target.value)}
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
                    <label>Turno:<select id="selectedShift"
                        value={shift}
                        onChange={e => setShift(e.target.value)}
                        disabled>
                        <option value="">Escolha um turno</option>
                        <option value="MANHA">Manhã</option>
                        <option value="TARDE">Tarde</option>
                        <option value="NOITE">Noite</option>
                    </select>
                    </label>
                    <label >Horário ínicial:<input
                        type="time"
                        name="startTime"
                        value={startTime}
                        required
                        onChange={e => setStartTime(e.target.value)} />
                    </label>
                    <label >Horário final:<input
                        type="time"
                        name="endTime"
                        value={endTime}
                        required
                        onChange={e => setEndTime(e.target.value)} />
                    </label>
                    <section className="buttonFormSchedules" ><button type="submit">Atualizar Horário</button></section>
                </form>

            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default ScheduleEdit
