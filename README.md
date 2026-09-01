# Location Stop Announcer 🚌

A fun web app that uses your device's GPS location to detect when you're near predefined "stops", shows them on a digital departure-style board, and makes voice announcements — just like riding a bus!

Perfect for:
- Virtual bus rides / sightseeing routes
- Accessibility demos
- Learning geolocation + Web Speech API
- Custom walking tours or campus routes

## Features

- 📍 Real-time geolocation tracking (browser GPS)
- 🖼️ Digital "board" showing current / next stop (yellow-on-black classic style)
- 🔊 Voice announcements using the Web Speech API ("Next stop: ...")
- 🗺️ Simple map view of your position and stops (Leaflet + OpenStreetMap)
- ⚡ Configurable proximity threshold (default 50 meters)
- 📝 Easy to edit the list of stops in `stops.js`
- 📱 Works on mobile browsers (best experience with GPS enabled)

## Demo

Open the live page (after enabling location):

→ [Live Demo](https://winowongo2024.github.io/location-stop-announcer/) *(enable GitHub Pages if needed)*

Or just open `index.html` locally in a modern browser.

## How it works

1. Grant location permission.
2. The app continuously watches your position.
3. When you enter the radius of a stop that hasn't been announced yet, it:
   - Highlights it on the board
   - Speaks the announcement
   - Marks it as visited
4. The board always shows the nearest upcoming stop and a list of remaining ones.

## Customising the stops

Edit `stops.js`:

```js
const STOPS = [
  { id: 1, name: "Central Station", lat: 51.5308, lng: -0.1238, announcement: "Next stop: Central Station" },
  { id: 2, name: "City Park", lat: 51.5350, lng: -0.1300, announcement: "Approaching City Park. Alight here for the gardens." },
  // add more...
];
```

You can also change the detection radius in `app.js` (`PROXIMITY_METERS`).

## Running locally

Just open `index.html` in Chrome, Firefox, or Safari.  
For best results on mobile, serve it over HTTPS (or use a simple local server):

```bash
npx serve .
```

## Tech stack

- Vanilla HTML / CSS / JavaScript
- Geolocation API
- Web Speech API (SpeechSynthesis)
- Leaflet.js + OpenStreetMap for the map

## License

MIT — do whatever you want with it!

---

Made with ❤️ for fun location-based experiments.
