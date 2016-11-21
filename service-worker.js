
/*
 --------------------------------------------------------------------
 Basic offline support
 --------------------------------------------------------------------
 */

var CACHE_NAME = 'myCacheV1';
var urlsToCache = [
	'/',
	'/public/style.css',
	'index.js'
];

// Install our service worker:
self.addEventListener('install', function(evt) {
	evt.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Open cache');
				return cache.addAll(urlsToCache);
			})
	);
});

// Listen for a fetch event:
self.addEventListener('fetch', function(evt) {
	evt.respondWith(
		caches.match(evt.request)
			.then(function(response) {
				if (response) {
					return response;
				}
				return fetch(evt.request);
			})
	);
});