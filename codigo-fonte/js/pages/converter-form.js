document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("currencyForm");
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const resultContainer = document.getElementById("result");

    const moedas = [
        { code: "BRL", name: "Real Brasileiro" },
        { code: "USD", name: "Dólar Americano" },
        { code: "EUR", name: "Euro" },
        { code: "GBP", name: "Libra Esterlina" },
        { code: "JPY", name: "Iene Japonês" },
        { code: "ARS", name: "Peso Argentino" },
        { code: "CAD", name: "Dólar Canadense" },
        { code: "AUD", name: "Dólar Australiano" },
        { code: "CHF", name: "Franco Suíço" },
        { code: "CNY", name: "Yuan Chinês" },
        { code: "BTC", name: "Bitcoin" },
        { code: "ETH", name: "Ethereum" },
        { code: "USDT", name: "Tether" }
    ];


    function popularMoedas() {

        moedas.forEach((moeda) => {

            const optionFrom = document.createElement("option");
            optionFrom.value = moeda.code;
            optionFrom.textContent =
                `${moeda.code} (${moeda.name})`;

            const optionTo = document.createElement("option");
            optionTo.value = moeda.code;
            optionTo.textContent =
                `${moeda.code} (${moeda.name})`;

            fromSelect.appendChild(optionFrom);
            toSelect.appendChild(optionTo);

        });


        fromSelect.value = "USD";
        toSelect.value = "BRL";

    }


    function renderLoading() {

        resultContainer.innerHTML = `
            <div
                class="alert alert-info shadow text-center"
                style="border-radius:16px;"
            >
                Convertendo moedas...
            </div>
        `;

    }


    function renderError(message) {

        resultContainer.innerHTML = `
            <div
                class="alert alert-danger shadow text-center"
                style="border-radius:16px;"
            >
                ${message}
            </div>
        `;

    }


    function renderResult({
        amount,
        from,
        to,
        rate,
        convertedValue
    }) {

        resultContainer.innerHTML = `
            <div
                class="shadow"
                style="
                    background:#dff5ea;
                    border-radius:20px;
                    padding:25px;
                    border:2px solid #b9e7cf;
                "
            >

                <h3
                    style="
                        color:#14532d;
                        font-weight:bold;
                        margin-bottom:20px;
                        text-align:center;
                    "
                >
                    Conversão realizada
                </h3>

                <div class="text-center">

                    <h2
                        style="
                            color:#198754;
                            font-weight:bold;
                            margin-bottom:10px;
                        "
                    >
                        ${amount.toFixed(2)} ${from}
                    </h2>

                    <h3
                        style="
                            color:#0f5132;
                            margin-bottom:10px;
                        "
                    >
                        ↓
                    </h3>

                    <h1
                        style="
                            color:#146c43;
                            font-weight:bold;
                            margin-bottom:25px;
                        "
                    >
                        ${convertedValue.toFixed(2)} ${to}
                    </h1>

                </div>

                <div
                    style="
                        background:white;
                        padding:15px;
                        border-radius:12px;
                        color:#1f5137;
                        font-size:1rem;
                        text-align:center;
                    "
                >

                    Cotação atual:

                    <strong>
                        1 ${from} = ${rate.toFixed(4)} ${to}
                    </strong>

                </div>

            </div>
        `;

    }

    async function buscarCotacao(from, to) {

        const url =
            `https://economia.awesomeapi.com.br/json/last/${from}-${to}`;

        const response = await fetch(url);

        const data = await response.json();

        const key = `${from}${to}`;

        return data[key];

    }

    async function converterMoeda(event) {

        event.preventDefault();

        const amount = Number(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        if (!amount || amount <= 0) {

            renderError("Digite um valor válido.");
            return;

        }


        if (from === to) {

            renderResult({
                amount,
                from,
                to,
                rate: 1,
                convertedValue: amount
            });

            return;

        }

        renderLoading();

        try {


            const cotacao = await buscarCotacao(from, to);

            if (!cotacao) {

                renderError(
                    "Conversão não disponível para essas moedas."
                );

                return;

            }


            const rate = Number(cotacao.bid);
            const convertedValue = amount * rate;


            renderResult({
                amount,
                from,
                to,
                rate,
                convertedValue
            });

        } catch (error) {

            console.error(error);

            renderError(
                "Erro ao converter moedas."
            );

        }

    }


    form.addEventListener("submit", converterMoeda);
    popularMoedas();

});