

const getArticles = async () => {
    const results = await fetch("https://api.core.ac.uk/v3/search/works?api_key=ItmjpOsLC8bYwvlTdgR35x7c9yAh12Fk&q=chemistry%20nobel%201901");

    let data = await results.json();

    console.log(data);
}
getArticles();

let nobelPrizes = JSON.parse(sessionStorage.getItem('nobelPrizes'))
console.log(nobelPrizes);