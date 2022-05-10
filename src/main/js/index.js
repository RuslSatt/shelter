import '../../index.html';
import '../scss/main.scss';
import '../../assets/images/pets-sophia.png';
import '../../assets/images/pets-charly.png';
import '../../assets/images/pets-freddie.png';
import '../../assets/images/pets-jennifer.png';
import '../../assets/images/pets-katrine.png';
import '../../assets/images/pets-scarlet.png';
import '../../assets/images/pets-timmy.png';
import '../../assets/images/pets-woody.png';
import {petsInfo} from "./petsInfo";

const newImages = () => {
    const images = [
        './assets/images/pets-jennifer.png',
        './assets/images/pets-sophia.png',
        './assets/images/pets-woody.png',
        './assets/images/pets-scarlet.png',
        './assets/images/pets-katrine.png',
        './assets/images/pets-timmy.png',
        './assets/images/pets-freddie.png',
        './assets/images/pets-charly.png'
    ]
    images.forEach(elem => {
        const image = new Image();
        image.src = elem;
        const img = document.createElement('img');
        img.src = image.src;
        img.classList.add('img__visible')
        document.body.appendChild(img);
    })
}

newImages();

//============menu-burger==================//
const menuMainLink = document.querySelector('[data-id=main]');
const secondLink = document.querySelector('[data-id=second]');
const iconMenu = document.querySelector('.icon-menu');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.header__logo');
const wrapper = document.querySelector('.wrapper');
const headerPets = document.querySelector('.header_pets');
const logoMenu = logo.cloneNode(true);
logoMenu.classList.add('logo-none');
const links = document.querySelectorAll('.menu__link');

menuMainLink.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
    removeClasses();
    if (e.target.classList.contains('active'))
        e.preventDefault();
})
secondLink.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
    removeClasses();
    if (e.target.classList.contains('active-pets'))
    e.preventDefault();
})

iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('active')
    menu.classList.toggle('active');
    logo.classList.toggle('logo-none');
    document.body.classList.toggle('hidden')
    wrapper.classList.toggle('back');
    if (headerPets) {
        headerPets.classList.toggle('back');
    }
    menu.prepend(logoMenu);
    logoMenu.classList.toggle('logo-menu');
    const pageOffset = window.scrollY;
    if (pageOffset > 50) {
        iconMenu.classList.toggle('sticky-offset');
    }
})

const removeClasses = () => {
    menu.classList.remove('active');
    iconMenu.classList.remove('active');
    logo.classList.remove('logo-none');
    logoMenu.classList.remove('logo-menu');
    document.body.classList.remove('hidden');
    wrapper.classList.remove('back');
    if (headerPets) headerPets.classList.remove('back');
    iconMenu.classList.remove('sticky-offset');
}

if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            if (iconMenu.classList.contains('active')) {
                removeClasses();
            }
        })
    })
    window.addEventListener('click', function (e) {
        const targetClick = e.target;
        if (!targetClick.closest('.header__icon') && !targetClick.closest('.menu')) {
            removeClasses();
        }
    })
}


const scroll = () => {
    const pageOffset = window.scrollY;
    if (pageOffset > 50) {
        iconMenu.classList.add('sticky');
    } else {
        iconMenu.classList.remove('sticky');
    }
}
window.addEventListener('scroll', scroll);


//=====================================================================//
// ================== carousel ========================== //
const cardActive = document.querySelector('#slide-active');
const cardPrev = document.querySelector('#slide-prev');
const cardNext = document.querySelector('#slide-next');
const CAROUSEL = document.querySelector('.our-friends__carousel');
const BTN_LEFT = document.querySelector('.our-friends__arrow-left');
const BTN_RIGHT = document.querySelector('.our-friends__arrow-right');

for (let i = petsInfo.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = petsInfo[i];
    petsInfo[i] = petsInfo[j];
    petsInfo[j] = temp;
}

const arrPrev = [];
arrPrev.push(petsInfo[0], petsInfo[1], petsInfo[2]);
for (let i = 0; i < 3; i++) {
    const createTemplateCard = () => {
        let items = document.createElement('div');
        items.classList.add('row-friends__column');

        let items2 = document.createElement('div');
        items2.classList.add('row-friends__item');
        items.appendChild(items2);

        let items3 = document.createElement('div');
        items3.classList.add('row-friends__image');
        items3.innerHTML = `<img rel="preload" src=${arrPrev[i].img} alt="">`;
        items2.appendChild(items3);

        let textItems = document.createElement('p');
        textItems.classList.add('row-friends__name-pet');
        textItems.innerHTML = `${arrPrev[i].name}`
        items2.appendChild(textItems);

        let btn = document.createElement('button');
        btn.classList.add('row-friends__button')
        btn.innerHTML = 'Learn more';
        items2.appendChild(btn);

        return items;
    }
    const cards = createTemplateCard();
    if (cardPrev) cardPrev.appendChild(cards);
}
const arrActive = [];
arrActive.push(petsInfo[3], petsInfo[4], petsInfo[5]);
for (let i = 0; i < 3; i++) {
    const createTemplateCard = () => {
        let items = document.createElement('div');
        items.classList.add('row-friends__column');

        let items2 = document.createElement('div');
        items2.classList.add('row-friends__item');
        items.appendChild(items2);

        let items3 = document.createElement('div');
        items3.classList.add('row-friends__image');
        items3.innerHTML = `<img rel="preload" src=${arrActive[i].img} alt="">`;
        items2.appendChild(items3);

        let textItems = document.createElement('p');
        textItems.classList.add('row-friends__name-pet');
        textItems.innerHTML = `${arrActive[i].name}`
        items2.appendChild(textItems);

        let btn = document.createElement('button');
        btn.classList.add('row-friends__button')
        btn.innerHTML = 'Learn more';
        items2.appendChild(btn);

        return items;
    }
    const cards = createTemplateCard(i);
    if (cardActive) cardActive.appendChild(cards);
}
const arrNext = [];
arrNext.push(petsInfo[1], petsInfo[6], petsInfo[7]);
for (let i = 0; i < 3; i++) {
    const createTemplateCard = () => {
        let items = document.createElement('div');
        items.classList.add('row-friends__column');

        let items2 = document.createElement('div');
        items2.classList.add('row-friends__item');
        items.appendChild(items2);

        let items3 = document.createElement('div');
        items3.classList.add('row-friends__image');
        items3.innerHTML = `<img rel="preload" src=${arrNext[i].img} alt="">`;
        items2.appendChild(items3);

        let textItems = document.createElement('p');
        textItems.classList.add('row-friends__name-pet');
        textItems.innerHTML = `${arrNext[i].name}`
        items2.appendChild(textItems);

        let btn = document.createElement('button');
        btn.classList.add('row-friends__button')
        btn.innerHTML = 'Learn more';
        items2.appendChild(btn);

        return items;
    }
    const cards = createTemplateCard(i);
    if (cardNext) cardNext.appendChild(cards);
}

const moveLeft = () => {
    CAROUSEL.classList.add('carousel_prev');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight)
    petsInfo.splice(8, 1);
}
const moveRight = () => {
    CAROUSEL.classList.add('carousel_next');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight)
    petsInfo.splice(8, 1);
}
if (BTN_LEFT && BTN_RIGHT) {
    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
}

if (CAROUSEL)
    if (window.innerWidth < 1280 && window.innerWidth > 767) {
        const nodePrev = document.querySelector('#slide-prev .row-friends__column');
        nodePrev.remove();
        const nodeActive = document.querySelector('#slide-active .row-friends__column');
        nodeActive.remove();
        const nodeNext = document.querySelector('#slide-next .row-friends__column');
        nodeNext.remove();
    } else if (window.innerWidth < 768) {
        const nodePrev = document.querySelectorAll('#slide-prev .row-friends__column');
        nodePrev[0].remove();
        nodePrev[1].remove();
        const nodeActive = document.querySelectorAll('#slide-active .row-friends__column');
        nodeActive[0].remove();
        nodeActive[1].remove();
        const nodeNext = document.querySelectorAll('#slide-next .row-friends__column');
        nodeNext[0].remove();
        nodeNext[1].remove();
    }
if (CAROUSEL)
    CAROUSEL.addEventListener('animationend', (animationEvent) => {
        let item;
        BTN_LEFT.addEventListener('click', moveLeft);
        BTN_RIGHT.addEventListener('click', moveRight);
        if (animationEvent.animationName === 'swipe-left') {
            CAROUSEL.classList.remove('carousel_prev');
            item = cardPrev;
            cardActive.innerHTML = cardPrev.innerHTML;
        } else {
            CAROUSEL.classList.remove('carousel_next');
            item = cardNext;
            cardActive.innerHTML = cardNext.innerHTML;
        }
        const itemsCenter = document.querySelectorAll('#slide-active .row-friends__column .row-friends__item .row-friends__name-pet');

        let arrNormal = [];
        if (window.innerWidth > 1279) {
            arrNormal = petsInfo.filter(elem => itemsCenter[0].outerText !== elem.name &&
                itemsCenter[1].outerText !== elem.name &&
                itemsCenter[2].outerText !== elem.name
            )
        } else if (window.innerWidth < 1280 && window.innerWidth > 767) {
            arrNormal = petsInfo.filter(elem => itemsCenter[0].outerText !== elem.name &&
                itemsCenter[1].outerText !== elem.name
            )
        } else {
            arrNormal = petsInfo.filter(elem => itemsCenter[0].outerText !== elem.name)
        }
        for (let i = arrNormal.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arrNormal[i];
            arrNormal[i] = arrNormal[j];
            arrNormal[j] = temp;
        }
        item.innerHTML = '';

        const createTemplateCard = (i) => {
            let items = document.createElement('div');
            items.classList.add('row-friends__column');

            let items2 = document.createElement('div');
            items2.classList.add('row-friends__item');
            items.appendChild(items2);

            let items3 = document.createElement('div');
            items3.classList.add('row-friends__image');
            items3.innerHTML = `<img rel="preload" src=${arrNormal[i].img} alt="">`;
            items2.appendChild(items3);

            let textItems = document.createElement('p');
            textItems.classList.add('row-friends__name-pet');
            textItems.innerHTML = `${arrNormal[i].name}`
            items2.appendChild(textItems);

            let btn = document.createElement('button');
            btn.classList.add('row-friends__button')
            btn.innerHTML = 'Learn more';
            items2.appendChild(btn);

            return items;
        }

        if (window.innerWidth < 768) {
            for (let i = 0; i < 1; i++) {
                createTemplateCard(i)
                const cards = createTemplateCard(i);
                item.appendChild(cards);
            }
        } else if (window.innerWidth < 1280 && window.innerWidth > 767) {
            for (let i = 0; i < 2; i++) {
                createTemplateCard(i)
                const cards = createTemplateCard(i);
                item.appendChild(cards);
            }
        } else {
            for (let i = 0; i < 3; i++) {
                createTemplateCard(i)
                const cards = createTemplateCard(i);
                item.appendChild(cards);
            }
        }
        if (animationEvent.animationName === 'swipe-left') {
            cardNext.innerHTML = cardPrev.innerHTML;
        } else {
            cardPrev.innerHTML = cardNext.innerHTML;
        }
    })
// --------------- popup ------------------------- //
const popupParent = document.querySelector('.row-friends_popup');
const popupWrapper = document.querySelector('.popup__wrapper');
const popupClose = document.querySelector('.popup__close');

if (popupParent)
    popupParent.addEventListener('click', (event) => {
        if (event.target.closest('.row-friends__item')) {
            const item = event.target.closest('.row-friends__item');
            if (item.closest('.row-friends__item')) {
                const name = item.querySelector('.row-friends__name-pet').innerText
                let pet = [];
                pet.push(name);

                let petsCopy = [...petsInfo];
                const petsFilter = petsCopy.filter(elem => elem.name === pet[0]);

                const namePet = document.querySelector('.popup__name');
                const imagePet = document.querySelector('.popup__image');
                const breedPet = document.querySelector('.popup__breed')
                const descriptionPet = document.querySelector('.popup__description');
                const agePet = document.querySelector('.popup__age');
                const inoculationsPet = document.querySelector('.popup__inoculations');
                const diseasesPet = document.querySelector('.popup__diseases');
                const parasitesPet = document.querySelector('.popup__parasites');
                imagePet.src = petsFilter[0].img;
                namePet.innerHTML = petsFilter[0].name;
                breedPet.innerHTML = petsFilter[0].breed;
                descriptionPet.innerHTML = petsFilter[0].description;
                agePet.innerHTML = `<span>Age:</span> ${petsFilter[0].age}`;
                inoculationsPet.innerHTML = `<span>Inoculations:</span> ${petsFilter[0].inoculations}`;
                diseasesPet.innerHTML = `<span>Diseases:</span> ${petsFilter[0].diseases}`;
                parasitesPet.innerHTML = `<span>Parasites:</span> ${petsFilter[0].parasites}`;
            }
            popupWrapper.classList.add('active');
            document.body.classList.add('hidden-popup')
            popupClose.classList.remove('hover_close');
        }
    });

window.addEventListener('click', function (e) {
    const targetClick = e.target;
    if (!targetClick.closest('.popup__body') &&
        !targetClick.closest('.our-friends__carousel') &&
        !targetClick.closest('.row-friends_popup')) {
        popupWrapper.classList.remove('active');
        document.body.classList.remove('hidden-popup')
    }
})

if (popupWrapper) {
    window.addEventListener('pointermove', (e) => {
        if (!e.target.closest('.popup__body') &&
            !e.target.closest('.our-friends__carousel') &&
            !e.target.closest('.row-friends_popup')) {
            popupClose.classList.add('hover_close');
        }
    })
    window.addEventListener('pointermove', (e) => {
        if (e.target.closest('.popup__body')) {
            popupClose.classList.remove('hover_close');
        }
    })
}











