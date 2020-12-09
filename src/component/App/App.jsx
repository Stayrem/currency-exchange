/* eslint-disable react/jsx-no-duplicate-props */
import './App.css';
import React, { useEffect, useState } from 'react';
import arrow from '../../arrow.svg';
import loader from '../../loader.svg';

const fetchData = async () => {
  try {
    const fetched = await fetch('https://api.exchangeratesapi.io/latest');
    const fetchedData = await fetched.json();
    return fetchedData;
  } catch (err) {
    console.log(err);
  }
};

const App = () => {
  // EUR is base currency
  const [rates, updateRates] = useState(null);
  const [sum, changeSum] = useState(1);
  const [currencyPair, updateCurrencyPair] = useState([null, null]);
  const setData = async () => {
    const responce = await fetchData();
    updateRates(responce.rates);
  }

  const getConvertResult = (sumToConvert) => {
    const firstPairRate = rates[currencyPair[0]];
    const secondPairRate = rates[currencyPair[1]];
    const result = sumToConvert * secondPairRate / firstPairRate;
    return result.toFixed(2);
  };

  useEffect(() => {
    setData();
    setInterval(setData, 3600000)
  }, []);
  return (
    (() => {
      if (rates !== null) {
        return (
          <div className="App">
          <section className="exchange">
            <input 
              className="exchange__input" 
              type="number" 
              placeholder="количество" 
              defaultValue={sum}
              onChange={(evt) => {
                const { value } = evt.target;
                const parsedValue = parseInt(value);
                typeof parsedValue  === 'number' && value > 0 ? changeSum(parseInt(parsedValue)) : changeSum(0);                
                }
              }
            />
            <div className="exchange_inner">
            <select
              defaultValue="Выберите валюту"
              className className="exchange__select"
              onChange={(evt) => updateCurrencyPair([evt.target.value, currencyPair[1]])}
            >
              <option disabled>Выберите валюту</option>
              {Object.keys(rates).map((rate) => <option key={rate}>{rate}</option>)}
            </select>
            <img width="16" src={arrow} alt="конвертировать в" className="exchange__separator" />
            <select
              defaultValue="Выберите валюту" 
              className className="exchange__select" 
              onChange={(evt) => updateCurrencyPair([currencyPair[0], evt.target.value])}
            >
              <option disabled>Выберите валюту</option>
              {Object.keys(rates).map((rate) => <option key={rate}>{rate}</option>)}
            </select>
            </div>
            <span className="exchange__result">{currencyPair.every((pair) => pair !== null) && getConvertResult(sum)}</span>
          </section>
        </div>
        );
      }
      return <img className="loader" src={loader} alt="Загрузка..." />;
    })()
  );
}

export default App;
