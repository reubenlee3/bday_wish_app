import axios from 'axios'

export class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        try {
            const res = await axios(`https://bday-wish-api.herokuapp.com/api/search/?search=${this.query}`);
            this.result = res.data;
        } catch(error) {
            alert(error);
        };
    }
}

export class SearchItem {
    constructor(id) {
        this.id = id;
    }

    async getResults() {

        try {
            const res = await axios(`https://bday-wish-api.herokuapp.com/api/detail/${this.id}`);
            this.title = res.data.title;
            this.image = res.data.image;
            this.author = res.data.author;
            this.wish = res.data.wish;

        } catch(error) {
            alert(error)
        };
    }
}
