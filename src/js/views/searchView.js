import { el } from './base';

export const clearInput = () => {
    el.searchInput.value = '';
};

export const clearResults = () => {
    el.searchList.innerHTML = '';
};

// export const highlightSelected = id => {
//     const resultsArr = Array.from(document.querySelectorAll('.results__link'));
//     resultsArr.forEach(el => el.classList.remove('results__link--active'));
//     document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
// }


export const getSearchInput = () => el.searchInput.value;

/* Basic working:
 * - take each title
 * - split into the respective words
 * - count to see if they exceed the line title
 * - use reduce cos it has an inbuilt acc value
 */ 
export const limitTitle = (title, limit= 15) => {
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

const renderSearchSucc = (searchItems) => {
    const markup = `
    <li>
        <a class="search-content__link" href="#${searchItems.id}">
            <img class="search-content__img" src="${searchItems.image}" alt="${searchItems.title}">
            <div class="search-content__data">
                <h4 class="search-content__title">${limitTitle(searchItems.title)}</h4>
                <p class="search-content__author">${searchItems.author}</p>
            </div>
        </a>
    </li>
    `;
    el.searchList.insertAdjacentHTML('beforeend', markup);
};

const renderSearchNull = () => {
    const markup = `
    <li>
        <a class="search-content__link">
            <div class="search-content__data">
                <h3 class="search-content__title">Your search returned no results</h3>
            </div>
        </a>
    </li>
    `;
    el.searchList.insertAdjacentHTML('beforeend', markup);
};


export const renderSearchResults = (searchArr) => {

    // insert search results into search-content body
    if (searchArr.length === 0) {
        renderSearchNull();
    } else {
        searchArr.forEach(renderSearchSucc);
    };
    
}

// Render a specified search item onto the wish body
const renderSearchItem = (searchItem) => {
    const markup = `
    <li>
        <a class="wish-content__link" href="#${searchItem.id}">
            <img class="wish-content__img" src="${searchItem.image}" alt="${searchItem.title}">
            <div class="wish-content__data">
                <h3 class="wish-content__title">${searchItem.title}</h4>
                <p class="wish-content__author">${searchItem.author}</p>
                <p class="wish-content__wish">${searchItem.wish}</p>
            </div>
        </a>
    </li>
    `;
    el.wishList.insertAdjacentHTML('beforeend', markup);
};

export const renderSingleSearch = (search) => {

    renderSearchItem(search);

};