import React, { useContext, useState } from 'react';
import { useSidebarContext } from '../../components/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import Sidebar from '../../components/sidebar/Sidebar';
// import './Schedules.scss';
import useAxios from '../../hooks/useAxios';
import Notification from '../../components/notification/Notification';
import useForm from '../../hooks/useForm';

const RegisterShedules = () => {
    const { expandedSidebar } = useSidebarContext();
    const { authTokens } = useContext(AuthContext);
    const { id } = authTokens.estabelecimento.estabelecimento;
    const [formValues, handleInputChange] = useForm({ startTime: '', endTime: '', shift: '', dayOfTheWeek: '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const api = useAxios();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('horarios/', {
                horario_fim: formValues.endTime,
                horario_inicio: formValues.startTime,
                dia_da_semana: formValues.dayOfTheWeek,
                estabelecimento: id,
                turno: formValues.shift
            });
            if (response.status === 201) {
                setMessage('Cadastrado com sucesso!');
                formValues.dayOfTheWeek = '';
                formValues.endTime = '';
                formValues.shift = '';
                formValues.startTime = '';
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error(error.response.data);
            setErrorMessage(error.response.data);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const navLinks = [
        { text: 'Atual', href: '/horarios/' },
        { text: 'Cadastrar', href: '/horarios/cadastrar/' },
    ];

    return (
        <React.Fragment>
            <Header textTitle='Horários' textPhrase='Gerencie seus horários comerciais para que seus clientes possam agendar serviços.' />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <h2>Cadastrar Horário:</h2>
                <form onSubmit={handleSubmit} className='generalForm'>
                    <label>
                        Dia da semana<select
                            id="selectedDay"
                            value={formValues.dayOfTheWeek}
                            onChange={handleInputChange}
                            name='dayOfTheWeek'
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
                    <label>
                        Turno<select
                            id="selectedShift"
                            value={formValues.shift}
                            onChange={handleInputChange}
                            name='shift'
                            required>
                            <option value="">Escolha um turno</option>
                            <option value="MANHA">Manhã</option>
                            <option value="TARDE">Tarde</option>
                            <option value="NOITE">Noite</option>
                        </select>
                    </label>
                    <label>
                        Horário ínicial<input
                            type="time"
                            name="startTime"
                            value={formValues.startTime}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Horário final<input
                            type="time"
                            name="endTime"
                            value={formValues.endTime}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <section className="generalButton">
                        <button type="submit" className='btn-black'>Cadastrar Horário</button>
                    </section>
                </form>
            </main>
            <Sidebar />
        </React.Fragment>
    );
};

export default RegisterShedules;
