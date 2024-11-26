const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];
let manutencoes = {};

function carregarManutencoes() {
    // Tenta carregar os dados da localStorage
    const dadosSalvos = localStorage.getItem('manutencoes');
    if (dadosSalvos) {
        manutencoes = JSON.parse(dadosSalvos);
    }
}

function salvarManutencoes() {
    // Salva os dados no localStorage
    localStorage.setItem('manutencoes', JSON.stringify(manutencoes));
}

function inicializarPlacas() {
    // Manutenções Pendentes
    const placasPendentesDiv = document.getElementById("placas-pendentes");
    placasPendentesDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => mostrarManutencaoPorPlaca(placa);
        placasPendentesDiv.appendChild(button);
    });

    const placasCadastroDiv = document.getElementById("placas-cadastro");
    placasCadastroDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => cadastrarManutencao(placa);
        placasCadastroDiv.appendChild(button);
    });
}

function entrar() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

function mostrarManutencaoPendentes() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("manutencao-pendentes").style.display = "block";
    inicializarPlacas();
}

function mostrarCadastrarManutencao() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "block";
    inicializarPlacas();
}

function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

function mostrarManutencaoPorPlaca(placa) {
    const manutencaoList = document.createElement("div");
    manutencaoList.classList.add("manutencao-list");

    const manutencao = manutencoes[placa] || [];
    manutencao.forEach((manutencaoItem, index) => {
        const p = document.createElement("p");
        p.innerText = manutencaoItem;
        const concluirButton = document.createElement("button");
        concluirButton.classList.add("manutencao-button");
        concluirButton.innerText = "Concluir Manutenção";
        concluirButton.onclick = () => concluirManutencao(placa, index);
        manutencaoList.appendChild(p);
        manutencaoList.appendChild(concluirButton);
    });

    document.getElementById("placas-pendentes").innerHTML = "";
    document.getElementById("placas-pendentes").appendChild(manutencaoList);
}

function cadastrarManutencao(placa) {
    const manutencaoDescricao = prompt("Cadastre a nova manutenção para " + placa);
    if (manutencaoDescricao) {
        if (!manutencoes[placa]) {
            manutencoes[placa] = [];
        }
        manutencoes[placa].push(manutencaoDescricao);
        salvarManutencoes();  // Salva após adicionar a nova manutenção
        alert("Manutenção cadastrada com sucesso!");
    }
}

function concluirManutencao(placa, index) {
    manutencoes[placa].splice(index, 1); // Remove a manutenção da lista
    salvarManutencoes();  // Salva após concluir a manutenção
    mostrarManutencaoPorPlaca(placa); // Atualiza a lista
}

// Carregar as manutenções ao iniciar
carregarManutencoes();

