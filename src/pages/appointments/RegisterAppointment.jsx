import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import './Appointments.scss';
import useFetch from '../../hooks/useFetch';
import Notification from '../../componentes/notification/Notification';
import useForm from '../../hooks/useForm';

const RegisterAppointment = () => {
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [formValues, handleInputChange] = useForm({
        nameClient: '', contactClient: '', selectedTime: '', selectedDay: '', selectedSchedule: null,
    });
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

    const getAvailableTimes = useCallback((day) => {
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
            .map(appointment => appointment.horario_selecionado.substring(0, 5));
        const availableTimes = times.filter(timeOption => !bookedTimes.includes(timeOption.time));
        return availableTimes.sort((a, b) => a.time.localeCompare(b.time));
    },[listAppointments, listSchedules]);

    useEffect(() => {
        if (formValues.selectedDay) {
            setAvailableTimes(getAvailableTimes(formValues.selectedDay));
            formValues.selectedTime = '';
            formValues.selectedSchedule = null;
        }
    }, [formValues.selectedDay, listAppointments, listSchedules, formValues, getAvailableTimes]);
    

    const handleTimeChange = (e) => {
        const selectedOption = e.target.value;
        const selectedOptionData = availableTimes.find(option => option.time === selectedOption);
        formValues.selectedTime = selectedOption;
        formValues.selectedSchedule = selectedOptionData ? selectedOptionData.schedule : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`agendamentos/estabelecimentos/`, {
                estabelecimento: id,
                servico: selectedService.id,
                nome: formValues.nameClient,
                contato: formValues.contactClient,
                horario_selecionado: formValues.selectedTime,
                dia_selecionado: formValues.selectedDay,
                horario: formValues.selectedSchedule
            });
            if (response.status === 201) {
                setMessage('Agendado com sucesso!');
                setSelectedService('');
                formValues.nameClient = ''; 
                formValues.contactClient = ''; 
                formValues.selectedTime = ''; 
                formValues.selectedDay = ''; 
                formValues.selectedSchedule = null;
            }
        } catch (error) {
            setErrorMessage(error.response.data);
            return null;
        }
    };

    return (
        <React.Fragment>
            <Header textTitle='Agendamentos' textPhrase='Visualize e gerencie os agendamentos do seu estabelecimento.' />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMainAppointments' : 'collapseMainAppointments'}`}>
                <h2>Novo agendamento:</h2>

                {listServices.length > 0 && listSchedules.length > 0 ? (
                    <form onSubmit={handleSubmit} className='formAppointment'>
                        <label>
                            Nome do clíente<input
                                type="text"
                                placeholder='Informe o nome do clíente'
                                value={formValues.nameClient}
                                name='nameClient'
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Contato do clíente<input
                                type="tel"
                                placeholder='Informe o contato do clíente'
                                value={formValues.contactClient}
                                name='contactClient'
                                onChange={handleInputChange}
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
                                name="selectedDay"
                                value={formValues.selectedDay}
                                required
                                placeholder='Selecione um dia'
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </label>
                        <label>
                            Horário<select
                                onChange={handleTimeChange}
                                name='selectedTime'
                                value={formValues.selectedTime}
                                required
                            >
                                <option value=''>Selecione um horário</option>
                                {formValues.selectedDay && availableTimes.map((option, index) => (
                                    <option key={index} value={option.time}>
                                        {option.time}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <section className="buttonFormAppointment">
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
