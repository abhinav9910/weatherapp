const api = {
	key: 'cce17802e59541778a785657201505',
	base: 'https://api.weatherapi.com/v1/',
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
	if (e.keyCode === 13) {
		getTemp(searchBox.value);
	}
}

function getTemp(query) {
	fetch(`${api.base}forecast.json?key=${api.key}&q=${query}`)
		.then((res) => res.json())
		.then((data) => displayTemp(data))
		.catch((error) => console.log(error.message));
}
function displayTemp(data) {
	let city = document.querySelector('.city');
	city.innerText = `${data.location.name}, ${data.location.country}`;

	let now = new Date();
	let date = document.querySelector('.date');
	date.innerText = getDate(now);

	let temp = document.querySelector('.temp');
	temp.innerHTML = `${Math.round(data.current.temp_c)}<span>°C</span>`;

	let weather = document.querySelector('.weather');
	weather.innerText = data.current.condition.text;

	let icon = document.querySelector('.weather-icon');
	icon.innerHTML = 'data.current.condition.icon';

	let hilow = document.querySelector('.hi-low');
	hilow.innerText = `${Math.round(
		data.forecast.forecastday[0].day.maxtemp_c
	)}°C / ${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°C`;
}
// function setIcons(icon, iconID) {
// 	let skycons = new Skycons({ color: 'red' });
// 	const currentIcon = icon.toUpperCase();
// 	skycons.play();
// 	return skycons.set(iconID, Skycons[currentIcon]);
// }
function getDate(d) {
	let months = [
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
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
