import React, { useContext, useState } from 'react';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../services/AuthContext';
import useAxios from '../../services/useAxios';
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import './Appointments.scss';
import useFetch from '../../services/useFetch';

const RegisterAppointment = () => {
    const [nameClient, setNameClient] = useState('');
    const [contactClient, setContactClient] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState(null); 

    const { expandedSidebar } = useSidebarContext();
    const { authTokens } = useContext(AuthContext);
    const { id } = authTokens.estabelecimento.estabelecimento;
    const api = useAxios();
    const navLinks = [
        { text: 'Hoje', href: '/agendamentos/' },
        { text: 'Semanais', href: '/agendamentos/semanais' },
        { text: 'Cadastrar', href: '/agendamentos/cadastrar' },
    ];
    const { data: listServices } = useFetch(`servicos/?estabelecimento_id=${id}`);
    const { data: listSchedules } = useFetch(`horarios/?estabelecimento_id=${id}`);
    const { data: listAppointments } = useFetch(`agendamentos/estabelecimentos/?estabelecimento_id=${id}`);

    const mapDayOfWeek = (dayOfWeek) => {
        const mapping = {
            'segunda-feira': 'SEGUNDA',
            'terça-feira': 'TERCA',
            'quarta-feira': 'QUARTA',
            'quinta-feira': 'QUINTA',
            'sexta-feira': 'SEXTA',
            'sábado': 'SABADO',
            'domingo': 'DOMINGO',
        };
        return mapping[dayOfWeek.toLowerCase()];
    };

    const getAvailableTimes = (day) => {
        const date = new Date(day + 'T00:00:00');
        const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' });
        const mappedDayOfWeek = mapDayOfWeek(dayOfWeek);
        const times = listSchedules
            .filter(schedule => schedule.dia_da_semana === mappedDayOfWeek)
            .flatMap(schedule => {
                const timeOptions = [];
                let startTime = new Date(`1970-01-01T${schedule.horario_inicio}`);
                const endTime = new Date(`1970-01-01T${schedule.horario_fim}`);

                while (startTime < endTime) {
                    timeOptions.push({
                        time: startTime.toTimeString().substring(0, 5),
                        schedule: schedule.id
                    });
                    startTime = new Date(startTime.getTime() + 30 * 60000);
                }

                return timeOptions;
            });

        const bookedTimes = listAppointments
            .filter(appointment => appointment.dia_selecionado === day)
            .map(appointment => appointment.horario_selecionado);

        return times.filter(timeOption => !bookedTimes.includes(timeOption.time)).sort((a, b) => a.time.localeCompare(b.time));
    };

    const handleTimeChange = (e) => {
        const selectedOption = e.target.value;
        const selectedOptionData = getAvailableTimes(selectedDay).find(option => option.time === selectedOption);
        setSelectedTime(selectedOption);
        setSelectedSchedule(selectedOptionData ? selectedOptionData.schedule : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`agendamentos/estabelecimentos/`, {
                estabelecimento: id,
                servico: selectedService.id,
                nome: nameClient,
                contato: contactClient,
                horario_selecionado: selectedTime,
                dia_selecionado: selectedDay,
                horario: selectedSchedule 
            });
            if (response.status === 201) {
                setContactClient('');
                setNameClient('');
                setSelectedDay('');
                setSelectedService('');
                setSelectedTime('');
                setSelectedSchedule(null);
            }
        } catch (error) {
            console.error('Erro ao cadastrar agendamento:', error);
            return null;
        }
    };

    return (
        <React.Fragment>
            <Header textTitle='Agendamentos' textPhrase='Visualize e gerencie os agendamentos do seu estabelecimento.' />
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainAppointments' : 'collapseMainAppointments'}`}>
                <h2>Cadastre um novo agendamento:</h2>

                {listServices.length > 0 && listSchedules.length > 0 ? (
                    <form onSubmit={handleSubmit} className='formAppointment'>
                        <label>
                            Nome do clíente<input
                                type="text"
                                placeholder='Informe o nome do clíente'
                                value={nameClient}
                                onChange={(e) => setNameClient(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Contato do clíente<input
                                type="tel"
                                placeholder='Informe o contato do clíente'
                                value={contactClient}
                                onChange={(e) => setContactClient(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Serviço<select
                                onChange={(e) => setSelectedService(listServices.find(service => service.id === parseInt(e.target.value)))}
                                value={selectedService.id || ''}
                                required
                            >
                                <option value=''>Selecione um serviço</option>
                                {listServices.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.nome}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Dia<input
                                type="date"
                                name="calendario para agendamentos"
                                value={selectedDay}
                                required
                                placeholder='Selecione um dia'
                                onChange={(e) => {
                                    setSelectedDay(e.target.value);
                                    setSelectedTime('');
                                    setSelectedSchedule(null);
                                }}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </label>
                        <label>
                            Horário<select
                                onChange={handleTimeChange}
                                value={selectedTime}
                                required
                            >
                                <option value=''>Selecione um horário</option>
                                {selectedDay && getAvailableTimes(selectedDay).map((option, index) => (
                                    <option key={index} value={option.time}>
                                        {option.time}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <section className="buttonFormAppointments" >
                            <button type="submit">Agendar</button>
                        </section>
                    </form>
                ) : (
                    <p>É necessário que as informações sobre os horários disponíveis e os serviços estejam cadastradas.</p>
                )}
            </main>
            <Sidebar />
        </React.Fragment>
    );
};

export default RegisterAppointment;
