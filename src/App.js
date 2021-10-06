import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./Component/InfoBox/InfoBox";
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
    Axios.get("https://disease.sh/v3/covid-19/all").then((result) => {
      setCountryInfo(result.data);
    });
  }, []);

  // api call get data
  useEffect(() => {
    Axios.get("https://disease.sh/v3/covid-19/countries").then((result) => {
      const coun = result.data.map((data) => ({
        name: data.country,
        value: data.countryInfo.iso2,
      }));

      const getSortData = sortData(result.data);
      setTableData(getSortData);
      setCountries(coun);
    });
  }, []);

  // onchange selected data
  const handleChange = (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    Axios.get(url).then((result) => {
      setCountryInfo(result.data);
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
      </div>

      <Card className="app__right">
        {/* table */}
        <h3 style={{ padding: "15px 15px 0 15px" }}>Live Cases by Country</h3>
        <Table countries={tableData} />
      </Card>
    </div>
  );
}

export default App;
