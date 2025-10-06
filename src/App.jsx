import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  

const handleChange = (e) => {
  setQuery(e.target.value)
}
  useEffect(() => {
    (async () => {
      try{
     const res = await axios.get('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
     setCountries(res.data);
      }
      catch(err){
        console.error('unable to fetch:', err);
      }

    })();

  },[]);
  useEffect(() =>{
    const timer = setTimeout(()=> {
      const filtered = query.trim() === ""? countries: countries.filter((country) => (country.common.toLowerCase().includes(query.trim().toLowerCase())))
        setFilteredCountries(filtered);


    }, 500)
    return () => clearTimeout(timer);
  },[query, countries])

  return (
    
       <div className='App'>
        <br/>
        
        <div style={{  display:'flex', justifyContent:'center'}}>
          <input
          style={{ width: '50%'}}
          
          name = "search"
          type = "text"
          placeholder='Search for countries...'
          value = {query}
          onChange={handleChange}

          />
        </div>
        <br/>
        <div style = {{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: '16px', padding: '20px'}}>
         {filteredCountries.map((country) => (
          <div key = {country.common} className="countryCard" style={{textAlign: 'center', border:'1px solid #ccc', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
            <img
            src = {country.png}
            alt = {country.common}
            width= "100%"
            height="50%"
            />
            <p>{country.common}</p>
            



          </div>



         )
        
         )}
        
        </div>
       </div>
  )
}

export default App
/**
 * const increment = (n) => setCount((c) => c + n)
 * 
 * onClick = {() => increment(5)}
 * 
 * const handleChange = (e) => {
  setQuery(e.target.value)
}
 *
onChange={handleChange}
onChange = {(e) => setQuery(e.target.value)}
 */