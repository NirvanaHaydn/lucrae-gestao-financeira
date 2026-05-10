loadMockUser();

const user =
    JSON.parse(localStorage.getItem("user"));

document.getElementById("welcome-user").innerText =
    `Olá, ${user.name}!`;

const incomes = [

    {
        nome: "Salário",
        valor: 4000
    },

    {
        nome: "Freelance",
        valor: 850
    }

];


const expenses = [

    {
        nome: "Aluguel",
        valor: 1200
    },

    {
        nome: "Mercado",
        valor: 600
    }

];
const totalIncome =
    incomes.reduce((total, item) => {

        return total + item.valor;

    }, 0);


const totalExpense =
    expenses.reduce((total, item) => {

        return total + item.valor;

    }, 0);


const balance =
    totalIncome - totalExpense;

document.getElementById("total-income").innerText =
    `R$ ${totalIncome}`;

document.getElementById("total-expense").innerText =
    `R$ ${totalExpense}`;

document.getElementById("balance").innerText =
    `R$ ${balance}`;

const ctx =
    document.getElementById('myChart');

new Chart(ctx, {

    type: 'doughnut',

    data: {

        labels: [
            'Receitas',
            'Despesas'
        ],

        datasets: [{

            data: [
                totalIncome,
                totalExpense
            ],

            backgroundColor: [
                '#58A92E',
                '#b85c5c'
            ],

            borderWidth: 0

        }]
    },

    options: {

        responsive: true,

        cutout: '70%',

        plugins: {

            legend: {

                position: 'bottom',

                labels: {

                    color: '#092c1f',

                    font: {

                        family: 'Junge',
                        size: 16

                    }

                }

            }

        }

    }

});