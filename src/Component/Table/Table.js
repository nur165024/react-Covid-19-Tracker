import React from "react";
import "./Table.css";

const Table = ({ countries }) => {
  console.log(countries);
  return (
    <div className="table">
      {countries.map(({ country, cases }, index) => (
        <tr key={index}>
          <td>
            <span>{index + 1}.</span>
            {country}
          </td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
