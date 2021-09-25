import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./Component/InfoBox/InfoBox";
import Map from "./Component/Map/Map";

function App() {
  // react hook state
  const [getData, setGetData] = useState("worldwide");
  const [countries, setCountry] = useState([]);
  // onchange selected data
  const handleChange = (event) => {
    setGetData(event.target.value);
  };
  // api call get data
  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((result) => {
          const coun = result.map((data) => ({
            name: data.country,
            value: data.countryInfo.iso2,
          }));
          setCountry(coun);
        });
    };
    getCountryData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        {/* this is header */}
        <div className="app__header">
          <h2>This is Covid-19 Tracker</h2>
          <FormControl className="app__dropdown">
            <InputLabel>Age</InputLabel>
            <Select
              variant="outlined"
              value={getData}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries?.map((data, index) => (
                <MenuItem key={index} value={data.value}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* info box */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={120} total="2000" />
          <InfoBox title="Revovered" cases={100} total="1000" />
          <InfoBox title="Deaths" cases={150} total="1500" />
        </div>
        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        {/* table */}
        <h3>Live Cases by Country</h3>
        {/* graph */}
        <h3>Worldwide new cases</h3>
      </Card>
    </div>
  );
}

export default App;
