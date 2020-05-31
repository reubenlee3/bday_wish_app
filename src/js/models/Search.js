import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        try {
            const res = await axios(`https://bday-wish-api.herokuapp.com/api/search/?search=${this.query}`);
            this.result = res.data
            console.log(this.result);
        } catch(error) {
            alert(error)
        };
        
    }
}
