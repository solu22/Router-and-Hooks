import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const fetchSingleCountry = async () => {

    if(!name) return setCountry(null)

    try {
      const byName = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      setCountry({
        data: byName.data[0],
        found: true
      })
    } catch (error) {
      setCountry({
        data:name,
        found:false
      })
    }

    
   

  };

  useEffect(() => {
    fetchSingleCountry();
  }, [ name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if(!country.found)return(<div>No country found---</div>)
  //if (country.length === 0 || country.status === 404) return <div>Not found..</div>;
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.svg}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);
  

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
