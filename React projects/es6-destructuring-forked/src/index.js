import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";
import animals from "./data";

const [ani1, ani2] = animals;

const { name, sound } = ani1;

const [honda, tesla] = cars;

const {
  model: hondaModel,
  coloursByPopularity: hondacolor,
  speedStats: { topSpeed: hondaSpeed, zeroToSixty: hondazero }
} = honda;
const {
  model: teslaModel,
  coloursByPopularity: teslacolor,
  speedStats: { topSpeed: teslaSpeed, zeroToSixty: teslazero }
} = tesla;

console.log(hondaModel);

const [hcol1, hcol2] = hondacolor;
const [tcol1, tcol2] = teslacolor;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Color</th>
    </tr>
    <tr>
      <td>{hondaModel}</td>
      <td>{hondaSpeed}</td>
      <td>{hcol1}</td>
    </tr>
    <tr>
      <td>{teslaModel}</td>
      <td>{teslaSpeed}</td>
      <td>{tcol1}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
