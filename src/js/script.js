let cards = document.getElementById('cards');
let changesbtn = document.getElementById('changes-btn');
let sort = document.getElementById('sort');
let nobelPrizeYear = document.getElementById('nobelPrizeYear');
let yearTo = document.getElementById('yearTo');
let nobelPrizeCategory = document.getElementById('nobelPrizeCategory');
let nobelPrizes;


// Peticiones a api de Premios nobel

const getNobelPrizes = async () => {
    const results = await fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=676&sort=asc");

    let data = await results.json();

    return data.nobelPrizes;
}



const loadNobelPrizes = async () => {
    nobelPrizes = await getNobelPrizes();

    !localStorage.getItem('nobelPrizes')
        ? await localStorage.setItem('nobelPrizes', JSON.stringify(nobelPrizes))
        : console.log("Los premios Nobel ya están almacenados en localStorage.");


    addNobelPrizes(nobelPrizes);
}

const addNobelPrizes = (nobelPrizes) => {

    cards.innerHTML = '';

    let fragment = document.createDocumentFragment();

    nobelPrizes.forEach(nobel => {

        fragment.appendChild(createCard(nobel));

    });

    cards.append(fragment);

}

const createCard = (nobel) => {
    let card = document.createElement('DIV');
    card.classList.add('card', 'change', 'w-[280px]', 'py-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-center', 'border', 'border-[#CEA152]');

    let title = document.createElement('H3');
    title.classList.add('change');
    title.textContent = nobel.awardYear;

    let category = document.createElement('H2');
    category.classList.add('change');
    category.textContent = nobel.category.en;
    category.style.fontSize = '30px';
    category.style.textAlign = 'center';

    card.append(category, title);
    return card;
}


const changePage = (event) => {
    let element = event.target;

    if (element.classList.contains('change')) {

        let category = element.classList.contains('card')
            ? element.children[0].textContent
            : element.parentElement.children[0].textContent;

        let year = element.classList.contains('card')
            ? element.children[1].textContent
            : element.parentElement.children[1].textContent;

        window.location.href = "./pages/nobelprice.html?year=" + year + "&category=" + category;
    }
}

const applyChanges = (event) => {

    event.preventDefault();

    let nobelPrizesCopy = [...nobelPrizes];
    let limit = 0;

    if (sort.value) {
        if (sort.value == 'desc') nobelPrizesCopy.sort((a, b) => b.awardYear - a.awardYear);
        if (sort.value == 'asc') nobelPrizesCopy.sort((a, b) => a.awardYear - b.awardYear);
    }

    if (yearTo.value && parseInt(yearTo.value) >= 1901 && parseInt(yearTo.value) <= 2024) {
        limit = parseInt(yearTo.value);
    }
    
    if (nobelPrizeYear.value) {
        if (limit < parseInt(nobelPrizeYear.value)) limit = parseInt(nobelPrizeYear.value);
    
        if (parseInt(nobelPrizeYear.value) >= 1901 && parseInt(nobelPrizeYear.value) <= 2024) {
            nobelPrizesCopy = nobelPrizesCopy.filter(nobel => 
                nobel.awardYear >= parseInt(nobelPrizeYear.value) && nobel.awardYear <= limit
            );
        }
    }

    if(nobelPrizeCategory.value){
        nobelPrizesCopy = nobelPrizesCopy.filter(nobel => nobel.category.en == nobelPrizeCategory.value)
    }
    
    addNobelPrizes(nobelPrizesCopy);
}


form.addEventListener('submit', applyChanges)
document.addEventListener('DOMContentLoaded', loadNobelPrizes)
cards.addEventListener('click', changePage)

