console.log("We good")

function foodFactory(food) {
  console.log(food)
  return `
    <div class="foodItem">
        <h2>${food.name}</h2>
        <p>${food.ethnicity}</p>
        <p>${food.category}</p>
        <p>${food.ingredients}</p>
        <p>${food.country}</p>
    </div>
    `
}
const foodContainer = document.querySelector(".foodList")

function addFoodToDom(foodHTML) {
  foodContainer.innerHTML += foodHTML
}

// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             // const foodAsHTML = foodFactory(food)
//             // addFoodToDom(foodAsHTML)
//         })
//     })

fetch("http://localhost:8088/food")
  .then(response => response.json())
  .then(myParsedFoods => {
    myParsedFoods.forEach(food => {
      console.log(food) // Should have a `barcode` property

      // Now fetch the food from the Food API
      fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
          if (productInfo.product.ingredients_text) {
            food.ingredients = productInfo.product.ingredients_text
          } else {
            food.ingredients = "no ingredients listed"
          }

          if (productInfo.product.countries) {
            food.country = productInfo.product.countries
          } else {
            food.country = "no ingredients listed"
          }

          // Produce HTML representation
          const foodAsHTML = foodFactory(food)

          // Add representaiton to DOM
          addFoodToDom(foodAsHTML)
        })
    })
  })