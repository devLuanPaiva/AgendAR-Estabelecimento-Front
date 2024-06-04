import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSidebarContext } from '../../components/sidebar/SidebarProvider';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Notification from '../../components/notification/Notification';
import IsLoading from '../../components/isLoading/IsLoading';

const fetchScheduleById = async (api, idSchedule) => {
    const response = await api.get(`horarios/${idSchedule}`);
    return response.data;
};

const updateSchedule = async (api, { idSchedule, formValues }) => {
    const startTime = formValues.startTime.slice(0, 5);
    const endTime = formValues.endTime.slice(0, 5);
    const response = await api.patch(`horarios/${idSchedule}/`, {
        horario_fim: endTime,
        horario_inicio: startTime,
        dia_da_semana: formValues.dayOfTheWeek,
        turno: formValues.shift,
    });
    return response.data;
};

const ScheduleEdit = () => {
    const { expandedSidebar } = useSidebarContext();
    const api = useAxios();
    const { idSchedule } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [formValues, handleInputChange, setFormValues] = useForm({ startTime: '', endTime: '', shift: '', dayOfTheWeek: '' });
    const queryClient = useQueryClient();

    const { isLoading } = useQuery(['schedule', idSchedule], () => fetchScheduleById(api, idSchedule), {
        onSuccess: (data) => {
            setFormValues({
                startTime: data.horario_inicio,
                endTime: data.horario_fim,
                dayOfTheWeek: data.dia_da_semana,
                shift: data.turno,
            });
        }
    });

    const mutation = useMutation((newData) => updateSchedule(api, newData), {
        onSuccess: () => {
            queryClient.invalidateQueries(['schedule', idSchedule]);
            setMessage('Atualizado com sucesso!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        },
        onError: (error) => {
            setErrorMessage(error.response.data);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        mutation.mutate({ idSchedule, formValues });
    };

    if(isLoading){
        return <IsLoading/>
    }


    return (
        <React.Fragment>
            <Header textTitle='Horários' textPhrase='Gerencie seus horários comerciais para que seus clientes possam agendar serviços.' />
            <Nav links={[
                { text: 'Atual', href: '/horarios/' },
                { text: 'Cadastrar', href: '/horarios/cadastrar/' },
                { text: 'Editar', href: `/horarios/editar/${idSchedule}` },
            ]} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <h2>Editar horário:</h2>
                <form onSubmit={handleUpdate} className='generalForm'>
                    <label>Dia da semana:<select
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
                    <label>Turno:<select id="selectedShift"
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
                    <label>Horário ínicial:<input
                            type="time"
                            name="startTime"
                            value={formValues.startTime}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>Horário final:<input
                            type="time"
                            name="endTime"
                            value={formValues.endTime}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <section className="generalButton">
                        <button type="submit" className='btn-black'>Atualizar Horário</button>
                    </section>
                </form>
            </main>
            <Sidebar />
        </React.Fragment>
    );
}

export default ScheduleEdit;
