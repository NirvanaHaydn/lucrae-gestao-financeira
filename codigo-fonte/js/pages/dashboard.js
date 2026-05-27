// =======================
// USUÁRIO LOGADO
// =======================

const user = JSON.parse(
    localStorage.getItem("loggedUser")
);

// verifica login
if (!user) {

    alert("Você precisa estar logado!");

    window.location.href = "login.html";

}


// =======================
// BOAS-VINDAS
// =======================

document.getElementById("welcome-user").innerText =
    `Olá, ${user.nomeCompleto}!`;


// =======================
// RECEITAS E DESPESAS
// FILTRADAS POR USUÁRIO
// =======================

// pega TODAS as receitas
const allIncomes = JSON.parse(
    localStorage.getItem("incomes")
) || [];


// pega TODAS as despesas
const allExpenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];


// filtra receitas do usuário logado
const incomes = allIncomes.filter(item =>
    item.userId === user.id
);


// filtra despesas do usuário logado
const expenses = allExpenses.filter(item =>
    item.userId === user.id
);


// =======================
// SOMAS
// =======================

// soma receitas
const totalIncome = incomes.reduce((total, item) => {

    return total + Number(item.valor || 0);

}, 0);


// soma despesas
const totalExpense = expenses.reduce((total, item) => {

    return total + Number(item.valor || 0);

}, 0);


// saldo
const balance = totalIncome - totalExpense;


// =======================
// RENDERIZA NA TELA
// =======================

document.getElementById("total-income").innerText =
    `R$ ${totalIncome.toFixed(2)}`;

document.getElementById("total-expense").innerText =
    `R$ ${totalExpense.toFixed(2)}`;

document.getElementById("balance").innerText =
    `R$ ${balance.toFixed(2)}`;



// =======================
// GRÁFICO
// =======================

const ctx = document.getElementById("myChart");

new Chart(ctx, {

    type: "doughnut",

    data: {

        labels: ["Receitas", "Despesas"],

        datasets: [{

            data: [
                totalIncome,
                totalExpense
            ],

            backgroundColor: [
                "#58A92E",
                "#b85c5c"
            ],

            borderWidth: 0

        }]

    },

    options: {

        responsive: true,

        cutout: "70%",

        plugins: {

            legend: {

                position: "bottom",

                labels: {

                    color: "#092c1f",

                    font: {

                        family: "Junge",
                        size: 16

                    }

                }

            }

        }

    }

});