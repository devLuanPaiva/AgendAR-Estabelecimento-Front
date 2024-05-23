import React, { useContext } from 'react'
import { AuthContext } from '../../services/AuthContext'
import './Dashboard.scss'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import Header from '../../componentes/header/Header';
import Sidebar from '../../componentes/sidebar/Sidebar';

const Dashboard = () => {
    const { authTokens } = useContext(AuthContext);
    const { nome } = authTokens.estabelecimento.estabelecimento
    const { expandedSidebar } = useSidebarContext()
    return (
        <React.Fragment>
            <Header textTitle={`Bem vindo, ${nome}`} textPhrase={'Veja abaixo algumas informações sobre o seu estabelecimento.'} />
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <section className="appointmentQuantity"></section>
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default Dashboard
