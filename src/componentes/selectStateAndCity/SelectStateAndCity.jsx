import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectStateAndCity = ({ selectedCityName, selectedState, setSelectedCityName, setSelectedState }) => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingStates, setLoadingStates] = useState(true);
    const [loadingCities, setLoadingCities] = useState(false);
    const [selectedStateCode, setSelectedStateCode] = useState('');
    const [selectedCity, setSelectedCity] = useState({});

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
                setStates(response.data);
                setLoadingStates(false);
            } catch (error) {
                console.error('Error loading states:', error);
                setLoadingStates(false);
            }
        };

        fetchStates();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedStateCode !== '') {
                try {
                    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedStateCode}/municipios`);
                    setCities(response.data);
                    setLoadingCities(false);
                } catch (error) {
                    console.error('Error loading cities:', error);
                    setLoadingCities(false);
                }
            }
        };

        fetchCities();
    }, [selectedStateCode]);

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

            <select id="selectedState"
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

            <select id="selectedCity"
                disabled={loadingCities}
                onChange={handleCityChange}
                required
                value={selectedCity.nome} >
                <option value='' selected>Selecione um município:</option>
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
