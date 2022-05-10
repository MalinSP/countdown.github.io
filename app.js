const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const items = document.querySelectorAll(".deadline-format h4");
const deadline = document.querySelector(".deadline");

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();

let futureDate = new Date(currentYear, currentMonth, currentDay + 5, 11, 30, 0);
// console.log(futureDate);
const year = futureDate.getFullYear();
let month = futureDate.getMonth();
month = months[month];
let date = futureDate.getDate();
let weekday = weekdays[futureDate.getDay()];

const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

giveaway.textContent = `Giveaway Ends On ${weekday} ${date} ${month} ${year} ${hours}:${minutes}`;

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;

  //1s = 1000 ms
  //1m = 60s
  //1h = 60m
  //1d = 24h

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let min = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  const values = [days, hours, min, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `Sorry, the offer has expired`;
  }
}

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
