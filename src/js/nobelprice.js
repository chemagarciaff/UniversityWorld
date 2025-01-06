// Variables
let dropdown = document.getElementById('dropdown');
let form = document.getElementById('form');
let coin =document.getElementById('logo-coin');
let main = document.getElementById('main');
let cards = document.getElementById('cards');
let news = document.getElementById('news');


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







const getArticles = async () => {
    const results = await fetch("https://api.core.ac.uk/v3/search/works?api_key=ItmjpOsLC8bYwvlTdgR35x7c9yAh12Fk&q=nobel%20" + year + "%20" + category + "%20");

    let data = await results.json();

    let fragment = document.createDocumentFragment();

    data.results.forEach(article => 
        fragment.append(createArticle(article))
    )

    news.append(fragment);

    console.log(data.results);
}

const createArticle = (article) => {
    let articleContainer = document.createElement('ARTICLE');
    articleContainer.classList.add('w-full', 'p-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-start', 'border', 'border-[#CEA152]');
    
    let articleTitle = document.createElement('H2');
    articleTitle.textContent = article.title;
    articleTitle.style.fontSize = '19px';
    
    let publisher = document.createElement('H3');
    publisher.textContent = article.publisher + " - " + article.yearPublished;
    publisher.style.fontSize = '13px';

    articleContainer.append(articleTitle, publisher);

    return articleContainer
}

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
    card.classList.add('w-full', 'p-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-start', 'border', 'border-[#CEA152]');
    
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
    getArticles();
}



document.addEventListener('DOMContentLoaded', firstLoad)
cards.addEventListener('click', (event) => {console.log(event.target)})