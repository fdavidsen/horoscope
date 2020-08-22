const staticAssets = [
	'./',
	'./index.html',
	'./assets/img/Aries.jpg',
	'./assets/img/Taurus.jpg',
	'./assets/img/Gemini.jpg',
	'./assets/img/Cancer.jpg',
	'./assets/img/Leo.jpg',
	'./assets/img/Virgo.jpg',
	'./assets/img/Libra.jpg',
	'./assets/img/Scorpio.jpg',
	'./assets/img/Sagittarius.jpg',
	'./assets/img/Capricorn.jpg',
	'./assets/img/Aquarius.jpg',
	'./assets/img/Pisces.jpg',
	'./assets/js/functions.js',
	'./assets/js/mapping.js',
	'./assets/js/script.js',
	'./assets/style.css'
];

self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('static').then(cache => {
			return cache.addAll(staticAssets);
		})
	);
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});