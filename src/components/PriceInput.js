import React from 'react';

import config from '../config.json';

const show_currencies = config['show_currencies'];

const PriceInput = props => (
    <div className="priceInput">
        <p>Podaj cenę w obcej walucie:</p>

        <select
            onChange={e => props.setCurrency(e.target.value)}
            value={props.currency}
        >
            {show_currencies.map(
                currency => (<option
                    key={currency}
                    value={currency}
                >{currency}</option>)
            )}
        </select>

        <input
            onChange={e => props.setPrice(e.target.value)}
        />
    </div>
);

export default PriceInput;
