import React, { useState, useEffect } from 'react';
import './Notification.scss';

const Notification = ({ type, message }) => {
    const [visible, setVisible] = useState(true);

    const toastDetails = {
        timer: 5000,
        success: {
            icon: 'fa-circle-check',
            color: '#0ABF30',
        },
        error: {
            icon: 'fa-circle-xmark',
            color: '#E24D4C',
        },
        warning: {
            icon: 'fa-triangle-exclamation',
            color: '#E9BD0C',
        },
        info: {
            icon: 'fa-circle-info',
            color: '#3498DB',
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, toastDetails.timer);

        return () => clearTimeout(timer);
    }, [toastDetails.timer]);

    return (
        <div className={`toast-container ${visible ? 'show' : 'hide'}`}>
            <ul className="notifications">
                <li className={`toast ${type}`} style={{ background: toastDetails[type].color }}>
                    <div className="column">
                        <i className={`fa-solid ${toastDetails[type].icon}`}></i>
                        <span>{message}</span>
                    </div>
                    <i className="fa-solid fa-xmark" onClick={() => setVisible(false)}></i>
                </li>
            </ul>
        </div>
    );
}

export default Notification;
