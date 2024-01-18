export const getCuisineCard = (cuisines, container, createElement) => {
    for (let cuisine of cuisines) {
        const cuisineContainer = createElement("div");
        cuisineContainer.classList.add("cuisine-filter");
        cuisineContainer.setAttribute("data-id", cuisine.id);

        // creating checkbox
        const checkBox = createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "checkbox";
        checkBox.setAttribute("data-id", cuisine.id);

        // creating the label
        const label = createElement("label");
        label.className = "cuisine-label";
        label.appendChild(checkBox);

        const labelText = createElement("span");
        labelText.innerText = cuisine.Cuisine;
        labelText.setAttribute("data-id", cuisine.id);
        label.appendChild(labelText);
        label.setAttribute("data-id", cuisine.id);

        cuisineContainer.appendChild(label);
        container.appendChild(cuisineContainer);
    }
};
