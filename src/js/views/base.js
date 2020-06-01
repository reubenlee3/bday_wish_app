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

    // Load screen
    loadScreen: document.getElementById("load_screen"),

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

/* Alternative loader
Html:
        <div class="loader">
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>            
        </div>

CSS:
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 40px;
    display: flex;
    align-items:center;
}
.obj{
    width: 6px;
    height: 0px;
    background: #3bd6c6;
    margin: 0 3px;
    border-radius: 10px;
    animation: loading 0.8s infinite;
}
.obj:nth-child(2){
    animation-delay: 0.1s;
}
.obj:nth-child(3){
    animation-delay: 0.2s;
}
.obj:nth-child(4){
    animation-delay: 0.3s;
}
.obj:nth-child(5){
    animation-delay: 0.4s;
}
.obj:nth-child(6){
    animation-delay: 0.5s;
}
.obj:nth-child(7){
    animation-delay: 0.6s;
}
.obj:nth-child(8){
    animation-delay: 0.7s;
}

@keyframes loading {
    0%{
        height: 0px;
    }
    50%{
        height: 40px;
    }
    100%{
        height: 0px;
    }
}

*/

