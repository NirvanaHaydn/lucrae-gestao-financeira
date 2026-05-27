document.getElementById("cadastroForm")
.addEventListener("submit", function (event) {

    event.preventDefault();

    const nomeCompleto =
        document.getElementById("fullname").value;

    const username =
        document.getElementById("username").value;

    const senha =
        document.getElementById("password").value;

    const confirmSenha =
        document.getElementById("confirmPassword").value;

    
    if (senha !== confirmSenha) {

        alert("As senhas não coincidem!");
        return;

    }

    const result = registerUser(
        nomeCompleto,
        username,
        senha
    );

    alert(result.message);

    if (result.success) {

        document.getElementById("cadastroForm").reset();
        window.location.href = "login.html";

    }

});