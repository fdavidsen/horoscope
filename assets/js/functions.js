const cors_anywhere = 'https://cors-anywhere.herokuapp.com/';

// http://horoscope-api.herokuapp.com
function herokuapp(sign, day) {
	return $.ajax({
		url: cors_anywhere + 'http://horoscope-api.herokuapp.com/horoscope/' + day + '/' + sign,
		type: 'GET',
		dataType: 'json'
	});
}

// aztro.sameerkumar.website
function aztro(sign, day) {
	return $.ajax({
		url: 'https://aztro.sameerkumar.website?sign=' + sign + '&day=' + day,
		type: 'POST',
		dataType: 'json'
	});
}

// Formatting result of herokuapp(sign, 'week').
function dateFormat(date) {
	const week = date.split('-');
	let newDate = new Date(week[2], week[1] - 1, week[0]);

	newDate = newDate.toString().split(' ');
	newDate = newDate[1] + ' ' + newDate[2] + ', ' + newDate[3];
	
	return newDate;
}

// Formatting result of herokuapp(sign, 'month').
function monthFormat(month) {
	const newMonth = new Date(month);
	return fullMonth[newMonth.getMonth()] + ' ' + newMonth.getFullYear();
}