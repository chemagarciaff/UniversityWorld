// Variables

let dropdown = document.getElementById('dropdown');
let form = document.getElementById('form');



// Methods
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
dropdown.addEventListener('click', showForm)




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
    const results = await fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=676&sort=desc");
    // const results = await fetch("https://api.unsplash.com/photos/?client_id=p-GvyqNX0bLtn7Dw5RgGcT7FWUi7mYPJhSxJ4lBzi7s&query=famosos&page=0");
    // const results = await fetch("http://universities.hipolabs.com/search?country=france");
    // const results = await fetch("http://battuta.medunes.net/api/city/fr/search/?key={YOUR_API_KEY}");

    let data = await results.json();
    console.log(data);
}

document.addEventListener('DOMContentLoaded', getNobelPrices)