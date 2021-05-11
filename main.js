// API Key
const YOUR_APP_ID = "3cf0d53e";
const YOUR_APP_KEY = "3ae63af785bcc6375c7f7cc983b967a1";

// DOM Variables
const recipeLink = document.querySelector("#recipe-link");
const image = document.querySelector("#image");
const ingredientsList = document.querySelector("#ingredients-list");

const form = document.querySelector("form");
form.addEventListener("submit",handleRecipeSubmit);
// Variables
let foodToSearch = null;

// Functions
function handleRecipeSubmit(event) {
  fetchRecipe(foodToSearch);
  event.preventDefault();
  form.reset();
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  //--- write your code below ---
  const requestURL = `https://api.edamam.com/search?q=${foodToSearch}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  let response = await fetch(requestURL);
  let recipeAllHits = await response.json();
  let recipe = recipeAllHits.hits[0];
  recipeLink.innerHTML = recipe.recipe.label;
  recipeLink.href = recipe.recipe.url;
  image.src = recipe.recipe.image;
  ingredientsList.innerHTML = "";
  ingredients = recipe.recipe.ingredients;
  ingredients.forEach(addListItem);
  
  console.log(recipe)
  //--- write your code above ---
}

function addListItem(item) {
  let listItem = document.createElement("li");
  listItem.innerText = item.text;
  ingredientsList.appendChild(listItem);
}

// TO DO:

// - change input submit to on click and 'enter' - more intuitive for desktop
// - stop form resubmit without input change (to stop ingredients list repeating)
// - add 2nd api - music?
// - 



