const form = document.getElementById("formularios");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    // pega usuário logado
    const loggedUser = JSON.parse(
        localStorage.getItem("loggedUser")
    );

    
    if (!loggedUser) {

        alert("Usuário não autenticado!");
        return;

    }

    
    const expense = {

        id: Date.now(),

        
        userId: loggedUser.id,

        username: loggedUser.username,

        nome: document.getElementById("nome").value,

        descricao: document.getElementById("descricao").value,

        categoria: document.getElementById("categoria").value,

        valor: Number(
            document.getElementById("valor").value
        ),

        recorrente:
            document.getElementById("recorrente").checked,

        data:
            document.getElementById("dataRecorrente").value

    };

    
    const expenses = JSON.parse(
        localStorage.getItem("expenses")
    ) || [];

    
    expenses.push(expense);

    
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    alert("Despesa cadastrada!");

    form.reset();

});