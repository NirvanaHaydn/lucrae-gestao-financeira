const FINNHUB_API_KEY = "d8anvupr01qpujl2rj6gd8anvupr01qpujl2rj70";

const container = document.getElementById("newsContainer");
const loading = document.getElementById("loading");

function setLoading(status){

    loading.innerHTML = status
        ? `
            <div class="text-success text-center fs-4 mt-4">
                Carregando notícias...
            </div>
          `
        : "";
}


async function traduzirTexto(texto){

    try{

        if(!texto){
            return "";
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(texto)}`;

        const response = await fetch(url);

        const data = await response.json();

        return data[0]
            .map(item => item[0])
            .join("");

    } catch(error){

        console.error("Erro tradução:", error);

        return texto;
    }

}


function renderNews(newsList){

    container.innerHTML = "";

    if(!newsList || newsList.length === 0){

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning text-center">

                    <h4>
                        Nenhuma notícia encontrada
                    </h4>

                    <p class="mb-0">
                        Tente pesquisar outro termo.
                    </p>

                </div>

            </div>

        `;

        return;
    }


    for(let i = 0; i < newsList.length; i++){

        const news = newsList[i];

        const card = `

            <div class="col-md-6 col-lg-4">

                <div class="card h-100 bg-dark text-white shadow">

                    <img
                        src="${news.image || 'https://placehold.co/600x400?text=Sem+Imagem'}"
                        class="card-img-top"
                        style="height:220px; object-fit:cover;"
                        onerror="this.src='https://placehold.co/600x400?text=Sem+Imagem'"
                    >

                    <div class="card-body d-flex flex-column">

                        <small class="text-success fw-bold">
                            ${news.source}
                        </small>

                        <h5 class="card-title mt-2">
                            ${news.title}
                        </h5>

                        <p class="card-text flex-grow-1">
                            ${news.description || "Sem descrição disponível."}
                        </p>

                        <small class="text-secondary">
                            ${news.formattedDate}
                        </small>

                        <a
                            href="${news.url}"
                            target="_blank"
                            class="btn btn-primary mt-3"
                        >
                            Ler notícia
                        </a>

                    </div>

                </div>

            </div>

        `;

        container.innerHTML += card;
    }

}


async function getFinnhubNews(query){

    try{
        const searchUrl = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${FINNHUB_API_KEY}`;

        const searchResponse =
            await fetch(searchUrl);

        const searchData =
            await searchResponse.json();

        if(!searchData.result){

            return [];
        }

        const ativos =
            searchData.result.slice(0, 10);

        let todasNoticias = [];


        for(const ativo of ativos){

            try{

                const hoje =
                    new Date();

                const passado =
                    new Date();

                passado.setDate(hoje.getDate() - 7);

                const from =
                    passado.toISOString().split("T")[0];

                const to =
                    hoje.toISOString().split("T")[0];

                const newsUrl = `https://finnhub.io/api/v1/company-news?symbol=${ativo.symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;

                const newsResponse =
                    await fetch(newsUrl);

                const newsData =
                    await newsResponse.json();

                if(Array.isArray(newsData)){

                    todasNoticias.push(...newsData);

                }

            } catch(error){

                console.error(
                    "Erro ativo:",
                    ativo.symbol
                );

            }

        }

        todasNoticias = todasNoticias.filter(
            (news, index, self) => {

                return index === self.findIndex(
                    n => n.url === news.url
                );

            }
        );

        todasNoticias =
            todasNoticias.slice(0, 20);

        const noticiasTraduzidas =
            await Promise.all(

                todasNoticias.map(async (news) => {

                    const tituloTraduzido =
                        await traduzirTexto(
                            news.headline
                        );

                    const descricaoTraduzida =
                        await traduzirTexto(
                            news.summary
                        );

                    return {

                        source:
                            "Finnhub • " + news.source,

                        title:
                            tituloTraduzido,

                        description:
                            descricaoTraduzida,

                        image:
                            news.image,

                        url:
                            news.url,

                        date:
                            new Date(news.datetime * 1000)
                                .toISOString(),

                        formattedDate:
                            new Date(news.datetime * 1000)
                                .toLocaleString("pt-BR")

                    };

                })

            );

        return noticiasTraduzidas;

    } catch(error){

        console.error(
            "Erro Finnhub:",
            error
        );

        return [];
    }

}


async function buscarNoticias(){

    try{

        setLoading(true);

        const query =
            document.getElementById("searchInput")
                .value.trim() || "AAPL";

        let noticias =
            await getFinnhubNews(query);


        noticias.sort((a, b) => {

            return new Date(b.date)
                - new Date(a.date);

        });

        renderNews(noticias);

    } catch(error){

        console.error(error);

        container.innerHTML = `
            <div class="col-12 text-center">

                <h3 class="text-danger">
                    Erro ao carregar notícias.
                </h3>

            </div>
        `;

    } finally{

        setLoading(false);
    }

}


document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event){

        if(event.key === "Enter"){

            buscarNoticias();

        }

    });


buscarNoticias();


setInterval(() => {

    buscarNoticias();

}, 60000);