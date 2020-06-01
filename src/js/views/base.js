export const el = {
    // Modal DOM elements
    modal: document.getElementById("modal-content__body"),
    modalContent: document.getElementById("modal-content"),
    openModal: document.getElementById("modal-content__button"),
    closeBtn: document.getElementById("modal-content__close"),
    submit: document.getElementById("modal-content__submit"),
    title: document.getElementById( "title" ),
    author: document.getElementById( "author" ),
    wish: document.getElementById( "wish" ),

    // Wish list DOM elements
    wishList: document.querySelector('.wish-content__list'),
    wishContent: document.querySelector('.wish-content'),

    // Search list DOM elements
    searchList: document.querySelector('.search-content__list'),
    searchContent: document.querySelector('.search-content'),
    searchBtn: document.querySelector('.search__btn'),
    searchInput: document.querySelector('.search__field'),
}

export const elementStrings = {
    loader: 'loader',
}


export const renderLoader = parent => {
    
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader)
    }
}

export const resetViews = () => {
    el.searchContent.innerHTML = '';
    el.wishContent.innerHTML = '';
}