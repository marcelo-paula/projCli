// Obtém referências aos elementos HTML do formulário e do resultado
const tbody = document.querySelector('tbody');

async function getCountries() {
    try {
        //define url para fazer requisição na API
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        //faz um loop para trazer os dados
        data.forEach(country => {
            const { name, capital, population, flags } = country;

            const row = `
                        <tr>
                            <td>${name.common}</td>
                            <td>${capital?.[0] || ''}</td>
                            <td>${population?.toLocaleString() || ''}</td>
                            <td class='img'><img src="${flags?.png || ''}"></td>
                        </tr>
                    `;

            tbody.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        //caso erro
        console.error(error.message);
    }
}

//chama a função
getCountries();