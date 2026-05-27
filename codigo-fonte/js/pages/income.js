const form = document.getElementById("formularios");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    // pega usuário logado
    const loggedUser = JSON.parse(
        localStorage.getItem("loggedUser")
    );

    // segurança
    if (!loggedUser) {

        alert("Usuário não autenticado!");
        return;

    }

    // cria receita
    const income = {

        id: Date.now(),

        // relação com usuário
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

    // pega receitas
    const incomes = JSON.parse(
        localStorage.getItem("incomes")
    ) || [];

    // adiciona
    incomes.push(income);

    // salva
    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );

    alert("Receita cadastrada!");

    form.reset();

});