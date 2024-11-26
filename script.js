const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];

let manutencoes = {};  // Armazenará as manutenções por placa
let preventivas = {};  // Armazenará as preventivas por placa

// Carregar dados do localStorage
function carregarDados() {
    const dadosManutencao = localStorage.getItem('manutencoes');
    const dadosPreventiva = localStorage.getItem('preventivas');
    
    if (dadosManutencao) {
        manutencoes = JSON.parse(dadosManutencao);
    } else {
        manutencoes = {};  // Inicializa como um objeto vazio caso não haja dados
    }

    if (dadosPreventiva) {
        preventivas = JSON.parse(dadosPreventiva);
    } else {
        preventivas = {};  // Inicializa como um objeto vazio caso não haja dados
    }
}

// Salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('manutencoes', JSON.stringify(manutencoes));
    localStorage.setItem('preventivas', JSON.stringify(preventivas));
}

// Inicializar as placas para interação
function inicializarPlacasCadastro() {
    // Tela de Cadastrar Manutenção
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

function inicializarPlacasPreventiva() {
    // Tela de Cadastrar Preventiva-Adm
    const placasPreventivaDiv = document.getElementById("placas-preventiva");
    placasPreventivaDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("preventiva-button");
        button.onclick = () => cadastrarPreventivaAdm(placa);
        placasPreventivaDiv.appendChild(button);
    });
}

function inicializarPlacasStatus() {
    // Tela de Status Preventiva
    const statusPreventivaDiv = document.getElementById("status-preventiva-list");
    statusPreventivaDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("preventiva-button");
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
    inicializarPlacasPendentes();
}

function mostrarCadastrarManutencao() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "block";
    inicializarPlacasCadastro();
}

function mostrarCadastrarPreventivaAdm() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "block";
    inicializarPlacasPreventiva();
}

function mostrarStatusPreventiva() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("status-preventiva").style.display = "block";
    inicializarPlacasStatus();
}

// Função para voltar para a tela de opções
function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "none";
    document.getElementById("status-preventiva").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para visualizar manutenções pendentes
function inicializarPlacasPendentes() {
    const manutencaoList = document.getElementById("placas-pendentes");
    manutencaoList.innerHTML = "";
    placas.forEach(placa => {
        const p = document.createElement("p");
        p.innerText = `Placa: ${placa}`;
        manutencaoList.appendChild(p);
    });
}

// Funções de cadastro de manutenções
function cadastrarManutencao(placa) {
    const manutencao = prompt(`Cadastrar manutenção para a placa ${placa}`);
    if (manutencao) {
        if (!manutencoes[placa]) {
            manutencoes[placa] = [];
        }
        manutencoes[placa].push(manutencao);
        salvarDados();
        alert(`Manutenção para a placa ${placa} cadastrada.`);
    }
}

function cadastrarPreventivaAdm(placa) {
    const preventiva = prompt(`Cadastrar Preventiva-Adm para a placa ${placa}`);
    if (preventiva) {
        if (!preventivas[placa]) {
            preventivas[placa] = [];
        }
        preventivas[placa].push(preventiva);
        salvarDados();
        alert(`Preventiva-Adm para a placa ${placa} cadastrada.`);
    }
}

function mostrarStatusPreventivaPorPlaca(placa) {
    const statusPreventivaList = document.getElementById("status-preventiva-list");
    statusPreventivaList.innerHTML = "";
    if (preventivas[placa] && preventivas[placa].length > 0) {
        preventivas[placa].forEach(status => {
            const p = document.createElement("p");
            p.innerText = `Preventiva-Adm: ${status}`;
            statusPreventivaList.appendChild(p);
        });
    } else {
        const p = document.createElement("p");
        p.innerText = "Nenhuma preventiva cadastrada.";
        statusPreventivaList.appendChild(p);
    }
}

// Carregar dados ao inicializar
carregarDados();
