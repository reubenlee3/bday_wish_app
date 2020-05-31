import { el } from './base';

export const clearInput = () => {
    el.searchInput.value = '';
};

export const clearResults = () => {
    el.searchResultList.innerHTML = '';
    el.searchResultPages.innerHTML = '';
};

// export const highlightSelected = id => {
//     const resultsArr = Array.from(document.querySelectorAll('.results__link'));
//     resultsArr.forEach(el => el.classList.remove('results__link--active'));
//     document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
// }


export const getInput = () => el.searchInput.value;

/* Basic working:
 * - take each title
 * - split into the respective words
 * - count to see if they exceed the line title
 * - use reduce cos it has an inbuilt acc value
 */ 
export const limitRecipeTitle = (title, limit= 20) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce( (acc, val) => {
            if (acc + val.length <= limit) {
                newTitle.push(val);
            }
            return acc + val.length;
        }, 0)
        return `${newTitle.join(' ')} ...`
    };
    return title;
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    el.searchResultList.insertAdjacentHTML('beforeend', markup)
}

const createPageButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`


const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // button go to next page
        button = createPageButton(page, 'next');
    } else if (page < pages) {
        // both buttons
        button = `
            ${createPageButton(page, 'prev')}
            ${createPageButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = createPageButton(page, 'prev');
    }
    el.searchResultPages.insertAdjacentHTML('beforeend', button);
};


export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    
    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}