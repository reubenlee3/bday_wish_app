import { el } from './base';


export const renderWishList = (wishArr) => {

    wishArr.forEach(renderWish);
    
}

export const clearList = () => {
    el.wishList.innerHTML = '';
};

const renderWish = (wish) => {
    const markup = `
    <li>
        <a class="wish-content__link" href="#${wish.id}">
            <img class="wish-content__img" src="${wish.image}" alt="${wish.title}">
            <div class="wish-content__data">
                <h3 class="wish-content__title">${wish.title}</h4>
                <p class="wish-content__author"><i>${wish.author}</i></p>
                <p class="wish-content__wish">${wish.wish}</p>
            </div>
        </a>
    </li>
    `;
    el.wishList.insertAdjacentHTML('beforeend', markup);

};

