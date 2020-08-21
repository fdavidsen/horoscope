// PWA
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js').then(registration => {
		console.log('SW Registered!');
		console.log(registration);
	}).catch(error => {
		console.log('SW Registration Failed!');
		console.log(error);
	});
}

// When zodiac is selected.
$('select#zodiacOptions').change(function() {
	const sign = $(this).children('option:selected').val();
	$('.card-title').html(sign);
	$('.greeting').html('Hello, ' + zodiacs.get(sign));
	$('.zodiac-picture').attr('src', 'assets/img/' + sign + '.jpg');
	$('.spinner-overlay').removeAttr('hidden');

	$.when(herokuapp(sign, 'today')).done(function(data) {
		$('#description').html(data.horoscope);
	});

	$.when(aztro(sign, 'today')).done(function(data) {
		$('.card-subtitle').html(data.date_range);
		$('#description-today').html(data.description);
		$('#current-date').html(data.current_date);
		$('#color').html(data.color);
		$('#mood').html(data.mood);
		$('#compatibility').html(data.compatibility);
		$('#lucky-time').html(data.lucky_time);
		$('#lucky-number').html(data.lucky_number);
		$('#home').removeAttr('hidden');
		$('#zodiac-table').attr('hidden', '');
		$('.spinner-overlay').attr('hidden', '');
	});
	
	$.when(aztro(sign, 'tomorrow')).done(function(data) {
		$('#tomorrow').html('Tomorrow:&emsp;' + data.current_date);
		$('#tomorrow-content').html(data.description);
		$('#features').removeAttr('hidden');
		$('#features-nav').removeAttr('hidden');
	});

	$.when(herokuapp(sign, 'week')).done(function(data) {
		const week = data.week.split(' - ');
		const weekStart = dateFormat(week[0]);
		const weekEnd = dateFormat(week[1]);

		$('#week').html('Week:&emsp;' + weekStart + ' - ' + weekEnd);
		$('#week-content').html(data.horoscope);
	});

	$.when(herokuapp(sign, 'month')).done(function(data) {
		const month = monthFormat(data.month);
		
		$('#month').html('Month:&emsp;' + month);
		$('#month-content').html(data.horoscope);
	});

	$.when(herokuapp(sign, 'year')).done(function(data) {
		$('#year').html('Year:&emsp;' + data.year);
		$('#year-content').append(data.horoscope);
	});
});