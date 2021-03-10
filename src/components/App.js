import React, { useEffect, useState } from 'react';
import { exchangerates } from '../services/exchangerates';

import Currencies from './Currencies';
import PriceInput from './PriceInput';

import './App.css';

const base_currency = 'PLN';

const App = () => {
    const [currencies, setCurrencies] = useState({});
    const [currency, setCurrency] = useState('EUR');
    const [price, setPrice] = useState(0);
    const [displacement, setDisplacement] = useState('small');

    const load_data = async () => {
        setCurrencies(await exchangerates(base_currency));
    }

    const pricePLN = () => (price / currencies[currency]).toFixed();
    const translation = () => 200;
    const plates = () => (75 / currencies['EUR']).toFixed();
    const duty = () => (
        pricePLN() * (displacement === 'small' ? 0.031 : 0.186)
    ).toFixed();
    const mot = () => 98;
    const vat = () => 160;
    const regCard = () => 75;
    const total = () => parseInt(pricePLN()) + translation() +
        parseInt(plates()) + parseInt(duty()) + mot() + vat() + regCard();

    useEffect(() => { load_data() }, []);

    return (<div className="App">
        <Currencies currencies={currencies} />

        <PriceInput
            currency={currency}
            setCurrency={setCurrency}
            setPrice={setPrice}
        />

        <br/>

        <p>Pojemność silnika:</p>
        <select
            onChange={e => setDisplacement(e.target.value)}
            value={displacement}
        >
            <option value="small">do 2000cm³</option>
            <option value="large">powyżej 2000cm³</option>
        </select>

        <table>
            <tbody>
                <tr>
                    <th>Cena po przeliczeniu:</th>
                    <td>{ pricePLN() }zł</td>
                </tr>

                <tr>
                    <th>Tłumaczenie:</th>
                    <td>{ translation() }zł</td>
                </tr>

                <tr>
                    <th>Tablice 5-dniowe:</th>
                    <td>{ plates() }zł</td>
                </tr>

                <tr>
                    <th>Akcyza:</th>
                    <td>{ duty() }zł</td>
                </tr>

                <tr>
                    <th>Przegląd:</th>
                    <td>{ mot() }zł</td>
                </tr>

                <tr>
                    <th>Zaświadczenie o zwolnieniu z VAT:</th>
                    <td>{ vat() }zł</td>
                </tr>

                <tr>
                    <th>Karta pojazdu:</th>
                    <td>{ regCard() }zł</td>
                </tr>

                <tr>
                    <th>Całość:</th>
                    <td><strong><u>{ total() }zł</u></strong></td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default App;
