// Variables
let cards = document.getElementById('cards');
let news = document.getElementById('news');
let nobelPrizeCategory = document.getElementById('nobelPrizeCategory');
let nobelPrizeYear = document.getElementById('nobelPrizeYear');
let boton = document.getElementById('boton');
let nobelPrizes;
let chosenPrize;
let year;
let category;
let firstLaureate;


// Event listener for the button to navigate to another page
boton.addEventListener('click', function () {
    window.location.href = "./../index.html";
})

// Function to format the name for the query (replaces spaces with '%20' and removes periods)
const formatName = (name) => {
    let newName = name.replace(/\./g, "").replace(/ /g, "%20");
    return name.replace(/\./g, "").replace(/ /g, "%20");
}


// Fetch articles based on Nobel Prize laureate and category
const getArticles = async () => {

    try {

        const results = await fetch("https://api.core.ac.uk/v3/search/works?api_key=ItmjpOsLC8bYwvlTdgR35x7c9yAh12Fk&limit=6&q=nobel%20" + formatName(firstLaureate) + "%20" + category + "%20" + year);

        let data = await results.json();

        // If no articles found, display a message
        if (data.results.length == 0) {
            let noArticles = document.createElement('P');
            noArticles.textContent = 'No articles found';
            news.append(noArticles);
        } else {
            // If articles are found, create article elements
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

// Function to create an article card
const createArticle = (article) => {

    // Create the container for the article
    let articleContainer = document.createElement('ARTICLE');
    articleContainer.classList.add('card', 'w-full', 'p-7', 'mb-3', 'flex', 'flex-col', 'justify-center', 'items-start', 'border', 'border-[#CEA152]');

    // Create and set the title of the article
    let articleTitle = document.createElement('H2');
    articleTitle.textContent = article.title;
    articleTitle.style.fontSize = '19px';

    // Set the publisher and year; default to "Unknown" if not provided
    let publisherText = (article.publisher == "") ? "Unknown" : article.publisher;
    let yearText = (!article.yearPublished) ? "Unknown" : article.yearPublished;

    // Create and set the publisher and year text
    let publisher = document.createElement('H3');
    publisher.textContent = publisherText + " - " + yearText;
    publisher.style.fontSize = '13px';

    // Create the link to the article
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


// Function to get Nobel Prize data for a specific year and category
const getNobelPrize = () => {
    nobelPrizes = JSON.parse(localStorage.getItem('nobelPrizes'));
    chosenPrize = nobelPrizes.filter(nobel => nobel.awardYear == year && nobel.category.en == category)
}

// Function to get URL parameters for year and category
const getParams = () => {
    let urlParams = new URLSearchParams(window.location.search);

    year = urlParams.get('year');
    category = urlParams.get('category');
}

// Function to set the information in the UI based on the year and category
const setInfo = () => {
    let title = document.getElementById('title');
    title.textContent = "The Nobel Prize in " + category + " " + year;

    let nobelPrizeYear = document.getElementById('nobelPrizeYear');
    nobelPrizeYear.value = year;

    let nobelPrizeCategory = document.getElementById('nobelPrizeCategory');
    nobelPrizeCategory.value = category;
}

// Function to read laureates and display their information
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

// Function to create a card for each laureate
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

// Function to initialize the page by loading parameters, Nobel Prize data, and laureates
const firstLoad = () => {
    getParams();
    getNobelPrize();
    setInfo();
    readLaureates();
    getArticles();
}

// Function to handle form submission and apply the changes
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