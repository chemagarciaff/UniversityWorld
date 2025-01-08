// Variables

let dropdown = document.getElementById('dropdown');
let form = document.getElementById('form');
let coin =document.getElementById('logo-coin');
let main = document.getElementById('main');
let animationFirstText = document.getElementById('animationFirstText');
let animationFirstCoin = document.getElementById('animationFirstCoin');
let firstScreen = document.getElementById('firstScreen');
let body = document.getElementById('body');

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



// Bloque de animaciones iniciales.
const firstAnimation = () => {

    if (!sessionStorage.getItem('executedAnimation')) {

    let timer = setTimeout(() => {
        animationFirstCoin.classList.remove('rotateInitialCoin');
        animationFirstText.classList.remove('hidden');
        animationFirstCoin.classList.add('translateCoin');
        animationFirstText.classList.add('translateText');
        
        let timer2 = setTimeout(() => {
            animationFirstCoin.classList.remove('translateCoin');
            animationFirstCoin.classList.add('hideCoin');
            
            let timer3 = setTimeout(() => {
                animationFirstText.classList.add('hidden');

                let timer4 = setTimeout(() => {
                    firstScreen.classList.add('hideScreen');

                    body.classList.remove('overflow-hidden');
                    body.classList.add('overflow-x-hidden');

                    sessionStorage.setItem('executedAnimation', 'true');
                    
                }, 2800);

            }, 1260);

        }, 3000);

    }, 4000);



    }else{
        firstScreen.classList.add('hidden');
        body.classList.remove('overflow-hidden');
        body.classList.add('overflow-x-hidden');


    }

}
document.addEventListener('DOMContentLoaded', firstAnimation)




// Events
dropdown.addEventListener('click', showForm);
coin.addEventListener('mouseover', rotateCoin);
coin.addEventListener('animationend', () => {
    coin.classList.remove('rotateCoin');
})
