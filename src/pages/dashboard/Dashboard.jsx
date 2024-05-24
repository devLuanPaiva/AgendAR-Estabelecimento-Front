import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../services/AuthContext';
import './Dashboard.scss';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import Header from '../../componentes/header/Header';
import Sidebar from '../../componentes/sidebar/Sidebar';
import useAxios from '../../services/useAxios';
import { IoPeople } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import MapsAPI from '../../componentes/maps/MapsAPI';

const Dashboard = () => {
    const { authTokens } = useContext(AuthContext);
    const { id, nome } = authTokens.estabelecimento.estabelecimento;
    const { expandedSidebar } = useSidebarContext();
    const [statisticData, setStatisticData] = useState({});
    const api = useAxios();

    const formatPercent = (value) => {
        return value !== undefined ? `${value.toFixed(2)}%` : '0%';
    };

    const fetchStatisticData = useCallback(async () => {
        try {
            const response = await api.get(`agendamentos/dados-estatisticos/?estabelecimento_id=${id}`);
            if (response.status === 200) {
                setStatisticData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [api, id]);

    useEffect(() => {
        fetchStatisticData();
    }, [fetchStatisticData]);

    return (
        <React.Fragment>
            <Header textTitle={`Bem vindo, ${nome}`} textPhrase={'Veja abaixo algumas informações sobre o seu estabelecimento.'} />
            <main className={`${!expandedSidebar ? 'expandMainDashboard' : 'collapseMainDashboard'}`}>
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
