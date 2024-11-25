// Lista de placas dos veículos
const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];

// Armazenamento das manutenções cadastradas
let manutencoes = {};

// Função para inicializar a tela de manutenções pendentes ou cadastro
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

    // Cadastrar Manutenção
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

// Função para exibir tela inicial
function entrar() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para mostrar as manutenções pendentes
function mostrarManutencaoPendentes() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("manutencao-pendentes").style.display = "block";
    inicializarPlacas();
}

// Função para mostrar o formulário de cadastro
function mostrarCadastrarManutencao() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "block";
    inicializarPlacas();
}

// Função para voltar para a tela de opções
function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para mostrar manutenções de uma placa
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

// Função para cadastrar uma nova manutenção
function cadastrarManutencao(placa) {
    const manutencaoDescricao = prompt("Cadastre a nova manutenção para " + placa);
    if (manutencaoDescricao) {
        if (!manutencoes[placa]) {
            manutencoes[placa] = [];
        }
        manutencoes[placa].push(manutencaoDescricao);
        alert("Manutenção cadastrada com sucesso!");
    }
}

// Função para concluir uma manutenção
function concluirManutencao(placa, index) {
    manutencoes[placa].splice(index, 1); // Remove a manutenção da lista
    mostrarManutencaoPorPlaca(placa); // Atualiza a lista
}
