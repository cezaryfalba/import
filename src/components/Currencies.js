import React from 'react';
import './Currencies.css';

import config from '../config.json';

const show_currencies = config['show_currencies'];

const Currencies = props =>
    (<div className="currencies">
        <h2 className="currencies__header">Kursy walut:</h2>
        <ul className="currencies__list">
            { Object.keys(props.currencies)
                    .filter(key => show_currencies.includes(key))
                    .map(key => (<li key={`currencies__list--${key}`} className="currencies__list-item">
                        {key}: {parseFloat(1/props.currencies[key]).toFixed(2)}
                    </li>))
            }
        </ul>
    </div>);

export default Currencies;
