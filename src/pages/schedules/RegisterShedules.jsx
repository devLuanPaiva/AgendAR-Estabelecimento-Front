import React, { useContext, useState } from 'react'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider'
import { AuthContext } from '../../services/AuthContext'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import './Schedules.scss'
import useAxios from '../../services/useAxios'

const RegisterShedules = () => {
    const { expandedSidebar } = useSidebarContext()
    const { authTokens } = useContext(AuthContext)
    const { id } = authTokens.estabelecimento.estabelecimento
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [shift, setShift] = useState()
    const [dayOfTheWeek, setDayOfTheWeek] = useState()
    const api = useAxios()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('horarios/', {
                horario_fim: endTime,
                horario_inicio: startTime,
                dia_da_semana: dayOfTheWeek,
                estabelecimento: id,
                turno: shift
            })
            if (response.status === 201) {
                setDayOfTheWeek('')
                setEndTime('')
                setShift('')
                setStartTime('')
            }
        } catch (error) {
            console.error('Erro ao cadastrar horário:', error);
            return null;
        }
    }
    const navLinks = [
        { text: 'Atual', href: '/horarios/' },
        { text: 'Cadastrar', href: '/horarios/cadastrar/' },
    ];
    return (
        <React.Fragment>
            <Header textTitle='Horários' textPhrase='Gerencie seus horários comerciais para que seus clientes possam agendar serviços.' />
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainSchedules' : 'collapseMainSchedules'}`}>
                <h2>Cadastrar Horário:</h2>
                <form onSubmit={handleSubmit} className='formSchedules'>
                    <label >Dia da semana:<select
                        id="selectedDay"
                        value={dayOfTheWeek}
                        onChange={e => setDayOfTheWeek(e.target.value)}
                        required>
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
                        required>
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
                    <section className="buttonFormSchedules" >
                        <button type="submit">Cadastrar Horário</button>
                    </section>
                </form>

            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default RegisterShedules
