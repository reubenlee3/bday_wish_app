import '../css/style.css';
import '../img/icons.svg';
import axios from 'axios';


//  Model Imports
import List from './models/List';
import Post from './models/Post';

// Views Imports
import * as listView from './views/listView';
import * as postView from './views/postView'

import { el, renderLoader, clearLoader } from './views/base';


const state = {}

/*****************************
 * Full List controller
 *****************************/

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

window.addEventListener('load', () => {
    controlList();
})

  
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




