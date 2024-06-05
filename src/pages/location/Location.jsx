import React, { useContext } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import Sidebar from '../../components/sidebar/Sidebar'
import MapsAPI from '../../components/maps/MapsAPI'
import { useSidebarContext } from '../../components/sidebar/SidebarProvider'
import { AuthContext } from '../../context/AuthContext'
// import './Location.scss'
const Location = () => {
    const { authTokens } = useContext(AuthContext);
    const { bairro, cep, cidade, estado, rua } = authTokens.estabelecimento.estabelecimento;
    const { expandedSidebar } = useSidebarContext()
    const navLinks = [
        { text: 'Atual', href: '/localizacao/' },
        { text: 'Modificar', href: '/localizacao/modificar/' },
    ];
    return (
        <React.Fragment>
            <Header textTitle={'Localização'} textPhrase={'Atualize a localização do seu estabelecimento para que seus clientes possam encontrá-lo facilmente.'} />

            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainLocation' : 'collapseMainLocation'}`}>
                <section className="currentAddress">
                    <h2>Endereço</h2>
                    <ul>
                        <li>Rua: {rua}</li>
                        <li>Bairro: {bairro}</li>
                        <li>Cidade: {cidade}</li>
                        <li>Estado: {estado}</li>
                        <li>CEP: {cep}</li>
                    </ul>
                </section>
                <article className="currentLocation">
                    <h2>Localização</h2>
                    <MapsAPI />
                </article>
            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default Location
