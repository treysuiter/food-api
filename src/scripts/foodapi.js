console.log("We good")

function foodFactory (food) {
    console.log(food)
    return `
    <div class="foodItem">
        <h1>${food.name}</h1>
        <p>${food.ethnicity}</p>
        <p>${food.category}</p>
    </div>
    `
}

function addFoodToDom (foodHTML) {
    const foodContainer = document.querySelector(".foodList")
    foodContainer.innerHTML += foodHTML
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })


