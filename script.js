const userHeight = document.querySelector("#height");
const userWeight = document.querySelector("#weight");
const userAge = document.querySelector("#age");
const userGender = document.querySelector("#gender");
const userActivity = document.querySelector("#activity");
const generateBtn = document.querySelector("#generateBtn");
const mealContainer = document.querySelector("#cardsid");
const ingradientContainer = document.querySelector("#ingradients");
const equipmentContainer = document.querySelector("#equipmentSection");
const stepContainer = document.querySelector("#stepSection");

 var calory;
var BMR;

const height = userHeight.value;
const weight = userWeight.value;
const age = userAge.value;

const genderValue = userGender.value
const activityLevel = userActivity.value
// 100f186224b64773bc34dbcddd0b65ee
function calculateCalory() {
    calory = 0;
    if (genderValue === "female") {
        var BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
        if (activityLevel === "light") {
            BMR = BMR * 1.375
        }
        else if (activityLevel === "moderate") {
            BMR = BMR * 1.55
        }
        else {
            BMR = BMR * 1.725
        }
    }
    else {
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
        if (activityLevel === "light") {
            BMR = BMR * 1.375
        }
        else if (activityLevel === "moderate") {
            BMR = BMR * 1.55
        }
        else {
            BMR = BMR * 1.725
          
        }
    }
    var calory = BMR;
 
}


function validateForm() {
    let isValid = true;
    console.log("validate")
    if (!height) {
        document.getElementById("errorHeight").innerHTML = "*Enter valid Height*";
        isValid = false;
    }
    if (!weight) {
        document.getElementById("errorWeight").innerHTML = "*Enter valid weight*";
        isValid = false;
    }
    if (!age) {
        document.getElementById("errorAge").innerHTML = "*Enter valid age*";
        isValid = false;
    }
    if (userGender.value === 'select gender') {
        document.getElementById("errorGender").innerHTML = "**Select Gender**";
        isValid = false;
    } 
    if (userActivity.value === 'select physical activity') {
        document.getElementById("errorActivity").innerHTML = "**Select physical activity**";
        isValid = false;
    }
    return isValid;
}

generateBtn.addEventListener("click", () => {
    if (genderValue === "female") {
        var BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
        if (activityLevel === "light") {
            BMR = BMR * 1.375
        }
        else if (activityLevel === "moderate") {
            BMR = BMR * 1.55
        }
        else {
            BMR = BMR * 1.725
        }
    }
    else {
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
        if (activityLevel === "light") {
            BMR = BMR * 1.375
        }
        else if (activityLevel === "moderate") {
            BMR = BMR * 1.55
        }
        else {
            BMR = BMR * 1.725
          
        }
    }
    var calory = BMR;
    console.log("calory",calory);
    validateForm()
    //let calory = calculateCalory();
    addMealPlanToContainer(calory);  
})




function addMealPlanToContainer(calory) {
    // Fetch data from the Spoonacular API
    fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${calory}&apiKey=100f186224b64773bc34dbcddd0b65ee`)
        .then(response => response.json())
        .then(data => {

            const meals = data.meals;
            const nutrients = data.nutrients;
            const arr = ["Breakfast", "Lunch", "Dinner"];
            let mealPlanHtml = " ";
            meals.map((meal, ind) => {

                getImageInformation(meal.id).then((imageUrl) => {

                    mealPlanHtml +=
                        `
            <div>
            <h1 class="text-style1">${arr[ind]}</h1>
            <div class="extracard setBreakfast">
                <img src="${imageUrl}" alt="">
                <div class="extracard-info">
                    <h3 class="break-fasth3">${meal.title}</h3>
                    <section class="breakfase-section">Calory : ${nutrients.calories}</section>
                    <button class="btn" type="button" onclick= ingredients(${meal.id})>GET RECIPE</button>
                </div>
            </div>
        </div>
        `

                    // Get the container element

                    // Add the meal plan HTML to the mealContainer

                    mealContainer.innerHTML = mealPlanHtml;

                })
            })
        })
}



function ingredients(id) {
    ingradientContainer.innerHTML = " ";
    const table = document.createElement("table")
    const headerRow = document.createElement("tr");
    const ingredientHeader = document.createElement("th");
    ingredientHeader.textContent = "Ingredient";
    headerRow.appendChild(ingredientHeader);
    table.appendChild(headerRow);
    ingradientContainer.appendChild(table);
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=100f186224b64773bc34dbcddd0b65ee`)
        .then((responce) => responce.json())
        .then((res) => {
            res.extendedIngredients.forEach((element) => {
                const row = document.createElement("tr");
                const ingredientCell = document.createElement("td");
                ingredientCell.textContent = element.name;
                row.appendChild(ingredientCell);
                table.appendChild(row);
            });
            steps(id)
            equipment(id)
        });
}
function steps(id) {
    stepContainer.innerHTML = " ";
    const table = document.createElement("table")
    const headerRow = document.createElement("tr");
    const stepHeader = document.createElement("th");
    stepHeader.textContent = "Step";
    headerRow.appendChild(stepHeader);
    table.appendChild(headerRow);
    stepContainer.appendChild(table);

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=100f186224b64773bc34dbcddd0b65ee`)
        .then((responce) => responce.json())
        .then((res) => {

            res.analyzedInstructions[0].steps.forEach((element) => {
                const row = document.createElement("tr");
                const stepCell = document.createElement("td");
                stepCell.textContent = element.step;
                row.appendChild(stepCell);
                table.appendChild(row);
            });

        });

};

function equipment(id) {
    equipmentContainer.innerHTML = " ";
    const table = document.createElement("table")
    const headerRow = document.createElement("tr");
    const equipmentHeader = document.createElement("th");
    equipmentHeader.textContent = "Equipment";
    headerRow.appendChild(equipmentHeader);
    table.appendChild(headerRow);
    equipmentContainer.appendChild(table);

    fetch(`https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=100f186224b64773bc34dbcddd0b65ee`)
        .then((responce) => responce.json())
        .then((res) => {
            res.equipment.forEach((element) => {
                const row = document.createElement("tr");
                const stepCell = document.createElement("td");
                stepCell.textContent = element.name;
                row.appendChild(stepCell);
                table.appendChild(row);

            });

        });

}


async function getImageInformation(id) {
    const data = await
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=100f186224b64773bc34dbcddd0b65ee`)
    const res = await data.json();
    console.log("image:")
    return res.image;
}







//
// if (height == "") {

//     document.getElementById("errorHeight").innerHTML = "*Enter valid Height*";
//     return false;
// }
// else if (weight == "") {
//     document.getElementById("errorHeight").innerHTML = "";
//     document.getElementById("errorWeight").innerHTML = "*Enter valid weight*";
//     return false;
// }
// else if (age == "") {
//     document.getElementById("errorWeight").innerHTML = "";
//     document.getElementById("errorAge").innerHTML = "*Enter valid age*";
//     return false;
// }
// else if (userGender.value === 'select gender') {
//     document.getElementById("errorAge").innerHTML = "";
//     document.getElementById("errorGender").innerHTML = "**Select Gender**";
//     return false;
// }
// else if (userGender.value === "male") {
//     bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
//     if (userActivity.value === "light") {
//         calory = bmr * 1.375;
//     }
//     else if (userActivity.value === "moderate") {
//         calory = bmr * 1.55;
//     }
//     else if (userActivity.value === "active") {
//         calory = bmr * 1.725;

//     }
//     else if (userActivity.value === 'select physical activity') {

//         document.getElementById("errorActivity").innerHTML = "**Select physical activity**";
//         return false;
//     }

// } else if (userGender.value === "female") {

//     bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
//     if (userActivity.value === "light") {
//         calory = bmr * 1.375;

//     } else if (userActivity.value === "moderate") {
//         calory = bmr * 1.55;

//     } else if (userActivity.value === "active") {
//         calory = bmr * 1.725;

//     } else if (userActivity.value === 'select physical activity') {
//         document.getElementById("errorActivity").innerHTML = "**Select physical activity**";
//         return false;
//     }
// }
// else {
//     document.getElementById("errorGender").innerHTML = "**Select Gender**";
//     return false;
// }

// document.getElementById("errorActivity").innerHTML = "";