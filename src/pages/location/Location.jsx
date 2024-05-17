import React, { useContext } from 'react'
import Header from '../../componentes/header/Header'
import Nav from '../../componentes/nav/Nav'
import Sidebar from '../../componentes/sidebar/Sidebar'
import MapsAPI from '../../componentes/maps/MapsAPI'
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider'
import { AuthContext } from '../../services/AuthContext'
import './Location.scss'
const Location = () => {
    const { authTokens } = useContext(AuthContext);
    const { bairro, cep, cidade, numeroEndereco, estado, rua } = authTokens.estabelecimento.estabelecimento;
    const { expandedSidebar } = useSidebarContext()
    const navLinks = [
        { text: 'Atual', href: '/localizacao/' },
        { text: 'Modificar', href: '/localizacao/modificar/' },
    ];
    return (
        <React.Fragment>
            <Header textTitle={'Localização'} textPhrase={'Atualize a localização do seu estabelecimento para que seus clientes possam encontrá-lo facilmente.'} />

            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <section className="currentAddress">
                    <h2>Endereço</h2>
                    <ul>
                        <li>Rua: {rua}</li>
                        <li>Nº: {numeroEndereco}</li>
                        <li>Bairro: {bairro}</li>
                        <li>Cidade: {cidade}</li>
                        <li>Estado: {estado}</li>
                        <li>CEP: {cep}</li>
                    </ul>
                </section>
                <section className="currentLocation">
                    <h2>Localização</h2>
                    <MapsAPI />
                </section>
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default Location
