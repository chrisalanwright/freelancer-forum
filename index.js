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
  let rate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));

  return { name, occupation, rate };
}

function findAverageRate() {
  let total = freelancers.reduce(
    (total, freelancer) => total + freelancer.rate,
    0
  );
  return total / freelancers.length;
}

function singleFreelancer({ name, occupation, rate }) {
  let $fl = document.createElement("fl");
  $fl.innerHTML = `
      <td>${name}</td>
      <td>Occupation: ${occupation}</td>
      <td>Rate: $${rate}/hr</td>
    `;
  return $fl;
}

function multipleFreelancers() {
  let $table = document.createElement("table");
  let $freelancers = freelancers.map(singleFreelancer);
  $table.replaceChildren(...$freelancers);
  return $table;
}

function averageRate() {
  let $p = document.createElement("p");
  $p.innerText = `Average Rate: $${averageRate}/hr`;
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
        <tbody id="FreelancerRows"></tbody>
    </table>
  `;
  $app.querySelector("averageRate").replaceWith(averageRate());
  $app
    .querySelector("#FreelancerRows")
    .replaceChildren(...freelancers.map(multipleFreelancers));
}
