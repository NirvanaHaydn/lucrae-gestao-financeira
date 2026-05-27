function getUsers() {

    return JSON.parse(localStorage.getItem("users")) || [];

}

function saveUsers(users) {

    localStorage.setItem("users", JSON.stringify(users));

}


function registerUser(nomeCompleto, username, senha) {

    const users = getUsers();

    const userExists = users.some(
        user => user.username === username
    );

    if (userExists) {

        return {
            success: false,
            message: "Nome de usuário já existe!"
        };

    }

    const newUser = {

        id: Date.now(),
        nomeCompleto,
        username,
        senha

    };

    users.push(newUser);

    saveUsers(users);

    return {

        success: true,
        message: "Usuário cadastrado com sucesso!"

    };

}


function loginUser(username, senha) {

    const users = getUsers();

    const user = users.find(
        u => u.username === username && u.senha === senha
    );

    if (!user) {

        return {

            success: false,
            message: "Usuário ou senha incorretos."

        };

    }

    localStorage.setItem(
        "loggedUser",
        JSON.stringify(user)
    );

    return {

        success: true,
        message: "Login realizado com sucesso!"

    };

}


function logoutUser() {

    localStorage.removeItem("loggedUser");

}

function getLoggedUser() {

    return JSON.parse(
        localStorage.getItem("loggedUser")
    );

}