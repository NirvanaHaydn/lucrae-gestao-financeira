const user = JSON.parse(
    localStorage.getItem("loggedUser")
);

if (!user) {

    alert("Você precisa estar logado!");

    window.location.href = "login.html";

}

document.getElementById("welcome-user").innerText =
    `Olá, ${user.nomeCompleto}!`;

const allIncomes = JSON.parse(
    localStorage.getItem("incomes")
) || [];

const allExpenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];

const allReservas = JSON.parse(
    localStorage.getItem("reservas")
) || [];

const incomes = allIncomes.filter(item =>
    item.userId === user.id
);

const expenses = allExpenses.filter(item =>
    item.userId === user.id
);

const reservaUsuario = allReservas.find(
    item => item.userId === user.id
);

const valorReserva =
    Number(reservaUsuario?.valor || 0);

const mesFiltro =
    document.getElementById("mesFiltro");

const hoje = new Date();

mesFiltro.value =
    `${hoje.getFullYear()}-${String(
        hoje.getMonth() + 1
    ).padStart(2, "0")}`;

const ctx =
    document.getElementById("myChart");

const chart = new Chart(ctx, {

    type: "doughnut",

    data: {

        labels: [
            "Receitas",
            "Despesas",
            "Reserva"
        ],

        datasets: [{

            data: [0, 0, valorReserva],

            backgroundColor: [
                "#58A92E",
                "#b85c5c",
                "#e0b84f"
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

function atualizarDashboard() {

    const mesSelecionado =
        mesFiltro.value;

    const incomesMes = incomes.filter(item =>
        item.data &&
        item.data.substring(0, 7) === mesSelecionado
    );

    const expensesMes = expenses.filter(item =>
        item.data &&
        item.data.substring(0, 7) === mesSelecionado
    );

    const totalIncome = incomesMes.reduce(
        (total, item) =>
            total + Number(item.valor || 0),
        0
    );

    const totalExpense = expensesMes.reduce(
        (total, item) =>
            total + Number(item.valor || 0),
        0
    );

    const balance =
        totalIncome -
        totalExpense -
        valorReserva;

    document.getElementById("total-income").innerText =
        `R$ ${totalIncome.toFixed(2)}`;

    document.getElementById("total-expense").innerText =
        `R$ ${totalExpense.toFixed(2)}`;

    document.getElementById("reserve").innerText =
        `R$ ${valorReserva.toFixed(2)}`;

    document.getElementById("balance").innerText =
        `R$ ${balance.toFixed(2)}`;

    chart.data.datasets[0].data = [
        totalIncome,
        totalExpense,
        valorReserva
    ];

    chart.update();
}

mesFiltro.addEventListener(
    "change",
    atualizarDashboard
);

atualizarDashboard();