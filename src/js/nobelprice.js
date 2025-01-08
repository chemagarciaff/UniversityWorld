
let cards = document.getElementById('cards');
let news = document.getElementById('news');
let nobelPrizeCategory = document.getElementById('nobelPrizeCategory');
let nobelPrizeYear = document.getElementById('nobelPrizeYear');

let boton = document.getElementById('boton');

boton.addEventListener('click', function () {
    window.location.href = "./../index.html";
})




const formatName = (name) => {
    let newName = name.replace(/\./g, "").replace(/ /g, "%20");
    return name.replace(/\./g, "").replace(/ /g, "%20");
}


const getArticles = async () => {

    try {

        const results = await fetch("https://api.core.ac.uk/v3/search/works?api_key=ItmjpOsLC8bYwvlTdgR35x7c9yAh12Fk&limit=6&q=nobel%20" + formatName(firstLaureate) + "%20" + category + "%20" + year);

        let data = await results.json();
        console.log(data);

        if (data.results.length == 0) {
            let noArticles = document.createElement('P');
            noArticles.textContent = 'No articles found';
            news.append(noArticles);
        } else {

            let fragment = document.createDocumentFragment();

            data.results.forEach(article => {

                fragment.append(createArticle(article))
            }
            )

            news.append(fragment);
        }
    } catch (error) {

        let alert = document.createElement('P');
        alert.textContent = 'You have reached the limit of queries per minute. Please wait one more minute to continue querying. (Remember that the query limit is 4 per minute).';
        news.append(alert);

    }


}

const createArticle = (article) => {
    let articleContainer = document.createElement('ARTICLE');
    articleContainer.classList.add('card', 'w-full', 'p-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-start', 'border', 'border-[#CEA152]');

    let articleTitle = document.createElement('H2');
    articleTitle.textContent = article.title;
    articleTitle.style.fontSize = '19px';

    let publisherText = (article.publisher == "") ? "Unknown" : article.publisher;
    let yearText = (!article.yearPublished) ? "Unknown" : article.yearPublished;

    let publisher = document.createElement('H3');
    publisher.textContent = publisherText + " - " + yearText;
    publisher.style.fontSize = '13px';

    let link = document.createElement('A');
    link.textContent = 'See Article';
    link.style.paddingTop = '15px';
    link.style.textDecoration = 'underline';
    link.classList.add('hover:text-white')
    link.target = 'False';
    link.href = article.downloadUrl;


    articleContainer.append(articleTitle, publisher, link);

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
let firstLaureate;

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

    if (chosenPrize[0].laureates) {
        chosenPrize[0].laureates.forEach((laureate, index) => {
            if (laureate.knownName) if (index == 0) firstLaureate = laureate.knownName.en;
            if (laureate.orgName) if (index == 0) firstLaureate = laureate.orgName.en;

            fragment.append(createCards(laureate));
        });
    } else {
        let alert = document.createElement('P');
        alert.textContent = 'No laureates for this prize';

        fragment.append(alert);
    }

    cards.append(fragment);
}

const createCards = (laureate) => {
    let card = document.createElement('ARTICLE');
    card.classList.add('card', 'w-full', 'p-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-start', 'border', 'border-[#CEA152]');

    let fullName = document.createElement('H2');
    laureate.knownName
        ? fullName.textContent = "Winner: " + laureate.knownName.en
        : fullName.textContent = "Winner: " + laureate.orgName.en;

    fullName.style.fontSize = '22px';

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



const applyChanges = (event) => {

    event.preventDefault();

    if (parseInt(nobelPrizeYear.value) >= 1901 && parseInt(nobelPrizeYear.value) <= 2024 && nobelPrizeCategory.value) {

        let params = new URLSearchParams(window.location.search);

        params.set('year', nobelPrizeYear.value);
        params.set('category', nobelPrizeCategory.value);

        window.location.href = window.location.pathname + '?' + params.toString();
    }




}


form.addEventListener('submit', applyChanges)


document.addEventListener('DOMContentLoaded', firstLoad)