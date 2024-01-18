export function createCard(recipe, createElement) {
    // Create and append cards
    const cardContainer = createElement('div');
    cardContainer.className = 'card-container shadow';

    // Image container and image element
    const imageContainer = createElement('div');
    imageContainer.className = 'image-container';
    const image = createElement('img');
    image.classList.add("image");
    image.setAttribute("src", recipe["image-url"]);
    image.setAttribute("alt", "recipe image");
    image.setAttribute("id", recipe.id);

    imageContainer.appendChild(image);

    // Details container
    const detailsContainer = createElement('div');
    detailsContainer.className = 'details-container';

    // h2 element for the TranslatedRecipeName
    const TranslatedRecipeName = createElement('p');
    TranslatedRecipeName.className = 'Title';
    TranslatedRecipeName.textContent = recipe.TranslatedRecipeName;

    // Details div
    const detailsDiv = createElement('div');
    detailsDiv.className = 'details';

    // p element for cuisine
    const cuisineP = createElement('p');
    cuisineP.textContent = `cuisine: ${recipe.Cuisine}`;

    // Time div
    const timeDiv = createElement('div');
    timeDiv.className = 'time';

    // img element for the timer icon
    const timerImg = createElement('img');
    timerImg.src = './images/timer.png';
    timerImg.alt = 'timer png';

    // p element for the time duration
    const timeP = createElement('p');
    timeP.textContent = `${recipe.TotalTimeInMins} mins`;

    timeDiv.appendChild(timerImg);
    timeDiv.appendChild(timeP);

    detailsDiv.appendChild(cuisineP);
    detailsDiv.appendChild(timeDiv);

    detailsContainer.appendChild(TranslatedRecipeName);
    detailsContainer.appendChild(detailsDiv);

    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(detailsContainer);

    return cardContainer;
}
