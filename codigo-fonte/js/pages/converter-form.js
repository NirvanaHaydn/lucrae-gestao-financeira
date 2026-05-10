document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("currencyForm");

    const rates = {
        BRL: 1,
        USD: 0.20,
        EUR: 5.5
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = Number(document.getElementById("amount").value);
        const from = document.getElementById("fromCurrency").value;
        const to = document.getElementById("toCurrency").value;

        if (!amount || amount <= 0) {
            alert("Digite um valor válido");
            return;
        }

        const inBRL = amount * rates[from];
        const result = inBRL / rates[to];

        document.getElementById("result").innerText =
            `Resultado: ${result.toFixed(2)} ${to}`;
    });
});