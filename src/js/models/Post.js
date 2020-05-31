import axios from 'axios';

export default class Post { 
    constructor(formData){
        this.formData = formData;
    }

    async postData(){
        try {
            await axios({
                method: 'post',
                url: 'https://bday-wish-api.herokuapp.com/api/list/',
                data: this.formData,
            })
        } catch(error) {
            alert(error);
        }
    };
}