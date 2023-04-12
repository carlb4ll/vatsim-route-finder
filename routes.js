getLocation("Location");

async function getRoutes() {
  const response = await fetch("routes.json");
  const routes = await response.json();
  const aircraft = [...new Set(routes.map((item) => item.Reg))];

  //random Aircraft
  let randomAircraft = getRandomInt(aircraft.length);
  let currentAircraft = aircraft[randomAircraft];

  //find location from local storage

  //Find location of chosen aircraft
  let currentAircraftLocation = aircraftLocation.find(
    (item) => item.Reg === currentAircraft
  );
  let departureLocation = currentAircraftLocation.Location;

  // filter route data with current aircraft and it's location
  let currentRoutes = routes.filter(function (entry) {
    return entry.Reg === currentAircraft && entry.From === departureLocation;
  });

  //random route from current aircraft
  let randomRoute = getRandomInt(currentRoutes.length);
  let route = currentRoutes[randomRoute];

  //populate route based on checkbox
  let time1 = parseInt(route["Block Time"].replace(":", ""));

  if (document.getElementById("time").checked && time1 > 400) {
    saveLocation(route);
  } else {
    saveLocation(route);
    populateRoute(route);
  }

  getLocation("Location");
}

// Randomise function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//function to populate the route into the HTML
function populateRoute(obj) {
  const header = document.getElementById("test");
  const fragment = document.createDocumentFragment();

  const myAirline = document.createElement("h1");
  const myDeparture = document.createElement("h2");
  const myDestination = document.createElement("h2");
  const myFlightnumber = document.createElement("h3");
  const myCallsign = document.createElement("h3");
  const myBlocktime = document.createElement("h3");

  myAirline.textContent = `${obj.Airline} | ${obj.Aircraft} | ${obj.Reg}`;
  myDeparture.textContent = `Departure: ${obj.Departure} - ${obj.From}`;
  myDestination.textContent = `Destination: ${obj.Destination} - ${obj.To}`;
  myFlightnumber.textContent = `Flight No: ${obj["Flight No "]}`;
  myCallsign.textContent = `Callsign: ${obj.Callsign}`;
  myBlocktime.textContent = `Block Time: ${obj["Block Time"]}`;

  fragment.appendChild(myAirline);
  fragment.appendChild(myDeparture);
  fragment.appendChild(myDestination);
  fragment.appendChild(myFlightnumber);
  fragment.appendChild(myCallsign);
  fragment.appendChild(myBlocktime);

  header.appendChild(fragment);
}

//Reset Locations
async function resetLocation() {
  try {
    const response = await fetch("homeLocation.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    baseLocation = data;
    console.log("JSON data", data);
  } catch (error) {
    console.error("Fetch error", error);
  }
  localStorage.setItem("Location", JSON.stringify(baseLocation));
  getLocation("Location");
}

// Get Location
function getLocation(name) {
  if (localStorage.getItem(name)) {
    aircraftLocation = JSON.parse(localStorage.getItem(name));
    console.log("local-storage", aircraftLocation);
  } else {
    console.log("no location data");
  }
  document.getElementById("myTable").innerHTML = "";
  let table = document.getElementById("myTable");

  for (let i = 0; i < aircraftLocation.length; i++) {
    let row = `<tr>
            <td>${aircraftLocation[i].Reg}</td>
            <td>${aircraftLocation[i].Location}</td>
          </tr>`;
    table.innerHTML += row;
  }
}

// Save location
function saveLocation(arr) {
  const index = aircraftLocation.findIndex((obj) => {
    return obj.Reg === arr.Reg;
  });
  aircraftLocation[index].Location = arr.To;
  localStorage.setItem("Location", JSON.stringify(aircraftLocation));
}

function clearFlight() {
  document.getElementById("test").innerHTML = "";
}
