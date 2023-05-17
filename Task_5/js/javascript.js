function getRequestParameters() {
    const pageNumberValue = Number(document.querySelector('.j-page-number-input').value);
    const limitValue = Number(document.querySelector('.j-limit-input').value);
    return [pageNumberValue, limitValue];
}

function checkParameters(parameters) {
    const pageNumberValueIsCorrect = Number.isInteger(parameters[0]) && parameters[0] >= 1 && parameters[0] <= 10;
    const limitValueIsCorrect = Number.isInteger(parameters[1]) && parameters[1] >=1 && parameters[1] <=10;
    if (!pageNumberValueIsCorrect && limitValueIsCorrect) {
        return [false, 'Номер страницы вне диапазона от 1 до 10'];
    }
    else if (pageNumberValueIsCorrect && !limitValueIsCorrect) {
        return [false, 'Лимит вне диапазона от 1 до 10'];
    }
    else if (!pageNumberValueIsCorrect && !limitValueIsCorrect) {
        return [false, 'Номер страницы и лимит вне диапазона от 1 до 10'];
    }
    else {
        return [true, 'parametersIsCorrect'];
    }
}

function displayError(textError) {
    resultNode.innerHTML = `<p>${textError}<p>`
}

function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-image"/>
                <p>${item.author}</p>
            </div>
            `;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

const useRequest = (requestParameters) => {
    return fetch(`https://picsum.photos/v2/list?page=${requestParameters[0]}&limit=${requestParameters[1]}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => { return json; })
      .catch(() => { console.log('error') });
  }
  

const resultNode = document.querySelector('.j-result');
const btn = document.querySelector('.j-btn-request');

if (localStorage.getItem('jsonData')) {
    displayResult(JSON.parse(localStorage.getItem('jsonData')));
}

btn.addEventListener('click', async () => {
    localStorage.clear();
    const requestParameters = getRequestParameters();
    const checkParametersResult = checkParameters(requestParameters);
    if (!checkParametersResult[0]) {
        displayError(checkParametersResult[1]);
    }
    else {
        const requestResult = await useRequest(requestParameters);
        localStorage.setItem('jsonData', JSON.stringify(requestResult));
        displayResult(requestResult);
    }
})