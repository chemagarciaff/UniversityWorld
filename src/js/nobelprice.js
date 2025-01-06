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

const firstLoad = () => {
    getParams();
    getNobelPrize();
}



document.addEventListener('DOMContentLoaded', firstLoad)