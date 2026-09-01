// Location Stop Announcer
// Uses Geolocation + Web Speech API + Leaflet

const PROXIMITY_METERS = 50; // announce when within this distance
const WATCH_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 5000,
  timeout: 15000
};

let watchId = null;
let map = null;
let userMarker = null;
let stopMarkers = [];
let announcedStops = new Set();
let currentPosition = null;
let voiceEnabled = true;

// Haversine distance in metres
function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function speak(text) {
  if (!voiceEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1;
  utter.volume = 1;
  // Prefer a clear English voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"))
  );
  if (preferred) utter.voice = preferred;
  window.speechSynthesis.speak(utter);
}

function updateBoard(nextStop, dist) {
  const nameEl = document.getElementById("next-stop-name");
  const distEl = document.getElementById("next-stop-dist");
  const statusEl = document.getElementById("status");

  if (!nextStop) {
    nameEl.textContent = "Route complete";
    distEl.textContent = "All stops announced";
    statusEl.textContent = "Tracking active";
    return;
  }

  nameEl.textContent = nextStop.name;
  if (dist !== null) {
    distEl.textContent = dist < 1000 ? `${Math.round(dist)} m away` : `${(dist / 1000).toFixed(1)} km away`;
  } else {
    distEl.textContent = "\u2014";
  }
  statusEl.textContent = "Tracking active \u2022 GPS live";
}

function renderStopsList(userLat, userLng) {
  const list = document.getElementById("stops-list");
  list.innerHTML = "";

  STOPS.forEach((stop) => {
    const li = document.createElement("li");
    const dist = userLat != null ? distanceMeters(userLat, userLng, stop.lat, stop.lng) : null;
    const isVisited = announcedStops.has(stop.id);
    const isNearest =
      !isVisited &&
      dist !== null &&
      STOPS.filter((s) => !announcedStops.has(s.id))
        .map((s) => distanceMeters(userLat, userLng, s.lat, s.lng))
        .every((d) => d >= dist);

    if (isVisited) li.classList.add("visited");
    if (isNearest) li.classList.add("current");

    li.innerHTML = `
      <span>${stop.name}</span>
      <span class="dist">${dist !== null ? (dist < 1000 ? Math.round(dist) + " m" : (dist / 1000).toFixed(1) + " km") : "\u2014"}</span>
    `;
    list.appendChild(li);
  });
}

function checkStops(lat, lng) {
  let nearest = null;
  let nearestDist = Infinity;

  STOPS.forEach((stop) => {
    if (announcedStops.has(stop.id)) return;
    const d = distanceMeters(lat, lng, stop.lat, stop.lng);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = stop;
    }
    if (d <= PROXIMITY_METERS) {
      // Announce!
      announcedStops.add(stop.id);
      speak(stop.announcement);
      updateBoard(nearest, nearestDist); // will refresh after
      renderStopsList(lat, lng);
    }
  });

  updateBoard(nearest, nearest === null ? null : nearestDist);
  renderStopsList(lat, lng);
}

function initMap() {
  // Centre on the Leeds–Harewood–Harrogate corridor
  map = L.map("map").setView([53.90, -1.52], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  // Add stop markers
  STOPS.forEach((stop) => {
    const marker = L.marker([stop.lat, stop.lng], {
      title: stop.name
    }).addTo(map);
    marker.bindPopup(`<b>${stop.name}</b>`);
    stopMarkers.push(marker);
  });
}

function updateUserMarker(lat, lng) {
  if (!map) return;
  if (!userMarker) {
    userMarker = L.circleMarker([lat, lng], {
      radius: 8,
      color: "#facc15",
      fillColor: "#facc15",
      fillOpacity: 0.9,
      weight: 2
    }).addTo(map);
    userMarker.bindPopup("You are here");
  } else {
    userMarker.setLatLng([lat, lng]);
  }
  map.panTo([lat, lng], { animate: true, duration: 0.5 });
}

function onPosition(pos) {
  const { latitude, longitude, accuracy } = pos.coords;
  currentPosition = { lat: latitude, lng: longitude };
  updateUserMarker(latitude, longitude);
  checkStops(latitude, longitude);

  document.getElementById("status").textContent =
    `Tracking active \u2022 \u00b1${Math.round(accuracy)} m`;
}

function onError(err) {
  console.warn(err);
  document.getElementById("status").textContent =
    err.code === 1 ? "Location permission denied" : "Unable to get location";
  document.getElementById("next-stop-name").textContent = "Location unavailable";
}

function startTracking() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }
  if (watchId !== null) return; // already running

  document.getElementById("start-btn").textContent = "Tracking\u2026";
  document.getElementById("start-btn").disabled = true;
  document.getElementById("announce-btn").disabled = false;

  watchId = navigator.geolocation.watchPosition(onPosition, onError, WATCH_OPTIONS);
}

function testAnnouncement() {
  const remaining = STOPS.filter((s) => !announcedStops.has(s.id));
  if (remaining.length === 0) {
    speak("All stops have already been announced.");
    return;
  }
  speak(remaining[0].announcement);
}

// UI wiring
document.getElementById("start-btn").addEventListener("click", startTracking);
document.getElementById("announce-btn").addEventListener("click", testAnnouncement);
document.getElementById("voice-toggle").addEventListener("change", (e) => {
  voiceEnabled = e.target.checked;
});

// Init
window.addEventListener("load", () => {
  initMap();
  renderStopsList(null, null);
  // Load voices (some browsers need this)
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {};
  }
});
