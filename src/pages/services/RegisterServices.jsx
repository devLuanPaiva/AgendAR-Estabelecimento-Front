import React, { useContext, useState } from 'react'
import './Services.scss'
import Header from '../../componentes/header/Header';
import Nav from '../../componentes/nav/Nav';
import Sidebar from '../../componentes/sidebar/Sidebar';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import api from '../../services/api';
import { AuthContext } from '../../services/AuthContext';

const RegisterServices = () => {
    const [nameService, setNameService] = useState('')
    const [valueService, setValueService] = useState('')
    const [descriptionService, setDescriptionService] = useState('')
    const [descriptionCount, setDescriptionCount] = useState(descriptionService.length);
    const { expandedSidebar } = useSidebarContext()
    const { authTokens } = useContext(AuthContext)
    const { id } = authTokens.estabelecimento.estabelecimento
    const navLinks = [
        { text: 'Atual', href: '/servicos/' },
        { text: 'Cadastrar', href: '/servicos/cadastrar/' },
    ];
    const handleInputChange = (e) => {
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
                nome: nameService,
                valor: parseFloat(valueService),
                descricao: descriptionService,
                estabelecimento: id
            })
            if (response.status === 201) {
                setDescriptionService('')
                setNameService('')
                setValueService('')
            }
        } catch (error) {
            console.error('Erro ao cadastrar serviços:', error);
            return null;
        }
    }
    return (
        <React.Fragment>
            <Header textTitle='Serviços' textPhrase='Gerencie os serviços oferecidos pelo seu estabelecimento.' />
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainServices' : 'collapseMainServices'}`}>
                <h2>Cadastre um novo serviço:</h2>
                <form onSubmit={handleSubmit} className='formServices'>
                    <section className="informationMain">
                        <label>Nome do serviço: <input type="text" placeholder='Informe o nome do serviço' required value={nameService} onChange={(e) => setNameService(e.target.value)} /> </label>
                        <label>Valor do serviço: <input type="number" placeholder='Informe o valor do serviço' required value={valueService} onChange={(e) => setValueService(e.target.value)} /> </label>
                    </section>
                    <label className='textBox'>Descrição:
                        <div style={{ position: 'relative' }}>
                            <textarea
                                required
                                value={descriptionService}
                                onChange={handleInputChange}
                                placeholder="Digite no máximo 200 caracteres..."
                                rows={5}
                                cols={50}
                                style={{ width: '100%', height: '', resize: 'none', textIndent: '5px' }}
                            />
                            <div className="characterCount">{descriptionCount}/200 caracteres</div>
                        </div>
                    </label>
                </form>
                <section className="buttonFormServices"><button type="submit">Cadastrar Serviço</button></section>
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default RegisterServices
