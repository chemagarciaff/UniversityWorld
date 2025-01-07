let cards = document.getElementById('cards');


// Peticiones a api de Premios nobel

const getNobelPrizes = async () => {
    const results = await fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=676&sort=desc");
    
    let data = await results.json();
    
    return data.nobelPrizes;
}


let nobelPrizes;

const loadNobelPrizes = async () => {
    nobelPrizes = await getNobelPrizes();
    
    !localStorage.getItem('nobelPrizes') 
        ? await localStorage.setItem('nobelPrizes', JSON.stringify(nobelPrizes)) 
        : console.log("Los premios Nobel ya están almacenados en localStorage.");
        
    let fragment = document.createDocumentFragment();

    nobelPrizes.forEach(nobel => {

            fragment.appendChild(createCard(nobel));

    });

    cards.append(fragment);
}

const createCard = (nobel) => {
    let card = document.createElement('DIV');
    card.className = 'card';
    card.classList.add('w-[280px]', 'py-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-center', 'border', 'border-[#CEA152]');
    
    let title = document.createElement('H3');
    title.textContent = nobel.awardYear;
    
    let category = document.createElement('H2');
    category.textContent = nobel.category.en;
    category.style.fontSize = '30px';
    category.style.textAlign = 'center';
   
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


document.addEventListener('DOMContentLoaded', loadNobelPrizes)
cards.addEventListener('click', changePage)

