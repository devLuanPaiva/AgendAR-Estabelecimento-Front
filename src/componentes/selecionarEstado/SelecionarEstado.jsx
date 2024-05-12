import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelecionarEstado = ({ municipioSelecionadoNome, ufSelecionada, setMunicipioSelecionadoNome, setUfSelecionada }) => {
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [loadingEstados, setLoadingEstados] = useState(true);
    const [loadingMunicipios, setLoadingMunicipios] = useState(false);
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [municipioSelecionado, setMunicipioSelecionado] = useState({});

    useEffect(() => {
        const pegarEstados = async () => {
            try {
                const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
                setEstados(response.data);
                setLoadingEstados(false);
            } catch (error) {
                console.error('Erro ao carregar estados:', error);
                setLoadingEstados(false);
            }
        };

        pegarEstados();
    }, []);

    useEffect(() => {
        const pegarMunicipios = async () => {
            if (estadoSelecionado !== '') {
                try {
                    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
                    setMunicipios(response.data);
                    setLoadingMunicipios(false);
                } catch (error) {
                    console.error('Erro ao carregar municípios:', error);
                    setLoadingMunicipios(false);
                }
            }
        };

        pegarMunicipios();
    }, [estadoSelecionado]);
    const ordenarEstadosAlfabeticamente = (estados) => {
        return estados.sort((a, b) => a.nome.localeCompare(b.nome));
    };

    const handleChangeEstado = (e) => {
        setEstadoSelecionado(e.target.value);

    };
    const handleChangeMunicipio = (e) => {
        const municipioNome = e.target.value;
        const municipio = municipios.find((municipio) => municipio.nome === municipioNome);
        setMunicipioSelecionado(municipio || {});
        setMunicipioSelecionadoNome(municipio?.nome || '');
        setUfSelecionada(municipio?.microrregiao?.mesorregiao?.UF?.sigla || '');
    };
    return (
        <section className='selecionarEstadosEMunicipios'>

            <select id="estadoSelecionado"
                disabled={loadingEstados}
                onChange={handleChangeEstado}
                required
                value={estadoSelecionado}>
                <option value='' selected>Selecione um estado</option>
                {loadingEstados ? (
                    <option value="">Carregando...</option>
                ) : (
                    ordenarEstadosAlfabeticamente(estados).map((estado) => (
                        <option key={estado.id} value={estado.sigla}>
                            {estado.nome} - {estado.sigla}
                        </option>
                    ))
                )}

            </select>

            <select id="municipioSelecionado"
                disabled={loadingMunicipios}
                onChange={handleChangeMunicipio}
                required
                value={municipioSelecionado.nome} >
                <option value='' selected>Selecione um município:</option>
                {loadingMunicipios ? (
                    <option value="">Carregando...</option>
                ) : (
                    municipios.map((municipio) => (
                        <option key={municipio.id} value={municipio.nome}>
                            {municipio.nome}
                        </option>
                    ))
                )}
            </select>

        </section>
    );
};

export default SelecionarEstado;
