import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConferirCep = () => {
    const [destinoCep, setDestinoCep] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const verificarCep = async () => {
            if (destinoCep.length === 8) {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${destinoCep}/json/`);
                    if (!response.data.erro) {
                        setMensagem('CEP válido!');
                    } else {
                        setMensagem('CEP inválido!');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        verificarCep();
    }, [destinoCep]);

    const handleChange = (event) => {
        setDestinoCep(event.target.value.replace(/\D/g, '').slice(0, 8));     };

    return (
        <div className='verificaCEP'>
            <input
                type="text"
                value={destinoCep}
                onChange={handleChange}
                placeholder="CEP"
            />
            {mensagem && <div className="mensagem">{mensagem}</div>}
        </div>
    );
};

export default ConferirCep;
