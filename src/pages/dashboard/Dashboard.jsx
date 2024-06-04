import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Dashboard.scss';
import { useSidebarContext } from '../../components/sidebar/SidebarProvider';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { IoPeople } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import MapsAPI from '../../components/maps/MapsAPI';
import useFetch from '../../hooks/useFetch';
import IsLoading from '../../components/isLoading/IsLoading';

const Dashboard = () => {
    const { authTokens } = useContext(AuthContext);
    const { id, nome } = authTokens.estabelecimento.estabelecimento;
    const { expandedSidebar } = useSidebarContext();
    const formatPercent = (value) => {
        return value !== undefined ? `${value.toFixed(2)}%` : '0%';
    };

    const { data: statisticData, isLoading } = useFetch(`agendamentos/dados-estatisticos/?estabelecimento_id=${id}`)
    if (isLoading) {
        return <IsLoading />;
    }
    return (
        <React.Fragment>
            <Header textTitle={`Olá, ${nome}!`} textPhrase={'Veja abaixo algumas informações sobre o seu estabelecimento.'} />
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                {statisticData ? (
                    <section className="appointmentQuantity">
                        <article className='progressApointments'>
                            <div>
                                <IoPeople className='icon' />
                                <abbr title="Progresso">
                                    <GiProgression className='icon' /> {formatPercent(statisticData.percentual_mensal)}
                                </abbr>
                            </div>
                            <h2>{statisticData.agendamentos_mensais}</h2>
                            <h4>Agendamentos mensais</h4>
                        </article>
                        <article className='progressApointments'>
                            <div>
                                <IoPeople className='icon' />
                                <abbr title="Progresso">
                                    <GiProgression className='icon' /> {formatPercent(statisticData.percentual_semanal)}
                                </abbr>
                            </div>
                            <h2>{statisticData.agendamentos_semanais}</h2>
                            <h4>Agendamentos semanais</h4>
                        </article>
                        <article className='progressApointments'>
                            <div>
                                <IoPeople className='icon' />
                                <abbr title="Progresso">
                                    <GiProgression className='icon' /> {formatPercent(statisticData.percentual_diario)}
                                </abbr>
                            </div>
                            <h2>{statisticData.agendamentos_diarios}</h2>
                            <h4>Agendamentos diários</h4>
                        </article>
                    </section>

                ) : <></>}
                <article className="currentLocation">
                    <h2>Localização</h2>
                    <MapsAPI />
                </article>

            </main>
            <Sidebar />
        </React.Fragment>
    );
}

export default Dashboard;
