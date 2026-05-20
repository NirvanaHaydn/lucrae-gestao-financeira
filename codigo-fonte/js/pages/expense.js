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
const form = document.getElementById("formularios");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const expense = {
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        categoria: document.getElementById("categoria").value,
        valor: Number(document.getElementById("valor").value),
        recorrente: document.getElementById("recorrente").checked,
        dataRecorrencia: document.getElementById("dataRecorrente").value
    };

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();
});
