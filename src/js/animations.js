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

// Method to rotate the coin by adding a CSS class
const rotateCoin = () => {
    coin.classList.add('rotateCoin');
}

// Variable to track if the form is shown or not
let formShown = false;
// Method to show/hide the form
const showForm = () => {
    // If the form is not shown, display it and change the dropdown background color
    if(!formShown){
        form.classList.remove('hidden');
        form.classList.add('block');
        dropdown.classList.add('bg-[#CEA152]');
    // If it's already shown, hide it and revert the background color
    }else{
        form.classList.remove('block');
        form.classList.add('hidden');
        dropdown.classList.remove('bg-[#CEA152]');
    }

    // Toggle the formShown state
    formShown = !formShown;
}



// Initial animations block.
const firstAnimation = () => {
    // Check if the animation has already been executed in this session
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
        // If the animation has already been executed, just hide the first screen

        firstScreen.classList.add('hidden');
        body.classList.remove('overflow-hidden');
        body.classList.add('overflow-x-hidden');


    }

}


// Events
document.addEventListener('DOMContentLoaded', firstAnimation)
dropdown.addEventListener('click', showForm);
coin.addEventListener('mouseover', rotateCoin);
coin.addEventListener('animationend', () => {
    coin.classList.remove('rotateCoin');
})
