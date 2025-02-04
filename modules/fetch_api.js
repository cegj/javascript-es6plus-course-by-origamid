export function initSearchCEP(){

    const btnCep = document.forms['cep-form']['submit-cep'];

    const cepResultTemplate = document.querySelector('#cep-result-template')

    const cepResultDOM = document.querySelector('#cep-result')

    btnCep.addEventListener('click', searchCEP)

    function searchCEP(event){
        event.preventDefault();

        let cep = document.forms['cep-form']['cep'].value;

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((r) => r.json())
        .then((cepObject) => {

            let cepResult;

            if (cepObject.erro === true){
                cepResult = '<tr><td>Invalid CEP. Please, try again.</tr></td>'
            } else {

                cepResult = cepResultTemplate.innerHTML;

                Object.entries(cepObject).forEach((item) => {

                cepResult = cepResult.replace(`{{${item[0]}}}`, item[1])
            
            });
            }

            cepResultDOM.innerHTML = cepResult;
            cepResultDOM.style.display = "block";
        }
        ).catch(() => {
            let cepResult;
            cepResult = '<tr><td>There was an error. Please, check the CEP and try again.<br>For further information, open Javascript console.</tr></td>'
            cepResultDOM.innerHTML = cepResult;
            cepResultDOM.style.display = "block";
        })
    }

}

export function initBitcoinSearch(){

const bitcoinValueDOM = document.querySelector('#bitcoin-value');

function getBitcoinPrice(){
    fetch('https://blockchain.info/ticker')
    .then((r) => r.json())
    .then(bitcoinObject => bitcoinValueDOM.innerHTML = +(bitcoinObject.BRL.buy).toFixed(2))    
}

getBitcoinPrice();

setInterval(getBitcoinPrice, 15000);

}

export function initChuckNorrisJokes(){

    const chuckJokesDOM = document.querySelector('#chuck-result');
    const btnNextJoke = document.querySelector('#next-joke-btn');

    function getChuckJoke(){
        fetch('https://api.chucknorris.io/jokes/random')
        .then(r => r.json())
        .then((joke) => {
        chuckJokesDOM.innerHTML = joke.value;    
    })
    }

    getChuckJoke();

    btnNextJoke.addEventListener('click', getChuckJoke)

}

// Utilizando a API https://api.chucknorris.io/jokes/random
// retorne uma piada randomica do chucknorris, toda vez que
// clicar em próxima
