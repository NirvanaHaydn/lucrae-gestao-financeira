document.getElementById("loginForm")
.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const senha =
        document.getElementById("password").value;

    const result = loginUser(username, senha);

    alert(result.message);

    if (result.success) {

        window.location.href = "dashboard.html";

    }

});