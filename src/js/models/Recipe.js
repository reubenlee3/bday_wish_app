import axios from 'axios'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {

        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert('Something went wrong');
        };
        
    }

    calcCookTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(el => {
            // uniform units
            let ingredient = el.toLowerCase()
            unitsLong.forEach( (unit, idx) => {
                ingredient = ingredient.replace(unit, units[idx])
            })

            // remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // parse ingredients into count, unit, and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // 4 1/2 cups, arrCount is [4, 1/2]
                // 4 cups, arrCount is [4]

                const arrCount = arrIng.slice(0, unitIndex); 
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+')); // same as the python eval
                };

                objIng = {
                    count,
                    unit: arrIng[unitIndex], 
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };


            } else if (parseInt(arrIng[0], 10)) {
                // There is no unit but there is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '', 
                    ingredient: arrIng.slice(1).join(' ') //ES6 stuff, if the attribute name is same 
                };
            } else if (unitIndex === -1) {
                // no unit and no number
                objIng = {
                    count: 1,
                    unit: '', 
                    ingredient //ES6 stuff, if the attribute name is same 
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        
        // servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings)
        })

        this.servings = newServings;


    }
}
