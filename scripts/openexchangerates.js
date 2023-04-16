const appId = 'b43d7fad7e524dffac6d90180fbf46e9';
const currencySelector = document.getElementById('currency');
const rateDisplay = document.getElementById('rate');
const currenciesList = document.getElementById('currencies-list');

async function getExchangeRate() {
    const currencyCode = currencySelector.value;

    try {
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}&base=USD&symbols=${currencyCode}`);
        const data = await response.json();

        const exchangeRate = data.rates[currencyCode];
        rateDisplay.textContent = exchangeRate.toFixed(2);
    } catch (error) {
        console.error(error.message);
    }
}

async function getCurrencies() {
    try {
        const response = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${appId}`);
        const data = await response.json();

        currenciesList.innerHTML = '';

        for (const [code, name] of Object.entries(data)) {
            const listItem = `<li>${code} - ${name}</li>`;
            currenciesList.insertAdjacentHTML('beforeend', listItem);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// call getCurrencies on page load
getCurrencies();