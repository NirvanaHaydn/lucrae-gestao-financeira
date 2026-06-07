
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}


function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


function registerUser(nomeCompleto, username, senha) {
    const users = getUsers();
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return { success: false, message: "Nome de usuário já existe!" };
    }

    const newUser = {
        id: Date.now(),
        nomeCompleto,
        username,
        senha
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: "Usuário cadastrado com sucesso!" };
}


function loginUser(username, senha) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.senha === senha);

    if (!user) {
        return { success: false, message: "Usuário ou senha incorretos." };
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    return { success: true, message: "Login realizado com sucesso!" };
}


function logoutUser() {
    localStorage.removeItem("loggedUser");
    alert("Você saiu da conta!");
    window.location.href = "index.html";
}


function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const result = loginUser(username, password);

            if (result.success) {
                alert(result.message);
                window.location.href = "dashboard.html"; 
            } else {
                alert(result.message);
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const user = getLoggedUser();
    const protectedPages = ["dashboard.html", "income.html", "expense.html", "converter-form.html"];

    const currentPage = window.location.pathname.split("/").pop();
    if (protectedPages.includes(currentPage) && !user) {
        window.location.href = "login.html"; 
    }


    if (currentPage === "dashboard.html" && user) {
        const welcomeUser = document.getElementById("welcome-user");
        if (welcomeUser) {
            welcomeUser.textContent = `Bem-vindo(a), ${user.nomeCompleto}!`;
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutBtnDashboard = document.getElementById("logoutBtnDashboard");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
    }
    if (logoutBtnDashboard) {
        logoutBtnDashboard.addEventListener("click", logoutUser);
    }
});

