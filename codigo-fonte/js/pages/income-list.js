const user = JSON.parse(
    localStorage.getItem("loggedUser")
);

if (!user) {

    alert("Você precisa estar logado!");

    window.location.href = "login.html";

}

const allIncomes = JSON.parse(
    localStorage.getItem("incomes")
) || [];

const incomes = allIncomes.filter(
    income => income.userId === user.id
);

const tbody = document.getElementById(
    "income-table-body"
);

tbody.innerHTML = "";

incomes.forEach(income => {

    let dataFormatada = "";

    if (income.data) {

        const [ano, mes, dia] =
            income.data.split("-");

        dataFormatada =
            `${dia}/${mes}/${ano}`;

    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${income.nome}</td>
        <td>${income.categoria}</td>
        <td>R$ ${Number(income.valor).toFixed(2)}</td>
        <td>${dataFormatada}</td>
        <td>
            ${income.recorrente ? "Recorrente" : "Único"}
        </td>
    `;

    tbody.appendChild(row);

});

function gerarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "Relatório de Recebimentos",
        14,
        20
    );

    doc.autoTable({
        html: "#income-table",
        startY: 30,
        theme: "grid"
    });

    doc.save("recebimentos.pdf");

}

document
    .getElementById("btn-pdf")
    .addEventListener(
        "click",
        gerarPDF
    );

document
    .getElementById("salvarReserva")
    .addEventListener("click", () => {

        const valor = Number(
            document.getElementById(
                "valorReserva"
            ).value
        );

        if (valor <= 0) {

            alert(
                "Digite um valor válido."
            );

            return;

        }

        const reservas = JSON.parse(
            localStorage.getItem(
                "reservas"
            )
        ) || [];

        const outrasReservas =
            reservas.filter(
                item =>
                    item.userId !== user.id
            );

        outrasReservas.push({

            userId: user.id,

            valor

        });

        localStorage.setItem(
            "reservas",
            JSON.stringify(
                outrasReservas
            )
        );

        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById(
                    "reservaModal"
                )
            );

        modal.hide();

        document.getElementById(
            "valorReserva"
        ).value = "";

        const mensagem =
            document.getElementById(
                "mensagemReserva"
            );

        mensagem.classList.remove(
            "d-none"
        );

        setTimeout(() => {

            mensagem.classList.add(
                "d-none"
            );

        }, 3000);

    });