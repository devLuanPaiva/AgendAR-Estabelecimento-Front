import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const SelectStateAndCity = ({ selectedCityName, selectedState, setSelectedCityName, setSelectedState }) => {
    const [selectedStateCode, setSelectedStateCode] = useState('');
    const [selectedCity, setSelectedCity] = useState({});

    const { data: states, isLoading: loadingStates } = useQuery('states', async () => {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        return response.data;
    });

    const { data: cities, isLoading: loadingCities } = useQuery(['cities', selectedStateCode], async () => {
        if (selectedStateCode !== '') {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedStateCode}/municipios`);
            return response.data;
        }
        return [];
    });

    const sortStatesAlphabetically = (states) => {
        return states.sort((a, b) => a.nome.localeCompare(b.nome));
    };

    const handleStateChange = (e) => {
        setSelectedStateCode(e.target.value);
    };

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        const city = cities.find((city) => city.nome === cityName);
        setSelectedCity(city || {});
        setSelectedCityName(city?.nome || '');
        setSelectedState(city?.microrregiao?.mesorregiao?.UF?.sigla || '');
    };

    return (
        <section className='SelectStatesAndCities'>
            <select
                id="selectedState"
                disabled={loadingStates}
                onChange={handleStateChange}
                required
                value={selectedStateCode}>
                <option value='' selected>Selecione um estado</option>
                {loadingStates ? (
                    <option value="">Carregando...</option>
                ) : (
                    sortStatesAlphabetically(states).map((state) => (
                        <option key={state.id} value={state.sigla}>
                            {state.nome} - {state.sigla}
                        </option>
                    ))
                )}
            </select>
            <select
                id="selectedCity"
                disabled={loadingCities || selectedStateCode === ''}
                onChange={handleCityChange}
                required
                value={selectedCity.nome}>
                <option value='' selected>Selecione um município</option>
                {loadingCities ? (
                    <option value="">Carregando...</option>
                ) : (
                    cities.map((city) => (
                        <option key={city.id} value={city.nome}>
                            {city.nome}
                        </option>
                    ))
                )}
            </select>
        </section>
    );
};

export default SelectStateAndCity;
