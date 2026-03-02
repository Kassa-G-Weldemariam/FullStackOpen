import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => setCountries(res.data))
      .catch((error) => console.log(error));
  }, []);

  const countriesToShow =
    value === ""
      ? []
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(value.toLowerCase()),
        );

  return (
    <>
      find countries{" "}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        {countriesToShow.length > 10 && (
          <p>too many matches, specify another filter</p>
        )}
        {countriesToShow.length < 10 &&
          countriesToShow.length > 1 &&
          countriesToShow.map((country) => (
            <div key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => setValue(country.name.common)}>
                show
              </button>
            </div>
          ))}
        {countriesToShow.length === 1 && (
          <Country country={countriesToShow[0]} />
        )}
      </div>
    </>
  );
}

export default App;
