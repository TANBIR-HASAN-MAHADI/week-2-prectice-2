let groupedPlayers = [];

searchPlayer = () => {
    const query = document.getElementById('in-box').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => res.json())
        .then(data => {
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                document.getElementById('meals-container').innerHTML = '<h4>No meal found!</h4>';
            }
        })
        .catch(err => console.error(err));
}

displayMeals = (meals) => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        const card = `
        <button class="btn col-3" onclick="showDetails(${meal.idMeal})">
        <div class="col-md-4">
            <div class="card">
                <img src="${meal.strMealThumb}" alt="Meal Image" class="card-img-top">
                <div class="card-body">
                    <h3>${meal.strMeal}</h3>
                    <p>Category: ${meal.strCategory}</p>
                    <p>Area: ${meal.strArea}</p>
                    
                </div>
            </div>
        </div></button>
        `;
        mealsContainer.innerHTML += card;
    });
}

const showDetails = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then(data => {
                const meal = data.meals[0];
                const mealDetailsContainer = document.getElementById('meal-details');
                mealDetailsContainer.innerHTML = `
                    <div class="card mb-3">
                        <img src="${meal.strMealThumb}" alt="Meal Image" class="card-img-top" style="max-width: 200px; margin: auto;">
                        <div class="card-body">
                            <h3>${meal.strMeal}</h3>
                            <p><strong>Category:</strong> ${meal.strCategory}</p>
                            <p><strong>Area:</strong> ${meal.strArea}</p>
                        </div>
                    </div>
                `;
            
        })
        .catch(err => console.error(err));
};
