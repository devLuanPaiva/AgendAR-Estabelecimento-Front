import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../services/AuthContext';
import axios from 'axios';
import api from '../../services/api';
import Sidebar from '../../componentes/sidebar/Sidebar';
import './Location.scss'
import Header from '../../componentes/header/Header';
import { useSidebarContext } from '../../componentes/sidebar/SidebarProvider';
import Nav from '../../componentes/nav/Nav';

const EditLocation = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCrhUxvsSN7RvO2zc4DhYJfF7GHr33BG6g"
    });
    const { authTokens, updateTokens } = useContext(AuthContext);
    const { id, bairro, cep, cidade, numeroEndereco, estado, rua } = authTokens.estabelecimento.estabelecimento;
    const { access, refresh } = authTokens
    const [center, setCenter] = useState(null);
    const [position, setPosition] = useState(null);
    const { expandedSidebar } = useSidebarContext()

    useEffect(() => {
        const address = `${rua}, ${numeroEndereco} - ${bairro}, ${cidade} - ${estado}, ${cep}`;
        const getCoordinatesFromAddress = async (address) => {
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyB_77CX7GW1gdmCdzXYWB8uUJnWN6blRRE`);
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

    const handleMapClick = (event) => {
        const newCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),

        };
        setPosition(newCoords);
    };

    const handleSaveClick = async () => {
        if (position) {
            try {
                const response = await api.post('localizacao/coordenadas/', {
                    lat: position.lat,
                    lng: position.lng,
                    estabelecimento: id,
                })
                if (response.status === 200) {
                    console.log('Coordenadas salvas:', position);
                    const establishment = await api.get('user-info/')
                    updateTokens(access, refresh, establishment.data)
                }

            } catch (error) {
                console.error('Erro ao salvar coordenadas:', error);
            }
        }
    };
    const navLinks = [
        { text: 'Atual', href: '/localizacao/' },
        { text: 'Modificar', href: '/localizacao/modificar/' },
    ];
    return (
        <React.Fragment>
            <Header textTitle={'Localização'} textPhrase={'Atualize a localização do seu estabelecimento para que seus clientes possam encontrá-lo facilmente.'} />

            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMain' : 'collapseMain'}`}>
                <section className="selectLocation">
                    <h2>Selecione uma nova localização</h2>
                    <article className="maps">
                        {
                            isLoaded ? (
                                <>
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '100%' }}
                                        center={center}
                                        zoom={15}
                                        onClick={handleMapClick}
                                    >
                                        {position && <Marker position={position} />}
                                    </GoogleMap>
                                    <button onClick={handleSaveClick}>Salvar Coordenadas</button>
                                </>
                            ) : <></>
                        }
                    </article>
                </section>

            </main>
            <Sidebar />
        </React.Fragment>
    )
}

export default EditLocation