import { Link } from "react-router-dom";
import React from "react";
import './Inicial.scss'
const Inicial = () => {
    return (
        <>
            <header >
                <h1>Ag<span className="sublinarTitulo">end<span className="mudarCor">AR</span>
                </span></h1>
                <nav className="nav">
                    <Link to={'/autenticacao/'} className="linksNavegacao">
                        Acessar
                    </Link>
                    <Link to={'#servicos'} className="linksNavegacao">Nossos Serviços</Link>
                </nav>
            </header>
            <main>
                <article>
                    <div className="apresentacao">
                        <h2>
                            otimize seus agendamentos e faça parte da nossa plataforma para alcançar mais clientes e expandir seus negócios!
                        </h2>
                        <Link className="linkCadastrar" to={'/registrarEstabelecimento/'}>realizar cadastro</Link>
                    </div>
                    <div className="logomarca"></div>
                </article>
                <hr className="linha" />
                <section className="secaoServicos" id="servicos">
                    <h2>serviços</h2>
                    <article>
                        <div className="funcionalidade">
                            <h3>Gestão de Agenda</h3>
                            <p>Visualização e gerenciamento da agenda de atendimentos, incluindo marcações confirmadas, horários disponíveis e bloqueio de horários indisponíveis.</p>
                        </div>
                        <div className="funcionalidade">
                            <h3>Pagamentos Seguros</h3>
                            <p>Configuração e integração com plataformas de pagamento online para receber pagamentos dos serviços agendados.</p>
                        </div>
                        <div className="funcionalidade">
                            <h3>Notificações e Lembretes</h3>
                            <p>Envio de notificações e lembretes automáticos para os usuários e prestadores de serviços sobre os agendamentos e compromissos.</p>
                        </div>
                        <div className="funcionalidade">
                            <h3>Avaliação e Feedback</h3>
                            <p>Visualização das avaliações  e comentários deixados pelos clientes, permitindo uma análise detalhada dos serviços prestados.</p>
                        </div>
                    </article>
                </section>
                <hr className="linha" />
                <section className="secaoFrase">
                    <h2>
                        Venha para a Agend<span className="mudarCor">AR</span>
                    </h2>

                    <article>
                        <h3>Otimize seus agendamentos e expanda sua clientela.</h3>
                    </article>
                </section>
            </main>
        </>
    )
}
export default Inicial