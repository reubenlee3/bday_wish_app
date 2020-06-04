import '../css/style.css';
import '../img/icons.svg';
import '../img/loading.jpeg';
import '../img/dessert.png';
import axios from 'axios';


//  Model Imports
import List from './models/List';
import Post from './models/Post';

import { Search, SearchItem } from './models/Search';
import Loading from './models/Loading';


// Views Imports
import * as listView from './views/listView';
import * as postView from './views/postView';
import * as searchView from './views/searchView';
import * as loadingView from './views/loadingView';

// Base Imports
import { el, renderLoader, clearLoader } from './views/base';
import { setTimeout } from 'core-js';






const state = {};

/*****************************
 * Full List controller
 *****************************/

// Get the full list of wishes 
const controlList = async () => {

    state.list = new List();

    renderLoader(el.wishContent);

    try {
        // Retrive search results
        await state.list.getFullList();

        // Prepare UI
        listView.clearList();
        clearLoader();

        // Render wishes on to wish body
        listView.renderWishList(state.list.result);

    } 

    catch(error) {
        alert('Somethign went wrong');
        console.log(error)
        clearLoader();
    }
};

/*****************************
 * Search List controller
 *****************************/

// Function for the search body
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getSearchInput();

    if (query) {
        // 2. new search object and add to state 
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(el.searchContent);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. render results on UI
            clearLoader();
            searchView.renderSearchResults(state.search.result);

        } catch {
            alert('Somethign went wrong');
            clearLoader();
        }
    }
};

// Function to display search result when clicked on
const controlSearchItem = async () => {

    // Retrieve id from the nav bar
    const id = window.location.hash.replace('#', '');

    if (id) {

        // Prep UI for changes
        listView.clearList();
        renderLoader(el.wishContent); 

        // create new search item object
        state.searchItem = new SearchItem(id);

        try {

            // get the search item data
            await state.searchItem.getResults();

            // Put new search item into UI
            clearLoader();
            searchView.renderSingleSearch(state.searchItem);

        }

        catch {
            alert('Something went wrong, could you try again?')
        }

    }


};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlSearchItem));

// Search button hit
el.searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    controlSearch();
});





  
/*****************************
 * Post form controller
 *****************************/

// Push form data
const controlPost = async () => {
    // Get text data
    const textData = postView.getTextData();
    // Get image data
    const imageFile = postView.getImage();
    // Create form data
    const formData = postView.prepForm(textData, imageFile);
    // Create new post object
    state.post = new Post(formData);
    renderLoader(el.modalContent);
    try {
        // Attempt to post data
        await state.post.postData()
        // Close modal
        el.modal.style.display = "none";
        alert('Form Submitted!')
        postView.clearInputs();
        clearLoader();

        // Render results again to show the new post
        controlList();
        
    } catch (error) {
        alert(error);
        clearLoader();

    };
};


// When the user clicks on the button, open the modal (display of modal from none to block)
el.openModal.addEventListener('click', () => {
    el.modal.style.display = "block";
});

// When the user clicks on (x), close the modal
el.closeBtn.onclick = function() {
    el.modal.style.display = "none";
};

/* When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == el.modal) {
        el.modal.style.display = "none";
    }
});
*/

// Push form data when submit button is clicked
el.submit.onclick = function() {
    controlPost();
}


/*****************************
 * Window controller
 *****************************/

// Information modal


// el.modalInfoClose.onclick = function() {
//     el.modalInfo.style.display = "none";
// };


// Reset View 

const resetList = () => {

    // clear the wish contents
    listView.clearList();
    searchView.clearResults();

    // render the loader
    renderLoader(el.wishContent);

    // get full list of wishes
    try {

        // get the search item data
        controlList();

        clearLoader();

    }

    catch {
        alert('Something went wrong, could you try again?')
    }
};

el.resetBtn.addEventListener('click', resetList);





// Init on Dom load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new Loading(txtElement, words, wait);
  }
 // Remove load screen
setTimeout(function(){loadingView.removeLoad(); }, 10500);

// Load the full list when the page loads
window.addEventListener('load', () => {
    
    // Load the information modal
    // el.modalInfo.style.display = "block";

    // Load all wishes upon loading window
    controlList();

    // 

})
