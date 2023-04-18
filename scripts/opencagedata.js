// Define a chave de API necessária para acessar os dados de geocodificação
const apiKey = '3fd050445dc048bdb0bb8f86f1cff18a'; // substitua sua_chave_api pela sua chave de API

// Obtém referências aos elementos HTML do formulário e do resultado
const form = document.getElementById('geocode-form');
const latitudeInput = document.getElementById('latitude-input');
const longitudeInput = document.getElementById('longitude-input');
const resultDiv = document.getElementById('result');

// Define um evento de escuta para o envio do formulário
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Previne que a página seja recarregada quando o formulário for enviado

  // Obtém as entradas de latitude e longitude do usuário e remove quaisquer espaços em branco
  const latitude = latitudeInput.value.trim();
  const longitude = longitudeInput.value.trim();

  // Verifica se as entradas são válidas; se não forem, exibe uma mensagem de erro e retorna
  if (latitude === '' || longitude === '') {
    resultDiv.innerText = 'Please enter a valid latitude and longitude.';
    return;
  }

  // Define a URL para fazer a solicitação de geocodificação para a API OpenCage
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

  try {
    // Faz uma solicitação assíncrona à API OpenCage usando a URL definida acima
    const response = await fetch(url);
    const data = await response.json();

    // Verifica se a resposta da API contém resultados; se não houver, exibe uma mensagem de erro e retorna
    if (data.results.length === 0) {
      resultDiv.innerText = 'no results found.';
      return;
    }

    // Extrai o primeiro resultado da resposta da API e formata as informações de endereço relevantes
    const result = data.results[0];
    const formatted = `${result.components.road}, ${result.components.city}, ${result.components.state}, ${result.components.country}`;

    // Exibe as informações de endereço formatadas no elemento HTML apropriado
    resultDiv.innerText = formatted;

    // Define a URL para fazer a solicitação de geocodificação para a API OpenCage
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

    // Crie um mapa Leaflet
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Adicione uma camada de mapa do OpenStreetMap
    L.tileLayer('./app/styles/leaflet.css', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    // Adicione um marcador ao mapa
    L.marker([51.5, -0.09]).addTo(map).bindPopup('I am a bookmark!').openPopup();

  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro apropriada
    console.error(error);
    resultDiv.innerText = 'An error occurred while fetching the address information.';
  }
});
