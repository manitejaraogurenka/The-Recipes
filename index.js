import { recipeData } from "./recipeData.js";
import {createCard} from "./getRecipeCard.js"

const nonVegItems = ['Duck', 'quail', 'Rabbit', 'Goose', 'squide', 'Octopus', 'Caviar', 'Lamb', 'Chicken', 'Mutton', 'Fish', 'Beef', 'Pork', 'Turkey', 'Shrimp', 'Crab', 'Lobster', 'Salmon', 'Tuna', 'Sausages', 'Bacon', 'Ham', 'Venison', 'Quail'];

const inputSearch = document.querySelector("#search");
const paginationList = document.getElementById('pagination-list');

const categoryButtons = document.querySelectorAll(".category-button");

document.getElementById('currentYear').textContent = new Date().getFullYear();

const itemsPerPage = 50;
let currentPage = 1;
let filteredRecipes = recipeData;

const createElement = (element) => document.createElement(element);

function creatCard(recipes, startIndex, endIndex) {
    const container = document.querySelector('.main');
    container.innerHTML = '';

    for (let i = startIndex; i < endIndex && i < recipes.length; i++) {
        const cardContainer = createCard(recipes[i], createElement);
        container.appendChild(cardContainer);
    }
}

function filterRecipesByProperty(recipe, property, searchValue) {
    return recipe[property].toLowerCase().includes(searchValue);
}

function handleSearch(event) {
    const searchValue = inputSearch.value.toLowerCase();
    const vegOrNonVeg = event.target.textContent;

    filteredRecipes = recipeData;

    if (searchValue) {
        filteredRecipes = recipeData.filter(recipe =>
            ['TranslatedRecipeName'].some(property =>
                filterRecipesByProperty(recipe, property, searchValue.trim())
            )
        );
    }

    if (vegOrNonVeg === 'nonveg') {
        filteredRecipes = filteredRecipes.filter(recipe =>
            ['TranslatedRecipeName', 'TranslatedIngredients', 'Cuisine', 'TranslatedInstructions'].some(property =>
                nonVegItems.some(item =>
                    recipe[property].toLowerCase().includes(item.toLowerCase())
                )
            )
        );
    }
    
    if (vegOrNonVeg === 'veg') {
        filteredRecipes = filteredRecipes.filter(recipe =>
            ['TranslatedRecipeName', 'TranslatedIngredients', 'Cuisine', 'TranslatedInstructions'].every(property =>
                nonVegItems.every(item =>
                    !recipe[property].toLowerCase().includes(item.toLowerCase())
                )
            )
        );
    }
    
    currentPage = 1; // Reset to the first page when searching
    updatePagination();
}


const debounce = (callback, delay) => {
    let timerId;

    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => { callback(...args); }, delay);
    };
};

const debounceInput = debounce(handleSearch, 500);
inputSearch.addEventListener("keyup", debounceInput);
categoryButtons.forEach(button=>button.addEventListener("click", handleSearch));

//pagination

function renderPagination() {
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
    paginationList.innerHTML = '';

    const createPageButton = (page) => {
        const pageButton = createElement('li');
        pageButton.textContent = page;
        pageButton.addEventListener('click', () => {
            if (page === 'Prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'Next' && currentPage < totalPages) {
                currentPage++;
            } else if (page === 'First') {
                currentPage = 1;
            } else if (page === 'Last') {
                currentPage = totalPages;
            } else if (typeof page === 'number') {
                currentPage = page;
            }
            updatePagination();
        });
        paginationList.appendChild(pageButton);
    };

    createPageButton('First');

    createPageButton('Prev');

    // Add first three pages
    const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
    const endPage = Math.min(startPage + 2, totalPages);
    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    // Add '...' if needed
    if (endPage < totalPages) {
        const ellipsis = createElement('li');
        ellipsis.textContent = '...';
        paginationList.appendChild(ellipsis);
    }

    // Add last three pages
    if (endPage < totalPages) {
        for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++){
            createPageButton(i);
        }
    }

    createPageButton('Next');

    createPageButton('Last');
}

function updatePagination() {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    creatCard(filteredRecipes, startIndex, endIndex);
    renderPagination();
}
// Initial page load
updatePagination();