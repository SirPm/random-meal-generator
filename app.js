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
        console.log(data);
        output.innerHTML = `
        
            <h2>${data.meals[0].strMeal}</h2>
            <p> Category: ${data.meals[0].strCategory}</p>
            <p> Region: ${data.meals[0].strArea}</p>
            <img src="${data.meals[0].strMealThumb}">
            <p>List of Ingredients: </p>
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

        })
        
        let instructionsArr = data.meals[0].strInstructions.split('.');

        last.innerHTML = `
            <h3>Instructions: </h3>
        `

        instructionsArr.forEach(function(instruction) {

            last.innerHTML += `
            <ul>
                <li>${instruction}</li>
            </ul>
            `;

        });

        last.innerHTML += `
            <video src="${data.meals[0].strYoutube}"></video>
        `;

    })

}