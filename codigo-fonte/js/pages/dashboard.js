loadMockUser();

const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("welcome-user").innerText =
    `Olá, ${user.name}!`;

// ✅ AGORA VEM DO LOCALSTORAGE (dados reais do usuário)
const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// 💰 soma receitas
const totalIncome = incomes.reduce((total, item) => {
    return total + Number(item.valor || 0);
}, 0);

// 💸 soma despesas
const totalExpense = expenses.reduce((total, item) => {
    return total + Number(item.valor || 0);
}, 0);

// 📊 saldo
const balance = totalIncome - totalExpense;

// 📌 render na tela
document.getElementById("total-income").innerText =
    `R$ ${totalIncome}`;

document.getElementById("total-expense").innerText =
    `R$ ${totalExpense}`;

document.getElementById("balance").innerText =
    `R$ ${balance}`;

// 📈 gráfico
const ctx = document.getElementById('myChart');

new Chart(ctx, {

    type: 'doughnut',

    data: {

        labels: ['Receitas', 'Despesas'],

        datasets: [{

            data: [totalIncome, totalExpense],

            backgroundColor: ['#58A92E', '#b85c5c'],

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