const checkbox = document.getElementById("recorrente");
const dataContainer = document.getElementById("dataContainer");


checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        dataContainer.classList.remove("d-none");
    } 
    else {
        dataContainer.classList.add("d-none");
    }
});