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
    submit: document.getElementById("modal-content__submit")
  
  }
  
  

  
// When the user clicks on the button, open the modal (display of modal from none to block)
el.openModal.addEventListener('click', () => {
    el.modal.style.display = "block";
});

// When the user clicks on (x), close the modal
el.closeBtn.onclick = function() {
    el.modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == el.modal) {
        el.modal.style.display = "none";
    }
});

el.submit.onclick = function() {
    sub();
}



function sub() {
    const formData = new FormData();
    const data = getTextData();
    console.log(data)
    console.log(data.title)
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('wish', data.wish);
    console.log(formData)
    try{
      axios({
        method: 'post',
        url: 'https://bday-wish-api.herokuapp.com/api/list/',
        data: formData,
      })
      alert('Form Submitted!')
    } catch (error) {
      alert(error);
      console.log(error);
    };
  };

  function getTextData() {
    const obj = {
        title: document.getElementById( "title" ).value,
        author: document.getElementById( "author" ).value,
        wish: document.getElementById( "wish" ).value,
    }
    
    return obj
  };

const image = document.getElementById("image").value;