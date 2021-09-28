import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./Component/InfoBox/InfoBox";
import LineGraph from "./Component/LineGraph/LineGraph";
import Map from "./Component/Map/Map";
import Table from "./Component/Table/Table";
import { sortData } from "./Component/util";

function App() {
  // react hook state
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // workdwide
  useEffect(() => {
    const worldWideGet = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((result) => {
          setCountryInfo(result);
        });
    };
    worldWideGet();
  }, []);

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

          const getSortData = sortData(result);
          setTableData(getSortData);
          setCountries(coun);
        });
    };
    getCountryData();
  }, []);

  // onchange selected data
  const handleChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setCountryInfo(result);
        setCountry(countryCode);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* this is header */}
        <div className="app__header">
          <h2>This is Covid-19 Tracker</h2>
          <FormControl className="app__dropdown">
            <InputLabel>Country list</InputLabel>
            <Select
              variant="outlined"
              label="Country list"
              value={country}
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
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Revovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        {/* table */}
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />
        {/* graph */}
        <h3>Worldwide new cases</h3>
        <LineGraph />
      </Card>
    </div>
  );
}

export default App;
