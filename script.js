const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];

let manutencoes = {};
let preventivas = {};

// Carregar dados do localStorage
function carregarManutencoes() {
    const dadosSalvos = localStorage.getItem('manutencoes');
    if (dadosSalvos) {
        manutencoes = JSON.parse(dadosSalvos);
    } else {
        manutencoes = {};  // Inicializa como um objeto vazio caso não haja dados
    }
}

function carregarPreventivas() {
    const dadosSalvos = localStorage.getItem('preventivas');
    if (dadosSalvos) {
        preventivas = JSON.parse(dadosSalvos);
    } else {
        preventivas = {};  // Inicializa como um objeto vazio caso não haja dados
    }
}

// Salvar dados no localStorage
function salvarManutencoes() {
    localStorage.setItem('manutencoes', JSON.stringify(manutencoes));
}

function salvarPreventivas() {
    localStorage.setItem('preventivas', JSON.stringify(preventivas));
}

// Inicializar as placas
function inicializarPlacas() {
    // Tela de Cadastrar Preventiva-Adm
    const placasPreventivaDiv = document.getElementById("placas-preventiva");
    placasPreventivaDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => cadastrarPreventivaAdm(placa);
        placasPreventivaDiv.appendChild(button);
    });

    // Tela de Status Preventiva
    const statusPreventivaDiv = document.getElementById("status-preventiva-list");
    statusPreventivaDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => mostrarStatusPreventivaPorPlaca(placa);
        statusPreventivaDiv.appendChild(button);
    });
}

// Função para mostrar a tela inicial
function entrar() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Funções para mostrar as opções
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

function mostrarCadastrarPreventivaAdm() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "block";
    inicializarPlacas();
}

function mostrarStatusPreventiva() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("status-preventiva").style.display = "block";
    inicializarPlacas();
}

// Função para voltar para a tela de opções
function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "none";
    document.getElementById("status-preventiva").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para cadastrar preventiva-adm
function cadastrarPreventivaAdm(placa) {
    const data = prompt("Informe a data da preventiva:");
    const proximaPreventiva = prompt("Informe a próxima data da preventiva:");

    if (data && proximaPreventiva) {
        if (!preventivas[placa]) {
            preventivas[placa] = [];
        }
        preventivas[placa].push({ data, proximaPreventiva });
        salvarPreventivas();
        alert("Preventiva cadastrada com sucesso!");
    }
}

// Função para mostrar o status da preventiva
function mostrarStatusPreventivaPorPlaca(placa) {
    const preventivaList = document.createElement("div");
    preventivaList.classList.add("preventiva-list");

    const preventivasPlaca = preventivas[placa] || [];
    if (preventivasPlaca.length === 0) {
        const p = document.createElement("p");
        p.innerText = `Nenhuma preventiva cadastrada para a placa ${placa}.`;
        preventivaList.appendChild(p);
    } else {
        preventivasPlaca.forEach((preventiva, index) => {
            const p = document.createElement("p");
            p.innerText = `Preventiva: ${preventiva.data} - Próxima Preventiva: ${preventiva.proximaPreventiva}`;
            const concluirButton = document.createElement("button");
            concluirButton.classList.add("preventiva-button");
            concluirButton.innerText = "Concluir Preventiva";
            concluirButton.onclick = () => concluirPreventiva(placa, index);
            preventivaList.appendChild(p);
            preventivaList.appendChild(concluirButton);
        });
    }

    document.getElementById("status-preventiva-list").innerHTML = "";
    document.getElementById("status-preventiva-list").appendChild(preventivaList);
}

// Função para concluir uma preventiva
function concluirPreventiva(placa, index) {
    preventivas[placa].splice(index, 1); // Remove a preventiva da lista
    salvarPreventivas();
    mostrarStatusPreventivaPorPlaca(placa); // Atualiza a lista
}

// Carregar dados ao iniciar
carregarManutencoes();
carregarPreventivas();
