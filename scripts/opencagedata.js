const apiKey = '3fd050445dc048bdb0bb8f86f1cff18a'; // substitua sua_chave_api pela sua chave de API

const form = document.getElementById('geocode-form');
const latitudeInput = document.getElementById('latitude-input');
const longitudeInput = document.getElementById('longitude-input');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const latitude = latitudeInput.value.trim();
  const longitude = longitudeInput.value.trim();

  if (latitude === '' || longitude === '') {
    resultDiv.innerText = 'Por favor, insira uma latitude e longitude válidas.';
    return;
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      resultDiv.innerText = 'Nenhum resultado encontrado.';
      return;
    }

    const result = data.results[0];
    const formatted = `${result.components.road}, ${result.components.city}, ${result.components.state}, ${result.components.country}`;

    resultDiv.innerText = formatted;

    // Crie um mapa Leaflet
    var map = L.map('map').setView([51.505, -0.09], 13);
        
    // Adicione uma camada de mapa do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    
    // Adicione um marcador ao mapa
    L.marker([51.5, -0.09]).addTo(map).bindPopup('Eu sou um marcador!').openPopup();
  } catch (error) {
    console.error(error);
    resultDiv.innerText = 'Ocorreu um erro ao buscar as informações de endereço.';
  }
});
