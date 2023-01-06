const weight = document.getElementById("weight")
const height = document.getElementById("height")
const age = document.getElementById("age")
const gender = document.getElementById("gender")
const activity = document.getElementById("activity")


const submitbtn = document.getElementById("submit-btn")
submitbtn.addEventListener("click" , () => {
    const W = weight.value
    const H = height.value
    const A = age.value
    const genderValue = gender.value
   
   
    if(genderValue === "female"){
       var BMR = 66.47 + (13.75 * W) + (5.003 * H) - (6.755 * A)
    }else{
         BMR = 655.1 + (9.563 *W) + (1.850*H) - (4.676*A)
    }
    
    const activityLevel = activity.value
   
  if(activityLevel === "light"){
    BMR = BMR*1.375
  }
  else if(activityLevel === "moderate"){
    BMR = BMR*1.55
  }
  else{
    BMR = BMR*1.725
  }
 
  var targetCalories = BMR;
  console.log("BMR:",W,H,A ,genderValue,activityLevel,targetCalories)
  


  
  function addMealPlanToContainer( targetCalories ) {
         // Fetch data from the Spoonacular API
    
        fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=bb495a4de1df4b729047f9e934502ada
        `)
          .then(response => response.json())
          .then(data => {
            
          const meals = data.meals;
          const nutrients = data.nutrients;
         const arr = ["Breakfast","Lunch","Dinner"];
          let mealPlanHtml = " ";
          meals.map((meal, ind) => {
              
            getImageInformation(meal.id).then((imageUrl) => {
                 
             mealPlanHtml +=
                      `
                       <div class="breakfast">
                                 <h3>${arr[ind]}</h3>
                            <div class="card"">
                                <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
                               <div class="card-body">
                                  <h5 class="card-title">${meal.title}</h5>
                                     <p class="card-text">Calorie :${nutrients.calories}</p>
                                   <button  onclick="getRecipe(${meal.id})" class="btn btn-primary">Get Recipe</button>
                                </div>
                            </div>
                        </div>`             
            
             // Get the container element
              const container = document.getElementById("container");
  
             // Add the meal plan HTML to the container
               container.innerHTML = mealPlanHtml;
              
                 })
          })
      })
      
  }
  addMealPlanToContainer(targetCalories);

  
  async function getImageInformation(id) {
  const data = await
      fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bb495a4de1df4b729047f9e934502ada
      `)
  const res = await data.json();
  console.log("image:")
  return res.image;
  }
});

// Add the recipe to the page

async function getRecipe(id) {
  const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bb495a4de1df4b729047f9e934502ada
  `)
  const res = await data.json();

  const RecipeContainer = document.getElementById("recipe");
  const table = document.createElement("table");
  table.classList.add('my-table');

  // Create the table header
  const headerRow = document.createElement("tr");
  const ingredientHeader = document.createElement("th");
  ingredientHeader.textContent = "Ingredient";
  headerRow.appendChild(ingredientHeader);
  const stepHeader = document.createElement("th");
  stepHeader.textContent = "   Step";
  stepHeader.classList.add('stepHeader');
  headerRow.appendChild(stepHeader);
  const equipmentHeader = document.createElement("th");
  equipmentHeader.textContent = "Equipment";
  headerRow.appendChild(equipmentHeader);
  table.appendChild(headerRow);
  recipe.innerHTML = ""; // Clear the container first
  recipe.appendChild(table); // Add the table to the page

  // Add a row for each ingredient, step, and equipment
  res.extendedIngredients.forEach((ingredient, index) => {
    const row = document.createElement("tr");
    const ingredientCell = document.createElement("td");
    ingredientCell.textContent = ingredient.name;
    row.appendChild(ingredientCell);
    const stepCell = document.createElement("td");
    stepCell.classList.add('stepCell');
    stepCell.textContent = res.analyzedInstructions[0].steps[index].step;
    row.appendChild(stepCell);
    const equipmentCell = document.createElement("td");
    equipmentCell.textContent = res.analyzedInstructions[0].steps[index].equipment[0].name;
    row.appendChild(equipmentCell);
    table.appendChild(row);
  });
}


  






