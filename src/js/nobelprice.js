// Variables
let dropdown = document.getElementById('dropdown');
let form = document.getElementById('form');
let coin =document.getElementById('logo-coin');
let main = document.getElementById('main');
let cards = document.getElementById('cards');


// Methods
const rotateCoin = () => {
    coin.classList.add('rotateCoin');
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







// const getArticles = async () => {
//     const results = await fetch("https://api.core.ac.uk/v3/search/works?api_key=ItmjpOsLC8bYwvlTdgR35x7c9yAh12Fk&q=chemistry%20nobel%201901");

//     let data = await results.json();

//     console.log(data);
// }
// getArticles();

let nobelPrizes;
let chosenPrize;

const getNobelPrize = () => {
    nobelPrizes = JSON.parse(localStorage.getItem('nobelPrizes'));
    chosenPrize = nobelPrizes.filter(nobel => nobel.awardYear == year && nobel.category.en == category)
}



let year;
let category;

const getParams = () => {
    let urlParams = new URLSearchParams(window.location.search);
    
    year = urlParams.get('year'); 
    category = urlParams.get('category');  
}

const setInfo = () => {
    let title = document.getElementById('title');
    title.textContent = "The Nobel Prize in " + category + " " + year;

    let nobelPrizeYear = document.getElementById('nobelPrizeYear');
    nobelPrizeYear.value = year;

    let nobelPrizeCategory = document.getElementById('nobelPrizeCategory');
    nobelPrizeCategory.value = category;
}

const readLaureates = () => {
    let fragment = document.createDocumentFragment();
    chosenPrize[0].laureates.forEach(laureate => {
        console.log(laureate);
        fragment.append(createCards(laureate));
    });
    cards.append(fragment);
}

const createCards = (laureate) => {
    let card = document.createElement('ARTICLE');
    card.classList.add('w-full', 'p-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-start', 'border', 'border-gray-300');
    
    let fullName = document.createElement('H2');
    fullName.textContent = laureate.knownName.en;
    fullName.style.fontSize = '19px';
    
    let motivation = document.createElement('H3');
    motivation.textContent = laureate.motivation.en.charAt(0).toUpperCase() + laureate.motivation.en.slice(1);;
    motivation.style.fontSize = '15px';

    card.append(fullName, motivation);

    return card
}

const firstLoad = () => {
    getParams();
    getNobelPrize();
    setInfo();
    readLaureates();
}



document.addEventListener('DOMContentLoaded', firstLoad)
cards.addEventListener('click', (event) => {console.log(event.target)})