const FILES_TO_CACHE = [
    'main.html',
    'authenticate.html',
    'manifest.webmanifest',
    '/assets/icons/airplane-icon-72.png',
    '/assets/icons/airplane-icon-96.png',
    '/assets/icons/airplane-icon-256.png',
    '/assets/images/airplane1.jpg',
    '/assets/images/logo.png',
    '/assets/images/logoSmall.png',
    '/assets/images/MenuChevron.png',
    '/assets/images/panel.jfif',
    '/assets/images/panel2.jfif',
    '/assets/images/twoPlanes.jfif',
    '/assets/js/accordion.js',
    '/assets/js/authenticate.js',
    '/assets/js/createLoops.js',
    '/assets/js/deleteFlight.js',
    '/assets/js/displayFlights.js',
    '/assets/js/editFlight.js',
    '/assets/js/getAircraftTypes.js',
    '/assets/js/globals.js',
    '/assets/js/modal.js',
    '/assets/js/printTotals.js',
    '/assets/js/stickyTableHeader.js',
    '/assets/js/writeAircraft.js',
    '/assets/js/writeFlight.js',
    '/assets/stylesheets/css/media.css',
    '/assets/stylesheets/css/modal.css',
    '/assets/stylesheets/css/signin.css',
    '/slick/fonts/slick.eot',
    '/slick/fonts/slick.svg',
    '/slick/fonts/slick.ttf',
    '/slick/fonts/slick.woff',
    '/slick/ajax-loader.gif',
    '/slick/config.rb',
    '/slick/slick.css',
    '/slick/slick.js',
    '/slick/slick.less',
    '/slick/slick-theme.css',
    '/slick/slick-theme.less',
    '/slick/slick.min.js'
  ];

  var CACHE_NAME = "my-site-cache-v1";
  const DATA_CACHE_NAME = "data-cache-v1";

  self.addEventListener("install", function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  });
  
  self.addEventListener("fetch", function(event) {
    // cache all get requests to /api routes
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(event.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(event.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else if (event.request.headers.get("accept").includes("text/html")) {
            // return the cached home page for all requests for html pages
            return caches.match("/");
          }
        });
      })
    );
  });
  
  