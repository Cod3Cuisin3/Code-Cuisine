const main = () => {

    document.addEventListener('mousedown', (e) => {
        const recipeModal = document.getElementById('recipeModal');
        const button = document.querySelector('button[data-id]');

        if (!recipeModal.contains(e.target) && e.target !== button) {
            recipeModal.style.display = 'none';
        }
    });
};




const getFoodData = async () => {
    const jamaicaUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Jamaican';

    try {
        const response = await fetch(jamaicaUrl);
        if (!response.ok) {
            throw new Error(`Bad Fetch responded with ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(jsonData);

        jsonData.meals.forEach(meal => {
            const food = document.getElementById('food');

            const heading = document.createElement('h3');
            heading.innerHTML = meal.strMeal;


            const img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;

            const button = document.createElement('button')
            button.dataset.id = meal.idMeal;
            button.textContent="Recipe"


            const li = document.createElement('li');

            //Implemented Event Listener for Button
            button.addEventListener('click', async (e) => {
                if(food.contains(e.target)){
                const mealId = e.target.dataset.id
                console.log(`Meal ID: ${mealId}`);
                //Fetch meal id
                const foodId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

                    try{
                        const response = await fetch (foodId)

                        if(!response.ok){
                            throw new Error(`Bad fetch ${response.status}`)
                        }
                        const fullRecipe = await response.json();
                        console.log(`Full Recipe:`, fullRecipe);

                        const h2 = document.createElement('h2');
                        h2.innerHTML = fullRecipe.meals[0].strMeal;
                        h2.style.fontFamily = 'Cursive'

                        const p = document.createElement('p');
                        p.innerHTML = fullRecipe.meals[0].strInstructions;
                        p.style.fontFamily = 'Cursive'

                        const recipeModal = document.getElementById('recipeModal')
                        recipeModal.innerHTML = ''
                        recipeModal.append(h2)
                        recipeModal.append(p)
                        recipeModal.style.display = 'block'
                        const { strInstructions} = fullRecipe.meals[0];
                        console.log(`strInstructions: ${strInstructions}`);

                        const buttonRect = e.target.getBoundingClientRect();
                        // recipeModal.style.top = `${buttonRect.top + window.scrollY}px`;
                        // recipeModal.style.left = `${buttonRect.left + window.scrollX}px`;
            
                        // Display the modal
                        recipeModal.style.display = 'block';
                        

                    }

                    catch(error){
                        console.error(`${error.name},${error.message}`)
                    }

                }
                
              });

              
            li.append(heading,img,button)
            food.appendChild(li);
        });

    } catch (error) {
        console.error(`${error.name}: ${error.message}`);
    }

   
};



document.addEventListener('DOMContentLoaded', function() {
    const music = new Audio('./src/backgroundMusic.mp3');
    music.play();
    music.loop = true
  });

getFoodData();
main();
music.play()
