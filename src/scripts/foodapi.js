console.log("We good")

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.log(parsedFoods)
        parsedFoods.forEach(food => {
            console.log(food)
            console.log(food.name)
        })
    })

