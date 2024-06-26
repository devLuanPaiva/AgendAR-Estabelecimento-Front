import axios from 'axios';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MapsAPI = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY_01
    });
    const { authTokens } = useContext(AuthContext);
    const { bairro, cep, cidade, numeroEndereco, estado, rua } = authTokens.estabelecimento.estabelecimento;

    const [center, setCenter] = useState(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const address = `${rua}, ${numeroEndereco} - ${bairro}, ${cidade} - ${estado}, ${cep}`;
        const getCoordinatesFromAddress = async (address) => {
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY_02}`);
                const { results } = response.data;
                if (results && results.length > 0) {
                    const { lat, lng } = results[0].geometry.location;
                    return { lat, lng };
                } else {
                    throw new Error('Endereço não encontrado');
                }
            } catch (error) {
                console.error('Erro ao obter coordenadas:', error);
                return null;
            }
        };

        getCoordinatesFromAddress(address).then(coords => {
            if (coords) {
                setCenter(coords);
                setPosition(coords);
            }
        });
    }, [bairro, cep, cidade, estado, numeroEndereco, rua]);

    return (
        <figure className='maps'>
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={center}
                        zoom={15}
                    >
                        {position && <Marker position={position} />}
                    </GoogleMap>
                ) : <></>
            }
        </figure>
    );
};

export default MapsAPI;
