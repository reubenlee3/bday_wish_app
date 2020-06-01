import '../css/style.css';
import '../img/icons.svg';
import '../img/loading.jpeg';
import axios from 'axios';


//  Model Imports
import List from './models/List';
import Post from './models/Post';
import Search from './models/Search';
import Loading from './models/Loading';

// Views Imports
import * as listView from './views/listView';
import * as postView from './views/postView';
import * as searchView from './views/searchView';
import * as loadingView from './views/loadingView';

// Base Imports
import { el, renderLoader, clearLoader } from './views/base';
import { setTimeout } from 'core-js';






const state = {}

/*****************************
 * Full List controller
 *****************************/

// Get the full list of wishes 
const controlList = async () => {

    state.list = new List();

    renderLoader(el.wishContent);

    try {

        await state.list.getFullList();
        clearLoader();
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
        console.log(error);

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
 * Window Load controller
 *****************************/

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
    // Load all wishes upon loading window
    controlList();


})
