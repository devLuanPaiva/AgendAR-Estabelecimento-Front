import React, { useContext, useState } from 'react'
import './Services.scss'
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import { AuthContext } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import Notification from '../../componentes/notification/Notification';
import useForm from '../../hooks/useForm';

const RegisterServices = () => {
    const [descriptionService, setDescriptionService] = useState('')
    const [formValues, handleInputChange] = useForm({ nameService: '', valueService: '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [descriptionCount, setDescriptionCount] = useState(descriptionService.length);
    const { expandedSidebar } = useSidebarContext()
    const { authTokens } = useContext(AuthContext)
    const { id } = authTokens.estabelecimento.estabelecimento
    const api = useAxios()
    const navLinks = [
        { text: 'Atual', href: '/servicos/' },
        { text: 'Cadastrar', href: '/servicos/cadastrar/' },
    ];
    const handleTextAreaChange = (e) => {
        const text = e.target.value;
        if (text.length <= 200) {
            setDescriptionService(text);
            setDescriptionCount(text.length);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('servicos/', {
                nome: formValues.nameService,
                valor: parseFloat(formValues.valueService),
                descricao: descriptionService,
                estabelecimento: id
            })
            if (response.status === 201) {
                setMessage('Cadastrado com sucesso!');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
                setDescriptionService('')
                formValues.nameService = '';
                formValues.valueService = '';
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else if (error.response.data.nome) {
                setErrorMessage('O nome deve ter no máximo 30 caracteres.');
            }
            else {
                setErrorMessage('Erro ao cadastrar o serviço.');
            }
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return null;
        }
    }
    return (
        <React.Fragment>
            <Header textTitle='Serviços' textPhrase='Gerencie os serviços oferecidos pelo seu estabelecimento.' />
            <Nav links={navLinks} />
            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <h2>Cadastre um novo serviço:</h2>
                <form onSubmit={handleSubmit} className='generalForm formServices'>
                    <label>Nome do serviço: <input
                        type="text"
                        placeholder='Informe o nome do serviço'
                        required
                        name='nameService'
                        value={formValues.nameService}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>Valor do serviço: <input
                        type="number"
                        name='valueService'
                        placeholder='Informe o valor do serviço'
                        required value={formValues.valueService}
                        onChange={handleInputChange}
                    /> </label>
                    <label className='textBox'>Descrição:
                        <div style={{ position: 'relative' }}>
                            <textarea
                                required
                                value={descriptionService}
                                onChange={handleTextAreaChange}
                                placeholder="Digite no máximo 200 caracteres..."
                                rows={5}
                                cols={50}
                                style={{ width: '100%', height: '', resize: 'none', textIndent: '5px' }}
                            />
                            <p className="characterCount">{descriptionCount}/200 caracteres</p>
                        </div>
                    </label>
                    <section className="generalButton"><button type="submit">Cadastrar Serviço</button></section>
                </form>
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default RegisterServices
