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

function makeFreelancer() {
  let name = sample(NAMES);
  let occupation = sample(OCCUPATIONS);
  let rate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));

  return { name, occupation, rate };
}

let freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
let averageRate = findAverageRate();

function findAverageRate() {
  let avgRate = freelancers.reduce(
    (avgRate, freelancer) => avgRate + freelancer.rate,
    0
  );
  return avgRate / freelancers.length;
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
