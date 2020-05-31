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

    // Search DOM elements
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