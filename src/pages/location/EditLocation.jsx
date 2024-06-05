import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import './Location.scss'
import Header from '../../components/header/Header';
import { useSidebarContext } from '../../components/sidebar/SidebarProvider';
import Nav from '../../components/nav/Nav';
import useAxios from '../../hooks/useAxios';
import Notification from '../../components/notification/Notification';

const EditLocation = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY_01
    });
    const { authTokens, updateTokens } = useContext(AuthContext);
    const { id, bairro, cep, cidade, numeroEndereco, estado, rua } = authTokens.estabelecimento.estabelecimento;
    const { access, refresh } = authTokens
    const [center, setCenter] = useState(null);
    const [position, setPosition] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { expandedSidebar } = useSidebarContext()
    const api = useAxios()

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
                    setMessage('Atualizado com sucesso!');
                    setTimeout(()=>{setMessage('')}, 5000)
                    const establishment = await api.get('user-info/')
                    updateTokens(access, refresh, establishment.data)
                }

            } catch (error) {
                console.error('Erro ao salvar coordenadas:', error);
                setErrorMessage(error.response.data);
                setTimeout(() => {setErrorMessage('')}, 5000);

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

            {errorMessage && <Notification type="error" message={errorMessage} />}
            {message && <Notification type="success" message={message} />}
            <Nav links={navLinks} />
            <main className={`${!expandedSidebar ? 'expandMainLocation' : 'collapseMainLocation'}`}>
                <section className="selectLocation">
                    <h2>Nova localização</h2>
                    <article className="articleMaps">
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

                                    <section className="buttonLocation" >
                                        <button onClick={handleSaveClick} className='btn-black' >Salvar Coordenadas</button>
                                    </section>
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
