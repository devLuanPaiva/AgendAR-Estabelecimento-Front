import React, { useContext} from 'react'
import { AuthContext } from '../../servicos/AuthContext'
import Titulo from '../../componentes/titulos/Titulo';
import Frase from '../../componentes/titulos/Frase';
import Menu from '../../componentes/menuLateral/Menu';

const Painel = () => {
    const { authTokens } = useContext(AuthContext);
    const { nome } = authTokens.estabelecimento.estabelecimento
    return (
        <React.Fragment>
        
            <header>
                <Titulo titulo={`Bem vindo, ${nome}`} cor={'#000'}/>
                <Frase frase={'Veja abaixo algumas informações sobre o seu estabelecimento.'} cor={'#000'}/>
            </header>
            <Menu/>
            <main>
                <section className="quantidadeAgendamentos"></section>
                <article className="localicacao"></article>
                
            </main>
        </React.Fragment>
    )
}

export default Painel
