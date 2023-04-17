const form = document.querySelector('form');
const estado = document.querySelector('#estado');
const pais = document.querySelector('#pais');
const map = document.querySelector('#map');

const apiKey = 'Aiur06TlBNSIKZxP7AUL2_8A0Dk18gfjc7y8apI7OjhbEWxS79nIbFN9NAG-qz9v';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  console.log("oi")

  const estadoValor = estado.value.trim();
  const paisValor = pais.value.trim();

  if (!estadoValor || !paisValor) {
    alert('Digite o estado e o país!');
    return;
  }

  const url = `https://dev.virtualearth.net/REST/v1/Traffic/Incidents/${paisValor}/${estadoValor}?key=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados');
      }
      return response.json();
    })
    .then(data => mostrarDados(data.resourceSets[0].resources))
    .catch(erro => console.log(erro));
});

function mostrarDados(data) {
  map.innerHTML = '';

  const mapOptions = {
    credentials: apiKey,
    center: new Microsoft.Maps.Location(data[0].geolocation.coordinates[0], data[0].geolocation.coordinates[1]),
    zoom: 10
  };

  const mapa = new Microsoft.Maps.Map('#map', mapOptions);

  for (let i = 0; i < data.length; i++) {
    const incidente = data[i];
    const localizacao = new Microsoft.Maps.Location(incidente.geolocation.coordinates[0], incidente.geolocation.coordinates[1]);

    const pushpin = new Microsoft.Maps.Pushpin(localizacao, {
      title: incidente.description,
      subTitle: incidente.roadClosed ? 'Estrada fechada' : 'Estrada aberta',
      icon: incidente.roadClosed ? 'https://bingmapsdemos.blob.core.windows.net/images/traffic-closed.png' : 'https://bingmapsdemos.blob.core.windows.net/images/traffic-congestion.png'
    });
    
    mapa.entities.push(pushpin);
  }
} 
