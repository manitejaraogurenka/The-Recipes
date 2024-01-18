import {recipeData} from "./Databases/recipeData.js"

const recipeId = localStorage.getItem("id");
console.log(recipeId);

const recipe = recipeData[recipeId];

const Title = document.querySelector(".recipeTitle");
const detailedMain = document.querySelector(".detailed-main");

Title.textContent = recipe.TranslatedRecipeName;

// Function to create the main detailed section
function createDetailedMain(recipe) {
    
    // Create image details container
    const imgDetailsContainer = document.createElement("div");
    imgDetailsContainer.classList.add("imgdetails-container");

    const recipeImage = document.createElement("img");
    recipeImage.classList.add("recipe-image");
    recipeImage.setAttribute("src", recipe["image-url"])
    recipeImage.alt = "Recipe image";

    const timeContainerCuisine = document.createElement("div");
    timeContainerCuisine.classList.add("time-container", "cuisine-container");

    const cuisineParagraph = document.createElement("p");
    cuisineParagraph.classList.add("cuisine");
    cuisineParagraph.textContent = `Cuisine: ${recipe.Cuisine}`;

    const timeContainer = document.createElement("div");
    timeContainer.classList.add("time-container");

    const timerImage = document.createElement("img");
    timerImage.classList.add("time", "png");
    timerImage.setAttribute("src", "./images/timer.png");
    timerImage.setAttribute("alt", "timer png");

    const timeParagraph = document.createElement("p");
    timeParagraph.textContent = `${recipe.TotalTimeInMins} mins`;

    timeContainer.appendChild(timerImage);
    timeContainer.appendChild(timeParagraph);

    timeContainerCuisine.appendChild(cuisineParagraph);
    timeContainerCuisine.appendChild(timeContainer);

    imgDetailsContainer.appendChild(recipeImage);
    imgDetailsContainer.appendChild(timeContainerCuisine);

    // Create ingredient containers
    const ingredientsContainer1 = document.createElement("div");
    ingredientsContainer1.classList.add("ingrediants-container");

    const titleElement1 = document.createElement("h2");
    titleElement1.classList.add("ingrediants");
    titleElement1.textContent = `Ingredients(${recipe["Ingredient-count"]}):`;

    const ingredientsElement1 = document.createElement("p");
    ingredientsElement1.classList.add("ingredients");
    ingredientsElement1.textContent = recipe.TranslatedIngredients;

    ingredientsContainer1.appendChild(titleElement1);
    ingredientsContainer1.appendChild(ingredientsElement1);

    const ingredientsContainer2 = document.createElement("div");
    ingredientsContainer2.classList.add("ingrediants-container");

    const titleElement2 = document.createElement("h2");
    titleElement2.classList.add("ingrediants");
    titleElement2.textContent = "Cleaned Ingredients:";

    const ingredientsElement2 = document.createElement("p");
    ingredientsElement2.classList.add("ingredients");
    ingredientsElement2.textContent = recipe["Cleaned-Ingredients"];

    ingredientsContainer2.appendChild(titleElement2);
    ingredientsContainer2.appendChild(ingredientsElement2);

    // Create instructions container
    const instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("instructions-container");

    const titleElement3 = document.createElement("h2");
    titleElement3.classList.add("ingrediants");
    titleElement3.textContent = "Instructions:";

    const instructionsElement = document.createElement("p");
    instructionsElement.classList.add("ingredients");
    instructionsElement.textContent = recipe.TranslatedInstructions;

    instructionsContainer.appendChild(titleElement3);
    instructionsContainer.appendChild(instructionsElement);

    // Append created elements to the detailedMain
    detailedMain.appendChild(imgDetailsContainer);
    detailedMain.appendChild(ingredientsContainer1);
    detailedMain.appendChild(ingredientsContainer2);
    detailedMain.appendChild(instructionsContainer);
}

// Call the function to create the detailed main section
createDetailedMain(recipe);
