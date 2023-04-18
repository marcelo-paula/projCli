function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported in this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  alert("Your current location is: " + latitude + ", " + longitude);
}


// Cria o mapa
const map = L.map("mapid").setView([-23.5489, -46.6388], 13);

// Adiciona uma camada de mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Adiciona um marcador na posição atual
function onLocationFound(e) {
  const radius = e.accuracy / 2;

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("You are here!")
    .openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

// Trata erros na obtenção da localização
function onLocationError(e) {
  alert(e.message);
}

// Obtém a localização atual do usuário
map.on("locationfound", onLocationFound);
map.on("locationerror", onLocationError);
map.locate({ setView: true, maxZoom: 16 });
