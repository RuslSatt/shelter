import '../../pets.html';
import '../scss/pets.scss';
import {petsInfo} from "../../main/js/petsInfo";



const slider = document.querySelector('.row-friends__slider_pet');

let columns = [];


if (slider) {
    if (window.innerWidth < 1280 && window.innerWidth > 767) {
        for (let i = 7; i < 9; i++) {
            const columnElem = document.createElement('div');
            columnElem.classList.add('row-friends__column-wrapper');
            columnElem.id = `column-${i}`;
            slider.appendChild(columnElem);
        }

    } else if (window.innerWidth < 768) {
        for (let i = 7; i < 17; i++) {
            const columnElem = document.createElement('div');
            columnElem.classList.add('row-friends__column-wrapper');
            columnElem.id = `column-${i}`;
            slider.appendChild(columnElem);
        }
    }

    for (let i = 1; i < 17; i++) {
        columns.push(document.querySelector(`#column-${i}`))
    }

    const arrowStraight = document.querySelector('#arrow-straight-one');
    const arrowStraightEnd = document.querySelector('#arrow-straight-end');
    const arrowBackStart = document.querySelector('#arrow-back-start');
    const arrowBackOne = document.querySelector('#arrow-back-one');
    const numberPage = document.querySelector('.buttons-pets__number-page');
    const arrowImageBackStart = document.querySelector('#arrow_image_back_start');
    const arrowImageBackOne = document.querySelector('#arrow_image_back_one');
    const arrowImageStraightOne = document.querySelector('#arrow_image_straight_one');
    const arrowImageStraightEnd = document.querySelector('#arrow_image_straight_end');

    const petsAllForLess = [];
    const petsAll = [];

    for (let i = petsInfo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = petsInfo[i];
        petsInfo[i] = petsInfo[j];
        petsInfo[j] = temp;
    }

    for (let i = 0; i < 6; i++) {
        petsInfo.forEach((pet, i) => {
            petsAllForLess.push(pet);
        })
    }


// =========== create array for width < 1280 ============ //
    let newPetsArray = [];
    for (let i = 0; i < 16; i++) {
        newPetsArray.push([]);
    }

// =========== create array for width < 1280 ============ //

    if (window.innerWidth > 1279) {
        for (let i = 0; i < 6; i++) {
            for (let i = petsInfo.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = petsInfo[i];
                petsInfo[i] = petsInfo[j];
                petsInfo[j] = temp;
            }
            petsInfo.forEach((pet, i) => {
                petsAll.push(pet);
            })
        }
    }
    let k = 0;
    if (window.innerWidth < 1280 && window.innerWidth > 767) {
        petsAllForLess.forEach((pet, i) => {
            if (i % 6 === 0 && i !== 0) {
                for (let i = newPetsArray[k].length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    let temp = newPetsArray[k][i];
                    newPetsArray[k][i] = newPetsArray[k][j];
                    newPetsArray[k][j] = temp;
                }
                k += 1
            }
            newPetsArray[k].push(pet)
        })
    }

    if (window.innerWidth < 768) {
        petsAllForLess.forEach((pet, i) => {
            if (i % 3 === 0 && i !== 0) {
                for (let i = newPetsArray[k].length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    let temp = newPetsArray[k][i];
                    newPetsArray[k][i] = newPetsArray[k][j];
                    newPetsArray[k][j] = temp;
                }
                k += 1
            }
            newPetsArray[k].push(pet)
        })
    }

    const createTemplateCard = (pet) => {
        let items = document.createElement('div');
        items.classList.add('row-friends__column');
        items.classList.add('row-friends__column_pets');

        let items2 = document.createElement('div');
        items2.classList.add('row-friends__item');
        items.appendChild(items2);

        let items3 = document.createElement('div');
        items3.classList.add('row-friends__image');
        items3.innerHTML = `<img rel="preload" src=${pet.img} alt="">`;
        items2.appendChild(items3);

        let textItems = document.createElement('p');
        textItems.classList.add('row-friends__name-pet');
        textItems.innerHTML = `${pet.name}`
        items2.appendChild(textItems);

        let btn = document.createElement('button');
        btn.classList.add('row-friends__button')
        btn.innerHTML = 'Learn more';
        items2.appendChild(btn);

        return items;
    }

    let j = 0;

    if (window.innerWidth > 1279) {
        petsAll.forEach((pet, i) => {
            createTemplateCard(pet)
            const cards = createTemplateCard(pet);
            if (i % 8 === 0 && i !== 0) {
                j += 1
            }
            if (columns[j]) columns[j].appendChild(cards);
        })
    }

    if (window.innerWidth < 1280 && window.innerWidth > 767) {
        for (let a = 0; a < 8; a++) {
            newPetsArray[a].forEach((pet) => {
                createTemplateCard(pet)
                const cards = createTemplateCard(pet);
                if (columns[j]) columns[j].appendChild(cards);
            })
            j += 1
        }
    }

    if (window.innerWidth < 768) {
        for (let a = 0; a < 16; a++) {
            newPetsArray[a].forEach((pet) => {
                createTemplateCard(pet)
                const cards = createTemplateCard(pet);
                if (columns[j]) columns[j].appendChild(cards);
            })
            j += 1
        }
    }

    let click = 1;
    let swipe = 0;



    if (window.innerWidth > 1279) {
        const moveStraight = () => {
            if (swipe !== 500)  {
                click += 1
                swipe += 100;
            }
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            if (click === 2) {
                arrowBackStart.classList.add('active-btn');
                arrowBackOne.classList.add('active-btn');
                arrowImageBackStart.src = './assets/images/arrow-much-straight.svg';
                arrowImageBackOne.src = './assets/images/arrow-straight.svg'
                arrowBackStart.addEventListener('click', moveBackStart);
                arrowBackOne.addEventListener('click', moveBackOne);
            } else if (click === 6) {
                arrowStraight.classList.add('disabled_after');
                arrowStraight.removeEventListener('click', moveStraight)
                arrowStraightEnd.removeEventListener('click', moveStraightEnd);
                arrowStraightEnd.classList.add('disabled_after');
                arrowImageStraightOne.src = './assets/images/arrow-back.svg';
                arrowImageStraightEnd.src = './assets/images/arrow-much-back.svg';
            }
            arrowBackStart.classList.add('active-btn')
            arrowBackStart.addEventListener('click', moveBackStart)
        }

        const moveStraightEnd = () => {
            swipe = 500;
            click = 6;
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            arrowStraight.classList.add('disabled_after');
            arrowStraight.removeEventListener('click', moveStraight)
            arrowStraightEnd.removeEventListener('click', moveStraightEnd);
            arrowImageStraightOne.src = './assets/images/arrow-back.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-back.svg';
            arrowStraightEnd.classList.add('disabled_after');
            arrowBackStart.classList.add('active-btn');
            arrowBackOne.classList.add('active-btn');
            arrowImageBackStart.src = './assets/images/arrow-much-straight.svg';
            arrowImageBackOne.src = './assets/images/arrow-straight.svg'
            arrowBackStart.addEventListener('click', moveBackStart);
            arrowBackOne.addEventListener('click', moveBackOne);
        }

        const moveBackStart = () => {
            swipe = 0;
            click = 1;
            slider.style.right = swipe;
            numberPage.innerHTML = click;
            arrowStraight.classList.remove('disabled_after');
            arrowStraightEnd.classList.remove('disabled_after');
            arrowImageStraightOne.src = './assets/images/arrow-straight.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-straight.svg';
            arrowStraight.addEventListener('click', moveStraight);
            arrowStraightEnd.addEventListener('click', moveStraightEnd);
            arrowBackStart.removeEventListener('click', moveBackStart);
            arrowBackOne.removeEventListener('click', moveBackOne);
            arrowBackStart.classList.remove('active-btn');
            arrowBackOne.classList.remove('active-btn');
            arrowImageBackStart.src = './assets/images/arrow-much-back.svg';
            arrowImageBackOne.src = './assets/images/arrow-back.svg'
        }

        const moveBackOne = () => {
            if (swipe !== 0)  {
                click -= 1
                swipe -= 100;
            }
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            arrowStraight.classList.remove('disabled_after');
            arrowStraightEnd.classList.remove('disabled_after');
            arrowImageStraightOne.src = './assets/images/arrow-straight.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-straight.svg';
            arrowStraight.addEventListener('click', moveStraight);
            arrowStraightEnd.addEventListener('click', moveStraightEnd);
            if (click === 1) {
                slider.style.right = swipe + '%';
                arrowStraight.addEventListener('click', moveStraight);
                arrowStraightEnd.addEventListener('click', moveStraightEnd);
                arrowBackStart.removeEventListener('click', moveBackStart)
                arrowBackOne.removeEventListener('click', moveBackOne)
                arrowBackStart.classList.remove('active-btn');
                arrowBackOne.classList.remove('active-btn');
                arrowImageBackStart.src = './assets/images/arrow-much-back.svg';
                arrowImageBackOne.src = './assets/images/arrow-back.svg'
            }
        }

        arrowStraight.addEventListener('click', moveStraight);
        arrowStraightEnd.addEventListener('click', moveStraightEnd);
    }

    if (window.innerWidth < 1280 && window.innerWidth > 767) {
        const moveStraight = () => {
            if (swipe !== 700)  {
                click += 1
                swipe += 100;
            }
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            if (click === 2) {
                arrowBackStart.classList.add('active-btn');
                arrowBackOne.classList.add('active-btn');
                arrowImageBackStart.src = './assets/images/arrow-much-straight.svg';
                arrowImageBackOne.src = './assets/images/arrow-straight.svg'
                arrowBackStart.addEventListener('click', moveBackStart);
                arrowBackOne.addEventListener('click', moveBackOne);
            } else if (click === 8) {
                arrowStraight.classList.add('disabled_after');
                arrowStraight.removeEventListener('click', moveStraight)
                arrowStraightEnd.removeEventListener('click', moveStraightEnd);
                arrowStraightEnd.classList.add('disabled_after');
                arrowImageStraightOne.src = './assets/images/arrow-back.svg';
                arrowImageStraightEnd.src = './assets/images/arrow-much-back.svg';
            }
            arrowBackStart.classList.add('active-btn')
            arrowBackStart.addEventListener('click', moveBackStart)
        }

        const moveStraightEnd = () => {
            swipe = 700;
            click = 8;
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            arrowStraight.classList.add('disabled_after');
            arrowStraight.removeEventListener('click', moveStraight)
            arrowStraightEnd.removeEventListener('click', moveStraightEnd);
            arrowImageStraightOne.src = './assets/images/arrow-back.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-back.svg';
            arrowStraightEnd.classList.add('disabled_after');
            arrowBackStart.classList.add('active-btn');
            arrowBackOne.classList.add('active-btn');
            arrowImageBackStart.src = './assets/images/arrow-much-straight.svg';
            arrowImageBackOne.src = './assets/images/arrow-straight.svg'
            arrowBackStart.addEventListener('click', moveBackStart);
            arrowBackOne.addEventListener('click', moveBackOne);
        }

        const moveBackStart = () => {
            swipe = 0;
            click = 1;
            slider.style.right = swipe;
            numberPage.innerHTML = click;
            arrowStraight.classList.remove('disabled_after');
            arrowStraightEnd.classList.remove('disabled_after');
            arrowImageStraightOne.src = './assets/images/arrow-straight.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-straight.svg';
            arrowStraight.addEventListener('click', moveStraight);
            arrowStraightEnd.addEventListener('click', moveStraightEnd);
            arrowBackStart.removeEventListener('click', moveBackStart);
            arrowBackOne.removeEventListener('click', moveBackOne);
            arrowBackStart.classList.remove('active-btn');
            arrowBackOne.classList.remove('active-btn');
            arrowImageBackStart.src = './assets/images/arrow-much-back.svg';
            arrowImageBackOne.src = './assets/images/arrow-back.svg'
        }

        const moveBackOne = () => {
            if (swipe !== 0)  {
                click -= 1
                swipe -= 100;
            }
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            arrowStraight.classList.remove('disabled_after');
            arrowStraightEnd.classList.remove('disabled_after');
            arrowImageStraightOne.src = './assets/images/arrow-straight.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-straight.svg';
            arrowStraight.addEventListener('click', moveStraight);
            arrowStraightEnd.addEventListener('click', moveStraightEnd);
            if (click === 1) {
                slider.style.right = swipe + '%';
                arrowStraight.addEventListener('click', moveStraight);
                arrowStraightEnd.addEventListener('click', moveStraightEnd);
                arrowBackStart.removeEventListener('click', moveBackStart)
                arrowBackOne.removeEventListener('click', moveBackOne)
                arrowBackStart.classList.remove('active-btn');
                arrowBackOne.classList.remove('active-btn');
                arrowImageBackStart.src = './assets/images/arrow-much-back.svg';
                arrowImageBackOne.src = './assets/images/arrow-back.svg'
            }
        }
        arrowStraight.addEventListener('click', moveStraight);
        arrowStraightEnd.addEventListener('click', moveStraightEnd);
    }

    if (window.innerWidth < 768) {
        const moveStraight = () => {
            if (swipe !== 1500)  {
                click += 1
                swipe += 100;
            }
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            if (click === 2) {
                arrowBackStart.classList.add('active-btn');
                arrowBackOne.classList.add('active-btn');
                arrowImageBackStart.src = './assets/images/arrow-much-straight.svg';
                arrowImageBackOne.src = './assets/images/arrow-straight.svg'
                arrowBackStart.addEventListener('click', moveBackStart);
                arrowBackOne.addEventListener('click', moveBackOne);
            } else if (click === 16) {
                arrowStraight.classList.add('disabled_after');
                arrowStraight.removeEventListener('click', moveStraight)
                arrowStraightEnd.removeEventListener('click', moveStraightEnd);
                arrowStraightEnd.classList.add('disabled_after');
                arrowImageStraightOne.src = './assets/images/arrow-back.svg';
                arrowImageStraightEnd.src = './assets/images/arrow-much-back.svg';
            }
            arrowBackStart.classList.add('active-btn')
            arrowBackStart.addEventListener('click', moveBackStart)
        }

        const moveStraightEnd = () => {
            swipe = 1500;
            click = 16;
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            arrowStraight.classList.add('disabled_after');
            arrowStraight.removeEventListener('click', moveStraight)
            arrowStraightEnd.removeEventListener('click', moveStraightEnd);
            arrowImageStraightOne.src = './assets/images/arrow-back.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-back.svg';
            arrowStraightEnd.classList.add('disabled_after');
            arrowBackStart.classList.add('active-btn');
            arrowBackOne.classList.add('active-btn');
            arrowImageBackStart.src = './assets/images/arrow-much-straight.svg';
            arrowImageBackOne.src = './assets/images/arrow-straight.svg'
            arrowBackStart.addEventListener('click', moveBackStart);
            arrowBackOne.addEventListener('click', moveBackOne);
        }

        const moveBackStart = () => {
            swipe = 0;
            click = 1;
            slider.style.right = swipe;
            numberPage.innerHTML = click;
            arrowStraight.classList.remove('disabled_after');
            arrowStraightEnd.classList.remove('disabled_after');
            arrowImageStraightOne.src = './assets/images/arrow-straight.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-straight.svg';
            arrowStraight.addEventListener('click', moveStraight);
            arrowStraightEnd.addEventListener('click', moveStraightEnd);
            arrowBackStart.removeEventListener('click', moveBackStart);
            arrowBackOne.removeEventListener('click', moveBackOne);
            arrowBackStart.classList.remove('active-btn');
            arrowBackOne.classList.remove('active-btn');
            arrowImageBackStart.src = './assets/images/arrow-much-back.svg';
            arrowImageBackOne.src = './assets/images/arrow-back.svg'
        }

        const moveBackOne = () => {
            if (swipe !== 0)  {
                click -= 1
                swipe -= 100;
            }
            slider.style.right = swipe + '%';
            numberPage.innerHTML = click;
            arrowStraight.classList.remove('disabled_after');
            arrowStraightEnd.classList.remove('disabled_after');
            arrowImageStraightOne.src = './assets/images/arrow-straight.svg';
            arrowImageStraightEnd.src = './assets/images/arrow-much-straight.svg';
            arrowStraight.addEventListener('click', moveStraight);
            arrowStraightEnd.addEventListener('click', moveStraightEnd);
            if (click === 1) {
                slider.style.right = swipe + '%';
                arrowStraight.addEventListener('click', moveStraight);
                arrowStraightEnd.addEventListener('click', moveStraightEnd);
                arrowBackStart.removeEventListener('click', moveBackStart)
                arrowBackOne.removeEventListener('click', moveBackOne)
                arrowBackStart.classList.remove('active-btn');
                arrowBackOne.classList.remove('active-btn');
                arrowImageBackStart.src = './assets/images/arrow-much-back.svg';
                arrowImageBackOne.src = './assets/images/arrow-back.svg'
            }
        }

        arrowStraight.addEventListener('click', moveStraight);
        arrowStraightEnd.addEventListener('click', moveStraightEnd);
    }

}


