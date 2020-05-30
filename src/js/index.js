import '../css/style.css';
import '../img/icons.svg';

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';


/** Global state of the app, will make other parts persistent
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 * ***/

 /*
 Search Controller
 */

const state = {}


const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. new search object and add to state 
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch {
            alert('Somethign went wrong');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/*
Recipe Controller
*/
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // Prepare UI for changes, clear the recipe body, then render the loader
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // calclate servings
            state.recipe.calcServings();
            state.recipe.calcCookTime();
            state.recipe.parseIngredients();


            // render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id),
            );

        } catch {
            alert('Error processing recipe. Pls try again')
        }
        
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/*
List Controller
*/

const controlList = () => {
    // add a list to the state object
    if (!state.list) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// handle delete and update list item events 
elements.shopping.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;

    // handle delete event
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from stat
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    
    // handle count update
    } else if (event.target.matches('.shopping__count-value')) {
        const val = parseFloat(event.target.value);
        state.list.updateCount(id, val);

    }
})


/*
Likes Controller
*/


const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currID = state.recipe.id;

    // user has not yet liked current recipe
    if (!state.likes.isLiked(currID)) {
        // add like the to the state
        const newLike = state.likes.addLike(
            currID, 
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        )

        // toggle the like button
        likesView.toggleLikeBtn(true);

        // add like to UI list
        likesView.renderLike(newLike);

    // user has yet liked current recipe
    } else {

        // remove like from the state
        state.likes.deleteLike(currID);

        // toggle the like button
        likesView.toggleLikeBtn(false);

        // remove like from UI list
        likesView.deleteLike(currID);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


// Restore liked recipes on page load

window.addEventListener('load', () => {
    state.likes = new Likes();

    // restore likes
    state.likes.readStorage();

    // toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
})



// handling recipe button add/dec clicks
elements.recipe.addEventListener('click', event => {

    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe)
        }
        
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    } else if (event.target.matches('.recipe__btn-add, .recipe__btn-add *')){
        // add ingredients to the shopping list
        controlList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        // Like Controller
        controlLike();
    }
    
});


