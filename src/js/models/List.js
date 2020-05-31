import axios from 'axios';

export default class List {
    constructor() {
    }

    async getFullList() {
        
        try {
            
            const res = await axios(`https://bday-wish-api.herokuapp.com/api/list/`);
            this.result = res.data;
            console.log(this.result);

        } catch(error) {

            alert(error);

        };

    }
}