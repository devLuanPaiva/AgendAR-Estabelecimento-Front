import { Link } from "react-router-dom";
import './LandingPage.scss'
const LandingPage = () => {
    return (
        <>
            <header >
                <h1>Ag<span className="titleUnderline">end<span className="changeColor">AR</span>
                </span></h1>
                <nav className="nav">
                    <Link to={'/autenticacao/'} className="navigationLinks">
                        Acessar
                    </Link>
                    <Link to={'/'} className="navigationLinks" onClick={() => document.querySelector('.secaoServicos').scrollIntoView({ behavior: 'smooth' })}>
                        Nossos Serviços
                    </Link>
                </nav>
            </header>
            <main>
                <article>
                    <div className="presentation">
                        <h2>
                            otimize seus agendamentos e faça parte da nossa plataforma para alcançar mais clientes e expandir seus negócios!
                        </h2>
                        <Link className="registerLink" to={'/registrarEstabelecimento/'}>realizar cadastro</Link>
                    </div>
                    <div className="logo"></div>
                </article>
                <hr className="line" />
                <section className="servicesSection" id="services">
                    <h2>serviços</h2>
                    <article>
                        <div className="feature">
                            <h3>Gestão de Agenda</h3>
                            <p>Visualização e gerenciamento da agenda de atendimentos, incluindo marcações confirmadas, horários disponíveis e bloqueio de horários indisponíveis.</p>
                        </div>
                        <div className="feature">
                            <h3>Pagamentos Seguros</h3>
                            <p>Configuração e integração com plataformas de pagamento online para receber pagamentos dos serviços agendados.</p>
                        </div>
                        <div className="feature">
                            <h3>Notificações e Lembretes</h3>
                            <p>Envio de notificações e lembretes automáticos para os usuários e prestadores de serviços sobre os agendamentos e compromissos.</p>
                        </div>
                        <div className="feature">
                            <h3>Avaliação e Feedback</h3>
                            <p>Visualização das avaliações  e comentários deixados pelos clientes, permitindo uma análise detalhada dos serviços prestados.</p>
                        </div>
                    </article>
                </section>
                <hr className="line" />
                <section className="phraseSection">
                    <h2>
                        Venha para a Agend<span className="changeColor">AR</span>
                    </h2>

                    <article>
                        <h3>Otimize seus agendamentos e expanda sua clientela.</h3>
                    </article>
                </section>
            </main>
        </>
    )
}
export default LandingPage