const mockUser = {
    id: 1,
    name: "Usuário Teste",
    password: "123456"
};

function loadMockUser() {

    if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(mockUser));
        console.log("Mock user criado");
    }

}

//Nos arquivos html que queira ter acesso basta executar a função acima