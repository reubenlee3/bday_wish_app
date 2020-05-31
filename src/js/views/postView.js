import { el } from './base';

export const getTextData = () => {
    const obj = {
        title: el.title.value,
        author: el.author.value,
        wish: el.wish.value,
    }
    if(obj.title === "" || obj.author === "" || obj.wish === "") {
        alert("Please fill all text boxes! (Image not required)");
        return;
    }
    return obj;
};

export const getImage = () => {
    if (document.getElementById( "image" ).value !== "") {
        return document.getElementById( "image" ); 
     } else {
         return false;
     }
};

export const prepForm = (textData, imageFile) => {
    const formData = new FormData();
    formData.append('title', textData.title);
    formData.append('author', textData.author);
    formData.append('wish', textData.wish);
    if (imageFile !== false) {
        formData.append('image', imageFile.files[0]);
    }
    return formData;    
}


export const clearInputs = () => {
    el.title.value = "";
    el.author.value = "";
    el.wish.value = "";    
}