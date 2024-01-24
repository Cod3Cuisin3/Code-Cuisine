
//const foodUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Jamaican%20Beef%20Patties'


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
    const modal = document.getElementById('modal');

    const heading = document.createElement('h3');
    heading.innerHTML = meal.strMeal;

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;

    modal.appendChild(heading);
    modal.appendChild(img);
});

    } catch (error) {
        console.error(`${error.name}: ${error.message}`);
    }

   
};


getFoodData();

                                    
