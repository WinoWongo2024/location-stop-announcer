// Leeds → Harrogate via Harewood (inspired by the real 36 bus route)
// Lots of stops in Leeds, many between via Harewood, and plenty in Harrogate.
// Includes county-style announcements (West Yorkshire / North Yorkshire).

const STOPS = [
  // ===== LEEDS (West Yorkshire) =====
  {
    id: 1,
    name: "Leeds City Bus Station",
    lat: 53.7969,
    lng: -1.5353,
    announcement: "Welcome aboard. This is Leeds City Bus Station, West Yorkshire. Next stop towards Harrogate via Harewood."
  },
  {
    id: 2,
    name: "Leeds Vicar Lane",
    lat: 53.7985,
    lng: -1.5400,
    announcement: "Next stop: Vicar Lane, Leeds city centre."
  },
  {
    id: 3,
    name: "Sheepscar Junction",
    lat: 53.8080,
    lng: -1.5350,
    announcement: "Approaching Sheepscar Junction."
  },
  {
    id: 4,
    name: "Chapel Allerton Hospital",
    lat: 53.8250,
    lng: -1.5300,
    announcement: "Next stop: Chapel Allerton Hospital."
  },
  {
    id: 5,
    name: "Moortown Corner",
    lat: 53.8433,
    lng: -1.5336,
    announcement: "Moortown Corner, Leeds. Local shops and services."
  },
  {
    id: 6,
    name: "Moortown Street Lane",
    lat: 53.8480,
    lng: -1.5320,
    announcement: "Street Lane, Moortown."
  },
  {
    id: 7,
    name: "Alwoodley Gates",
    lat: 53.8600,
    lng: -1.5300,
    announcement: "Alwoodley Gates. Leaving the outer suburbs of Leeds."
  },
  {
    id: 8,
    name: "Eccup Reservoir",
    lat: 53.8700,
    lng: -1.5250,
    announcement: "Passing Eccup Reservoir. Beautiful countryside ahead."
  },
  {
    id: 9,
    name: "Wike Lane",
    lat: 53.8850,
    lng: -1.5200,
    announcement: "Wike Lane. Entering the rural stretch towards Harewood."
  },

  // ===== BETWEEN LEEDS & HARROGATE (via Harewood) =====
  {
    id: 10,
    name: "Harewood Arms",
    lat: 53.9014,
    lng: -1.5122,
    announcement: "Harewood Arms. Alight here for Harewood House and the village. You are now approaching the North Yorkshire border."
  },
  {
    id: 11,
    name: "Harewood Village",
    lat: 53.9000,
    lng: -1.5100,
    announcement: "Harewood Village centre. Historic estate and gardens nearby."
  },
  {
    id: 12,
    name: "Harewood Bridge",
    lat: 53.9050,
    lng: -1.5050,
    announcement: "Crossing Harewood Bridge over the River Wharfe."
  },
  {
    id: 13,
    name: "Kirkby Overblow",
    lat: 53.9200,
    lng: -1.5000,
    announcement: "Kirkby Overblow. Quiet North Yorkshire village."
  },
  {
    id: 14,
    name: "Rigton Lane End",
    lat: 53.9350,
    lng: -1.5100,
    announcement: "Rigton Lane End. Continuing towards Harrogate."
  },
  {
    id: 15,
    name: "Spacey Houses / Pannal",
    lat: 53.9550,
    lng: -1.5200,
    announcement: "Spacey Houses and Pannal area. Almost into Harrogate."
  },
  {
    id: 16,
    name: "Oatlands Corner",
    lat: 53.9700,
    lng: -1.5300,
    announcement: "Oatlands Corner, southern Harrogate."
  },

  // ===== HARROGATE (North Yorkshire) =====
  {
    id: 17,
    name: "Prince of Wales Roundabout",
    lat: 53.9800,
    lng: -1.5350,
    announcement: "Prince of Wales Roundabout, Harrogate."
  },
  {
    id: 18,
    name: "Harrogate Asda",
    lat: 53.9850,
    lng: -1.5370,
    announcement: "Harrogate Asda."
  },
  {
    id: 19,
    name: "West Park / Convention Centre",
    lat: 53.9900,
    lng: -1.5400,
    announcement: "West Park and Harrogate Convention Centre."
  },
  {
    id: 20,
    name: "Harrogate War Memorial",
    lat: 53.9920,
    lng: -1.5390,
    announcement: "Harrogate War Memorial."
  },
  {
    id: 21,
    name: "Harrogate Bus Station",
    lat: 53.9942,
    lng: -1.5384,
    announcement: "Final stop: Harrogate Bus Station, North Yorkshire. Thank you for travelling with us. Welcome to the spa town of Harrogate!"
  },
  {
    id: 22,
    name: "Harrogate Station Parade",
    lat: 53.9935,
    lng: -1.5375,
    announcement: "Station Parade, Harrogate town centre. Shops, Bettys Tea Rooms and the Stray nearby."
  },
  {
    id: 23,
    name: "Harrogate Valley Gardens",
    lat: 53.9950,
    lng: -1.5450,
    announcement: "Valley Gardens. Beautiful park and Turkish Baths area."
  },
  {
    id: 24,
    name: "Harrogate Royal Hall",
    lat: 53.9960,
    lng: -1.5420,
    announcement: "Royal Hall and Cheltenham Crescent."
  }
];
