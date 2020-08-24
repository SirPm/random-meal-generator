const generateBtn = document.querySelector('#generateBtn');
const output = document.querySelector('.output');
const ingredients = document.querySelector('.ingredients');
const last = document.querySelector('.last');

generateBtn.addEventListener('click', generateMeal);

function generateMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => {
        let mealIngredients = [];
        output.innerHTML = `
            <h2 id="foodName">${data.meals[0].strMeal}</h2>
            <p class="c-and-r"> Category: ${data.meals[0].strCategory}</p>
            <p class="c-and-r"> Region: ${data.meals[0].strArea}</p>
            <img src="${data.meals[0].strMealThumb}">
            <p class="list-heading"><strong>List of Ingredients</strong></p>
        `;

        for(let i = 1; i <= 20; i++ ) {
            console.log(data.meals[0][`strIngredient${i}`]);
            if(data.meals[0][`strIngredient${i}`]) {
                mealIngredients.push(
                    `${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}`
                );
            } else {
                break;
            }
        }

        mealIngredients.forEach(function(ingredient) {
            ingredients.innerHTML += `
            <ul>
                <li>${ingredient}</li>
            </ul>
            `;
        });
        
        let instructionsArr = data.meals[0].strInstructions.split('.');

        last.innerHTML = `
            <h3 id="instrHeading">Instructions </h3>
        `

        instructionsArr.forEach(function(instruction) {
            last.innerHTML += `
            <ul>
                <li>${instruction}</li>
            </ul>
            `;
        });

        last.innerHTML += `
            <h3 id="video">Recipe Video Tutorial</h3>
            <div class="video-div">
                <iframe class="video-inner" width="320" height="200" src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}">
                </iframe>
            </div>
        `;
    })
}