function getDataRequest() {
    let widthValue = Number(document.querySelector('.j-width-input').value);
    let heightValue = Number(document.querySelector('.j-height-input').value);
    console.log(widthValue, heightValue);
    return [widthValue, heightValue];
}

function isError(dataRequest) {
    return !Number.isInteger(dataRequest[0]) || dataRequest[0] < 100 || dataRequest[0] > 300 
    || !Number.isInteger(dataRequest[1]) || dataRequest[1] < 100 || dataRequest[1] > 300
}

function displayError() {
    resultNode.innerHTML = `<p>одно из чисел вне диапазона от 100 до 300<p>`;
}

function displayResult(resultData) {
    resultNode.innerHTML = `
    <div class="card">
        <img src="${resultData}" class="card-image"/>
    </div>
    `;
}

const useRequest = (dataRequest) => {
    return fetch(`https://picsum.photos/${dataRequest[0]}/${dataRequest[1]}`)
        .then((response) => {
            return response.url;
      });
}

const btn = document.querySelector('.j-btn-request');
const resultNode = document.querySelector('.j-result');

btn.addEventListener('click', async () => {
    const dataRequest = getDataRequest();
    if (isError(dataRequest)) {
        displayError()
    }
    else {
        const requestResult = await useRequest(dataRequest);
        displayResult(requestResult);
        console.log(requestResult);
    }
})