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






// Peticiones a api de Premios nobel

const getNobelPrices = async () => {
    const results = await fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=676");
    
    let data = await results.json();
    
    return data.nobelPrizes;
}


let nobelPrizes;

const loadNobelPrices = async () => {
    nobelPrizes = await getNobelPrices();
    
    !sessionStorage.getItem('nobelPrizes') 
        ? await sessionStorage.setItem('nobelPrizes', JSON.stringify(nobelPrizes)) 
        : console.log("Los premios Nobel ya están almacenados en sessionStorage.");
        
    let fragment = document.createDocumentFragment();

    nobelPrizes.forEach(nobel => {

            fragment.appendChild(createCard(nobel));

    });

    cards.append(fragment);
}

const createCard = (nobel) => {
    let card = document.createElement('DIV');
    card.className = 'card';
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


const changePage = (event) => {
    if(event.target.classList.contains('card')){
        let category = event.target.children[0].textContent;
        let year = event.target.children[1].textContent
        window.location.href = "./pages/nobelprice.html?year=" + year + "&category=" + category;
    }
}


document.addEventListener('DOMContentLoaded', loadNobelPrices)
cards.addEventListener('click', changePage)

