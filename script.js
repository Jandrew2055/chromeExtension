const daysTag = document.querySelector('.days'),
  currentDate = document.querySelector('.current-date'),
  prevNextIcon = document.querySelectorAll('.icons span');

// Get new date (mm/dd/yy)
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// Array w/ all months
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Render Calendar
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // last day of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // last day of previous month
  let liTag = '';

  for (let i = firstDayofMonth; i > 0; i--) {
    // list of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // list of all days of current month
    // adding active class to li... logic: the current day, month, and year matches
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? 'active'
        : '';
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // list of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // pass current month and year as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // previous and next icons
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar();
  });
});

const apiKey = '5d135eeed8ef4789bca90723db711ea6';
const selectedCity = 'New York';

const response = fetch(
  `https://api.weatherbit.io/v2.0/current?city=${selectedCity}&key=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    const weather = document.getElementById('weatherData'); //grabs current p tag element
    const node = document.createTextNode(
      `New York City | Temperature: ${celsiusToFahrenheit(
        data.data[0]['temp']
      )}°` //creates the text for the p tag element
    );
    weather.appendChild(node); //appends the temperature to the p tag element created
    // let footerDiv = document.getElementById('footer'); // grabs the footer div
    // footerDiv.appendChild(weather); //appends our weather data to the footer

    console.log(celsiusToFahrenheit(data.data[0]['temp']));
  });

function celsiusToFahrenheit(arg) {
  return arg * (9 / 5) + 32;
}
