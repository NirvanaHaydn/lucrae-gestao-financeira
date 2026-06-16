const user = JSON.parse(
    localStorage.getItem("loggedUser")
);

if (!user) {

    alert("Você precisa estar logado!");

    window.location.href = "login.html";

}

const allExpenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];

const userExpenses = allExpenses.filter(
    expense => expense.userId === user.id
);

const tbody = document.getElementById(
    "expense-table-body"
);

tbody.innerHTML = "";

userExpenses.forEach(expense => {

    let dataFormatada = "";

    if (expense.data) {

        const [ano, mes, dia] =
            expense.data.split("-");

        dataFormatada =
            `${dia}/${mes}/${ano}`;

    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.nome}</td>
        <td>${expense.categoria}</td>
        <td>R$ ${Number(expense.valor).toFixed(2)}</td>
        <td>${dataFormatada}</td>
        <td>
            ${expense.recorrente
                ? "Recorrente"
                : "Única"}
        </td>
    `;

    tbody.appendChild(row);

});

function gerarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "Relatório de Despesas",
        14,
        20
    );

    doc.autoTable({
        html: "#expense-table",
        startY: 30,
        theme: "grid"
    });

    doc.save("despesas.pdf");

}

document
    .getElementById("btn-pdf")
    .addEventListener(
        "click",
        gerarPDF
    );

document
    .getElementById("salvarLimite")
    .addEventListener("click", () => {

        const valor = Number(
            document.getElementById(
                "valorLimite"
            ).value
        );

        if (valor <= 0) {

            alert(
                "Digite um valor válido."
            );

            return;

        }

        const limits = JSON.parse(
            localStorage.getItem(
                "expenseLimits"
            )
        ) || [];

        const outrosLimites =
            limits.filter(
                item => item.userId !== user.id
            );

        outrosLimites.push({

            userId: user.id,

            valor

        });

        localStorage.setItem(
            "expenseLimits",
            JSON.stringify(
                outrosLimites
            )
        );

        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById(
                    "limiteModal"
                )
            );

        modal.hide();

        document.getElementById(
            "valorLimite"
        ).value = "";

        const mensagem =
            document.getElementById(
                "mensagemLimite"
            );

        mensagem.classList.remove(
            "d-none"
        );

        setTimeout(() => {

            mensagem.classList.add(
                "d-none"
            );

        }, 3000);

        location.reload();

    });

const limits = JSON.parse(
    localStorage.getItem(
        "expenseLimits"
    )
) || [];

const userLimit = limits.find(
    limit => limit.userId === user.id
);

const totalGasto =
    userExpenses.reduce(
        (total, expense) =>
            total + Number(expense.valor || 0),
        0
    );

const status = document.getElementById(
    "expense-status"
);

if (userLimit) {

    const valorLimite =
        Number(userLimit.valor);

    const restante =
        valorLimite - totalGasto;

    const percentual =
        (totalGasto / valorLimite) * 100;

    document.getElementById(
        "expense-limit"
    ).innerText =
        `R$ ${valorLimite.toFixed(2)}`;

    document.getElementById(
        "expense-current"
    ).innerText =
        `R$ ${totalGasto.toFixed(2)}`;

    document.getElementById(
        "expense-remaining"
    ).innerText =
        `R$ ${restante.toFixed(2)}`;

    const progress =
        document.getElementById(
            "expense-progress"
        );

    progress.style.width =
        `${Math.min(percentual, 100)}%`;

    progress.innerText =
        `${percentual.toFixed(0)}%`;

    progress.classList.remove(
        "bg-success",
        "bg-warning",
        "bg-danger"
    );

    if (percentual < 70) {

        progress.classList.add(
            "bg-success"
        );

        status.innerText =
            "✓ Situação saudável";

        status.className =
            "text-center mt-3 text-success fw-semibold";

    } else if (percentual < 100) {

        progress.classList.add(
            "bg-warning"
        );

        status.innerText =
            "⚠ Atenção ao limite";

        status.className =
            "text-center mt-3 text-warning fw-semibold";

    } else {

        progress.classList.add(
            "bg-danger"
        );

        progress.style.width =
            "100%";

        status.innerText =
            "⚠ Limite ultrapassado";

        status.className =
            "text-center mt-3 text-danger fw-bold";

    }

} else {

    status.innerText =
        "Nenhum limite definido";

    status.className =
        "text-center mt-3 text-secondary fw-semibold";

}

document
    .getElementById(
        "confirmarLimparLimite"
    )
    .addEventListener(
        "click",
        () => {

            const limits = JSON.parse(
                localStorage.getItem(
                    "expenseLimits"
                )
            ) || [];

            const novosLimites =
                limits.filter(
                    item =>
                        item.userId !== user.id
                );

            localStorage.setItem(
                "expenseLimits",
                JSON.stringify(
                    novosLimites
                )
            );

            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "limparLimiteModal"
                    )
                );

            modal.hide();

            const mensagem =
                document.getElementById(
                    "mensagemLimite"
                );

            mensagem.innerText =
                "Limite removido com sucesso!";

            mensagem.classList.remove(
                "d-none"
            );

            setTimeout(() => {

                mensagem.classList.add(
                    "d-none"
                );

                mensagem.innerText =
                    "Limite salvo com sucesso!";

                location.reload();

            }, 2000);

        }
    );