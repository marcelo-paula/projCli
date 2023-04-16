const tbody = document.querySelector('tbody');

async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

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
        console.error(error.message);
    }
}

getCountries();