import { Link } from "react-router-dom";
// import './LandingPage.scss'
import img from '../../images/landingPage.png'
import React, { useEffect, useRef } from "react";
import {FaLinkedinIn, FaGoogle,FaGithubAlt} from "react-icons/fa"

const LandingPage = () => {
    const featuresRef = useRef([]);

    useEffect(() => {
        const options = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const features = featuresRef.current;

        features.forEach(feature => {
            if (feature) {
                observer.observe(feature);
            }
        });

        return () => {
            features.forEach(feature => {
                if (feature) {
                    observer.unobserve(feature);
                }
            });
        };
    }, []);


    return (
        <React.Fragment>
            <header >
                <h1>Agend<span className="changeColor">AR</span></h1>
                <nav className="nav">
                    <Link to={'/autenticacao/'} className="navigationLinks">Acessar</Link>
                    <Link to={'/'} className="navigationLinks" onClick={() => document.querySelector('.servicesSection').scrollIntoView({ behavior: 'smooth' })}>
                        Nossos Serviços
                    </Link>
                </nav>
            </header>
            <main>
                <article className="systemPresentation">
                    <div className="presentation">
                        <h2>
                            otimize seus agendamentos e faça parte da nossa plataforma para alcançar mais clientes e expandir seus negócios!
                        </h2>
                        <Link className="registerLink" to={'/registrarEstabelecimento/'}>realizar cadastro</Link>
                    </div>
                    <figure className="figureSoon">
                        <img src={img} alt="Imagem da logo em um celular" />
                    </figure>
                </article>
                <section className="servicesSection" id="services">
                    <h2>serviços</h2>
                    <article>
                        <div className="feature" ref={(el) => featuresRef.current[0] = el}>
                            <h3>Gestão de Agenda</h3>
                            <p>Visualização e gerenciamento da agenda de atendimentos, incluindo marcações confirmadas, horários disponíveis e bloqueio de horários indisponíveis.</p>
                        </div>
                        <div className="feature" ref={(el) => featuresRef.current[1] = el}>
                            <h3>Localização</h3>
                            <p>Configure a localização do seu estabelecimento para que seus clientes possam encontrá-lo mais rapidamente.</p>
                        </div>
                        <div className="feature" ref={(el) => featuresRef.current[2] = el}>
                            <h3>Notificações</h3>
                            <p>Envio de notificações e lembretes automáticos para os usuários e prestadores de serviços sobre os agendamentos e compromissos.</p>
                        </div>
                        <div className="feature" ref={(el) => featuresRef.current[3] = el}>
                            <h3>Progesso</h3>
                            <p>Visualize o progresso do seu estabelecimento com relatórios sobre a quantidade de agendamentos mensais, semanais e diários, ajudando você a acompanhar e otimizar a gestão dos seus serviços.</p>
                        </div>
                    </article>
                </section>
                <section className="phraseSection">
                    <h2>Venha para a Agend<span className="changeColor">AR</span></h2>
                    <article>
                        <h3>Otimize seus agendamentos e expanda sua clientela.</h3>
                    </article>
                </section>
            </main>
            <footer>
                <h3>
                    Desenvolvido por <strong>dev <span className='text'>L</span>uan</strong>
                </h3>
                <section className="socialMedia">
                    <Link className="linksToFooter" to="https://www.linkedin.com/in/devLuanPaiva/"><FaLinkedinIn className="iconColor" /></Link>
                    <Link className="linksToFooter" to="mailto:devluanpaiva@gmail.com"><FaGoogle className="iconColor" /></Link>
                    <Link className="linksToFooter" to="https://github.com/devLuanPaiva"><FaGithubAlt className="iconColor" /></Link>
                </section>
            </footer>
        </React.Fragment>
    );
}

export default LandingPage;
