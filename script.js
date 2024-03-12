// Define the metro stations and their connections (graph)
const metroStations = {
  'Pune City (MRSTC, City Bus Stand, Autos, Taxis, PMC)': {
    'Shivaji Nagar (MRSTC, Shivaji Nagar Bus Stand, Autos, PMC)': 10,
    'Khadki (Ammunition Factory, BDL, Ring Sights India Pvt Ltd)': 5,
  },
  'Shivaji Nagar (MRSTC, Shivaji Nagar Bus Stand, Autos, PMC)': {
    'Pune City (MRSTC, City Bus Stand, Autos, Taxis, PMC)': 10,
    'Khadki (Ammunition Factory, BDL, Ring Sights India Pvt Ltd)': 10,
    'Dapodi (CME Museum)': 20,
  },
  'Khadki (Ammunition Factory, BDL, Ring Sights India Pvt Ltd)': {
    'Pune City (MRSTC, City Bus Stand, Autos, Taxis, PMC)': 5,
    'Shivaji Nagar (MRSTC, Shivaji Nagar Bus Stand, Autos, PMC)': 10,
    'Dapodi (CME Museum)': 10,
    'Kasarwadi (Air Vents & Glass Factory)': 20,
  },
  'Dapodi (CME Museum)': {
    'Shivaji Nagar (MRSTC, Shivaji Nagar Bus Stand, Autos, PMC)': 20,
    'Khadki (Ammunition Factory, BDL, Ring Sights India Pvt Ltd)': 10,
    'Kasarwadi (Air Vents & Glass Factory)': 10,
    'Dehu Rd (Army AOC & ASC 512 Base repair Depots)': 30,
  },
  'Kasarwadi (Air Vents & Glass Factory)': {
    'Khadki (Ammunition Factory, BDL, Ring Sights India Pvt Ltd)': 20,
    'Dapodi (CME Museum)': 10,
    'Dehu Rd (Army AOC & ASC 512 Base repair Depots)': 20,
  },
  'Dehu Rd (Army AOC & ASC 512 Base repair Depots)': {
    'Dapodi (CME Museum)': 30,
    'Kasarwadi (Air Vents & Glass Factory)': 20,
    'Begdewadi (Loco Sheds)': 20,
  },
  'Begdewadi (Loco Sheds)': {
    'Dehu Rd (Army AOC & ASC 512 Base repair Depots)': 20,
    'Ghorawadi': 20,
  },
  'Ghorawadi': {
    'Begdewadi (Loco Sheds)': 20,
    'Talegaon Dabhade': 20,
  },
  'Talegaon Dabhade': {
    'Ghorawadi': 20,
    'Wadgaon (PWD bungalow)': 20,
  },
  'Wadgaon (PWD bungalow)': {
    'Talegaon Dabhade': 20,
    'Hinjewadi': 20,
  },
  'Hinjewadi': {
    'Wadgaon (PWD bungalow)': 20,
    'Baner': 20,
  },
  'Baner': {
    'Hinjewadi': 20,
    'Wakad': 20,
  },
  'Wakad': {
    'Baner': 20,
    'Pimple Saudagar': 20,
  },
  'Pimple Saudagar': {
    'Wakad': 20,
  },
  'Pimpri (Pimpri Plant, TATA Plant)': {
    'Chinchwad (Bride Industries Ltd)': 3,    
  },
  'Chinchwad (Bride Industries Ltd)': {
    'Akurdi (Force Motors Plant, Bajaj Tempo)': 6,
    'Hinjewadi': 11,
  },
  'Akurdi (Force Motors Plant, Bajaj Tempo)': {
    'Dehu Rd (Army AOC & ASC 512 Base repair Depots)': 7,
  },
};

// Function to calculate the shortest route and fare
function calculate() {
  // Get the source and destination stations from the dropdowns
  const sourceStation = document.getElementById('source').value;
  const destinationStation = document.getElementById('destination').value;

  // Check if source and destination are selected
  if (sourceStation === '' || destinationStation === '') {
    alert('Please select source and destination stations.');
    return;
  }

  // Dijkstra's algorithm implementation to find the shortest route and fare
  const stations = Object.keys(metroStations);
  const INF = Number.MAX_SAFE_INTEGER;

  // Create a distance matrix and initialize with Infinity
  const distances = {};
  stations.forEach((station) => (distances[station] = INF));
  distances[sourceStation] = 0;

  const visited = {};
  const path = {};

  while (true) {
    let currentStation = null;

    // Find the nearest station
    stations.forEach((station) => {
      if (
        !visited[station] &&
        (currentStation === null ||
          distances[station] < distances[currentStation])
      ) {
        currentStation = station;
      }
    });

    if (currentStation === null || distances[currentStation] === INF) {
      break;
    }

    visited[currentStation] = true;

    // Update distances to adjacent stations
    for (const neighbor in metroStations[currentStation]) {
      const distance =
        distances[currentStation] + metroStations[currentStation][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        path[neighbor] = currentStation;
      }
    }
  }

  // Build the route and calculate the fare
  const route = [];
  let current = destinationStation;
  while (current !== sourceStation) {
    route.unshift(current);
    current = path[current];
  }
  route.unshift(sourceStation);

  const fare = distances[destinationStation];

  // Display the results
  document.getElementById('route').textContent = route.join(' -> ');
  document.getElementById('fare').textContent = fare + ' units'; // You can replace 'units' with your currency
}
