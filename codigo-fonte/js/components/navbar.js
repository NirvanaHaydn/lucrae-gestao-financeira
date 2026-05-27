document.getElementById("navbar").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container">

        <a class="navbar-brand d-flex align-items-center" href="index.html">
            <img src="assets/img/logo/LogoVerde.png" alt="Lucraê" class="logo me-2">
            <span>Lucraê</span>
        </a>

        <!-- BOTÃO HAMBURGUER -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- MENU -->
        <div class="collapse navbar-collapse justify-content-end" id="menuNavbar">
            <div class="navbar-nav gap-2">

                <a href="about.html" class="nav-link">
                    <button class="btn btn-outline-success w-100">
                        Sobre nós
                    </button>
                </a>

                <a href="news.html" class="nav-link">
                    <button class="btn btn-outline-success w-100">
                        Notícias
                    </button>
                </a>

                <a href="education.html" class="nav-link">
                    <button class="btn btn-outline-success w-100">
                        Educação
                    </button>
                </a>

            </div>
        </div>

    </div>
</nav>
`;