const main = () => {
    document.addEventListener('mousedown', handleModalClose);
};

const handleModalClose = (e) => {
    const recipeModal = document.getElementById('recipeModal');
    const button = document.querySelector('button[data-id]');

    if (!recipeModal.contains(e.target) && e.target !== button) {
        recipeModal.style.display = 'none';
    }
};

const getFoodData = async () => {
    try {
        const jamaicaUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Jamaican';
        const response = await fetch(jamaicaUrl);

        if (!response.ok) {
            throw new Error(`Bad Fetch responded with ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(jsonData);

        const foodList = document.getElementById('food');
        jsonData.meals.forEach(meal => {
            if (meal.strMeal === "Oxtail with broad beans") {
                meal.strMealThumb = "src/oxtail.jpg"; 
            }
            createMealElement(meal, foodList);
        });

    } catch (error) {
        console.error(`${error.name}: ${error.message}`);
    }
};


const createMealElement = (meal, parentElement) => {
    const { strMeal, strMealThumb, idMeal } = meal;

    const heading = document.createElement('h3');
    heading.innerHTML = strMeal;

    const img = document.createElement('img');
    img.src = strMealThumb;
    img.alt = strMeal;

    const button = document.createElement('button');
    button.dataset.id = idMeal;
    button.textContent = "Recipe";
    button.addEventListener('click', handleRecipeButtonClick);

    const li = document.createElement('li');
    li.append(heading, img, button);

    parentElement.appendChild(li);
};

const handleRecipeButtonClick = async (e) => {
    const mealId = e.target.dataset.id;
    console.log(`Meal ID: ${mealId}`);

    try {
        const foodId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const response = await fetch(foodId);

        if (!response.ok) {
            throw new Error(`Bad fetch ${response.status}`);
        }

        const fullRecipe = await response.json();
        console.log(`Full Recipe:`, fullRecipe);

        const { strMeal, strInstructions, strYoutube } = fullRecipe.meals[0];
        const recipeModal = document.getElementById('recipeModal');
        recipeModal.innerHTML = '';

        const h2 = document.createElement('h2');
        h2.innerHTML = strMeal;
        h2.style.fontFamily = 'Cursive';

        const p = document.createElement('p');
        p.innerHTML = strInstructions;
        p.style.fontFamily = 'Cursive';

        const youtubeButton = createYoutubeButton(strYoutube);
        youtubeButton.classList.add('youtube-button');

        recipeModal.append(h2, p, youtubeButton);
        recipeModal.style.display = 'block';

    } catch (error) {
        console.error(`${error.name},${error.message}`);
    }
};

const createYoutubeButton = (strYoutube) => {
    const a = document.createElement('a');
    a.href = strYoutube;
    a.target = '_blank';

    const youtubeButton = document.createElement('button');
    youtubeButton.textContent = "YouTube";
    youtubeButton.classList.add('youtube-button');

    a.appendChild(youtubeButton);
    return a;
    
};

document.addEventListener('DOMContentLoaded', () => {
    const music = new Audio('./src/backgroundMusic.mp3');
    music.play();
    music.autoplay = true;
    music.loop = true;
});

getFoodData();
main();
