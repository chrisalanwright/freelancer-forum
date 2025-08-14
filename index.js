/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

let freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
let averageRate = findAverageRate();

function makeFreelancer() {
  let name = sample(NAMES);
  let occupation = sample(OCCUPATIONS);
  let rate =
    PRICE_RANGE.min +
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));

  return { name, occupation, rate };
}

function findAverageRate() {
  let total = freelancers.reduce(
    (total, freelancer) => total + freelancer.rate,
    0
  );
  return total / freelancers.length;
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function singleFreelancer({ name, occupation, rate }) {
  let $tr = document.createElement("tr");
  $tr.innerHTML = `
      <td>${name}</td>
      <td>${occupation}</td>
      <td>$${rate}/hr</td>
    `;
  return $tr;
}

function multipleFreelancers() {
  let $table = document.createElement("table");
  let $freelancers = freelancers.map(singleFreelancer);
  $table.replaceChildren(...$freelancers);
  return $table;
}

function AverageRate() {
  let $p = document.createElement("p");
  $p.textContent = `The average rate is $${averageRate.toFixed(2)}.`;
  return $p;
}

function render() {
  let $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <p>Welcome to the Freelancer Forum! Here you can find freelancers for various tasks.</p>
    <averageRate></averageRate>
    <h2>Freelancers</h2>
    <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Occupation</th>
            <th>Rate</th>
            </tr>
        </thead>
        <tbody id="multipleFreelancers"></tbody>
    </table>
  `;
  $app.querySelector("AverageRate").replaceWith(AverageRate());
  $app
    .querySelector("#multipleFreelancers")
    .replaceChildren(...freelancers.map(multipleFreelancers));
}

render();
