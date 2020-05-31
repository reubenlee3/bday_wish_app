import '../css/style.css';
import '../img/icons.svg';
import axios from 'axios';


// import { elements, renderLoader, clearLoader } from './views/base';


/** Global state of the app, will make other parts persistent
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 * ***/

 /*
 Search Controller
 */

// const state = {}




// Modal pop up form
const el = {
    // Get the modal
    modal: document.getElementById("modal-content__body"),
    // Get the button that opens the modal
    openModal: document.getElementById("modal-content__button"),
    // Get the <span> element that closes the modal
    closeBtn: document.getElementById("modal-content__close"),
    // Get the submit element 
    submit: document.getElementById("modal-content__submit"),
    // Form inputs
    title: document.getElementById( "title" ),
    author: document.getElementById( "author" ),
    wish: document.getElementById( "wish" ),
  }
  
  

  
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
    sub();
}


// Push form data
async function sub() {
    const formData = prepForm();
    
    try{
      await axios({
        method: 'post',
        url: 'https://bday-wish-api.herokuapp.com/api/list/',
        data: formData,
      })
      el.modal.style.display = "none";
      alert('Form Submitted!')
      clearInputs();
    } catch (error) {
      alert(error);
      console.log(error);
    };
};

// Get text data from form inputs
function getTextData() {
    const obj = {
        title: el.title.value,
        author: el.author.value,
        wish: el.wish.value,
    }
    if(obj.title === "" || obj.author === "" || obj.wish === "") {
        alert("Please fill all text boxes! (Image not required)")
        return
    }
    return obj
};

// Get image file from form inputs. Return false if no file attached
function getImage() {
    if (document.getElementById( "image" ).value !== "") {
       return document.getElementById( "image" ); 
    } else {
        return false
    }
    
}

// Append formData for push
function prepForm() {
    const formData = new FormData();
    const data = getTextData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('wish', data.wish);
    const imageFile = getImage();  
    if (imageFile !== false) {
        formData.append('image', imageFile.files[0]);
    }
    return formData;
}

// Clear input fields
function clearInputs() {
    el.title.value = "";
    el.author.value = "";
    el.wish.value = "";
}