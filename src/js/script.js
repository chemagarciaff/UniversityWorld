// Variables

let dropdown = document.getElementById('dropdown');
let form = document.getElementById('form');
let coin =document.getElementById('logo-coin');
let main = document.getElementById('main');
let cards = document.getElementById('cards');



// Methods
const rotateCoin = () => {
    coin.classList.add('rotateCoin');
    console.log('hola');
}



let formShown = false;
const showForm = () => {

    if(!formShown){
        form.classList.remove('hidden');
        form.classList.add('block');
    }else{
        form.classList.remove('block');
        form.classList.add('hidden');
    }

    formShown = !formShown;
}





// Events
dropdown.addEventListener('click', showForm);
coin.addEventListener('mouseover', rotateCoin);
coin.addEventListener('animationend', () => {
    coin.classList.remove('rotateCoin');
})




// Peticiones a api de youutube (abajo)

// const myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };

// fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=chemistry%7Cadolf%7Cvon%7Cbaeyer&key=AIzaSyC3nx67gWQUBQz-iNj2jsn3Xa9sDZM6aA0", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));




// Peticiones a api de Premios nobel

const getNobelPrices = async () => {
    const results = await fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=676");

    let data = await results.json();

    return data.nobelPrizes;
}

const loadNobelPrices = async () => {
    let nobelPrizes = await getNobelPrices();

    let fragment = document.createDocumentFragment();

    nobelPrizes.forEach(nobel => {
        fragment.appendChild(createCard(nobel));
        // createCard(nobel);
    });

    cards.append(fragment);
}

const createCard = (nobel) => {
    let card = document.createElement('DIV');
    card.classList.add('w-[280px]', 'py-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-center', 'border', 'border-gray-300');
    let title = document.createElement('H3');
    title.textContent = nobel.awardYear;
    let category = document.createElement('H2');
    category.textContent = nobel.category.en;
    category.style.fontSize = '28px';
    category.style.textAlign = 'center';
    // nobel.laureates.forEach(laureate => {

    // })
    card.append(category, title);
    return card;
}

document.addEventListener('DOMContentLoaded', loadNobelPrices)