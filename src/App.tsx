import React, { useState } from 'react';
import './App.css';
import { ExcangeRate } from './ExcangeRate';

function App() {
/*   fetch('https://api.nbrb.by/exrates/rates/USD?parammode=2&ondate=2024-08-13') */
/* `https://api.nbrb.by/exrates/rates/USD?parammode=2&ondate=${date}`*/
  const[date, setDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [excangeRate, setExcangeRate] = useState<{Cur_OfficialRate: number, Cur_Name: string } | null>(null);


  const fetchExcangeRate = () => {
    //const date = '2024-08-13';

      fetch(`https://api.nbrb.by/exrates/rates/USD?parammode=2&ondate=${date}`)
      .then(response => response.json())
      .then(json => {
        if (json.status === 404) {
          setError('Excange Rate not found');//Уствнавливаем ошибку если город не найден
          setExcangeRate(null);
        } else {
          setExcangeRate({
            Cur_OfficialRate: json.Cur_OfficialRate,
            Cur_Name: json.Cur_Name
          });
          setError(null);//сбрасываем ошибку если город не найден
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('An error occurred');//Общая ошибка на случай других проблем
        setExcangeRate(null);
      });
  };

  return (
    <div className="App">
      <h1>Exchange rate</h1>
      <p>Dollar per belarusian ruble exchange rate according to the National Bank of the Republic of Belarus</p>
{/*       <input value={date} onChange={(e)=>setDate(e.currentTarget.value)} /> */}
      <input type="date" onChange={(e)=>setDate(e.currentTarget.value)} />
      <button onClick={fetchExcangeRate}>Get exchange rate</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {excangeRate && <ExcangeRate Cur_OfficialRate={excangeRate.Cur_OfficialRate} Cur_Name={excangeRate.Cur_Name} />}
    </div>
  );
}

export default App;
