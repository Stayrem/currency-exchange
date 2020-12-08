import './App.css';
import React, { useEffect, useState } from 'react';
import arrow from '../../arrow.svg';

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

  const setData = async () => {
    const responce = await fetchData();
    updateRates(Object.keys(responce.rates));
  }

  useEffect(() => {
    setData();
  }, []);
  return (
    rates !== null && (
      <div className="App">
      <section className="exchange">
        <input className="exchange__input" type="number" placeholder="количество"/>
        <div className="exchange_inner">
        <select className className="exchange__select">
          {rates.map((rate) => <option>{rate}</option>)}
        </select>
        <img width="16" src={arrow} alt="конвертировать в" />
        <select className className="exchange__select">
          {rates.map((rate) => <option>{rate}</option>)}
        </select>
        </div>

      </section>
    </div>
    )
  );
}

export default App;
