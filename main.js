// Recipe Search API Key
const YOUR_APP_ID = "3cf0d53e";
const YOUR_APP_KEY = "3ae63af785bcc6375c7f7cc983b967a1";

// DOM Variables
const recipeLink = document.querySelector("#recipe-link");
const image = document.querySelector("#recipe-image");
const ingredientsList = document.querySelector("#ingredients-list");
const lyricsLink = document.querySelector("#lyrics-link");
const songThumbnail = document.querySelector("#song-thumbnail");
const form = document.querySelector("form");
const random = document.querySelector("#random-recipe");

// Event Listeners
form.addEventListener("submit",handleRecipeSubmit);
random.addEventListener("click", handleRandomClick);

// Variables
let foodToSearch = null;

// Functions
function handleRecipeSubmit(event) {
  fetchRecipe(foodToSearch);
  getLyrics(foodToSearch);
  event.preventDefault();
  form.reset();
  random.innerHTML = `Get me a different ${foodToSearch} recipe!`;

  
}

function handleRandomClick(){
  fetchRandomRecipe(foodToSearch);
  random.innerHTML = `Get me a different ${foodToSearch} recipe!`;
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

async function getLyrics(food){
  let response = await fetch(`https://genius.p.rapidapi.com/search?q=${foodToSearch}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "805e4a3966msh7007d353855a060p165dd0jsneafb58a97689",
      "x-rapidapi-host": "genius.p.rapidapi.com"
    }
  });
  let songsAllHits = await response.json();
  let song = songsAllHits.response.hits[0];
  lyricsLink.innerHTML = song.result.full_title;
  lyricsLink.href = song.result.url;
  songThumbnail.src = song.result.header_image_thumbnail_url;

  console.log(song.result)
}

function randomNumber(){
  return Math.floor((Math.random() * 10) + 1);
}

async function fetchRandomRecipe(food) {
  const requestURL = `https://api.edamam.com/search?q=${foodToSearch}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  let response = await fetch(requestURL);
  let recipeAllHits = await response.json();
  let i = randomNumber();
  let recipe = recipeAllHits.hits[i];
  recipeLink.innerHTML = recipe.recipe.label;
  recipeLink.href = recipe.recipe.url;
  image.src = recipe.recipe.image;
  ingredientsList.innerHTML = "";
  ingredients = recipe.recipe.ingredients;
  ingredients.forEach(addListItem);
  
  console.log(recipe)
}

// TO DO:

// - change input submit to on click and 'enter' - more intuitive for desktop - DONE
// - stop form resubmit without input change (to stop ingredients list repeating) - DONE (not with validation but just emptying ul)
// - add 2nd api - music? - DONE
// - display random recipe function:
//    - generate random number between 1-10 and display that recipe in search array? - DONE
// - make music div colours change with song art colours
// - don't allow button presses to work without valid input
// - hide random button unless a recipe is displayed
// - make display random song function 