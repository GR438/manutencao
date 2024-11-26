const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];
let manutencoes = {};
let preventivas = {};

function carregarManutencoes() {
    const dadosSalvos = localStorage.getItem('manutencoes');
    if (dadosSalvos) {
        manutencoes = JSON.parse(dadosSalvos);
    }
}

function salvarManutencoes() {
    localStorage.setItem('manutencoes', JSON.stringify(manutencoes));
}

function carregarPreventivas() {
    const dadosSalvos = localStorage.getItem('preventivas');
    if (dadosSalvos) {
        preventivas = JSON.parse(dadosSalvos);
    }
}

function salvarPreventivas() {
    localStorage.setItem('preventivas', JSON.stringify(preventivas));
}

// Tela de Opções
function entrar() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Tela de Manutenções Pendentes
function mostrarManutencaoPendentes() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("manutencao-pendentes").style.display = "block";
    inicializarPlacas();
}

// Tela de Cadastrar Manutenção
function mostrarCadastrarManutencao() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "block";
    inicializarPlacasCadastro();
}

// Tela de Cadastrar Preventiva Adm
function mostrarCadastrarPreventivaAdm() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "block";
    inicializarPlacasPreventivaAdm();
}

// Tela de Status Preventiva
function mostrarStatusPreventiva() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("status-preventiva").style.display = "block";
    inicializarStatusPreventiva();
}

// Voltar para a tela de opções
function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "none";
    document.getElementById("status-preventiva").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Inicializar as placas nas telas de Cadastro de Manutenção e Manutenções Pendentes
function inicializarPlacas() {
    const placasDiv = document.getElementById("placas-pendentes");
    placasDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => mostrarManutencaoPorPlaca(placa);
        placasDiv.appendChild(button);
    });
}

// Inicializar as placas para o Cadastro de Manutenção
function inicializarPlacasCadastro() {
    const placasDiv = document.getElementById("placas-cadastro");
    placasDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => cadastrarManutencao(placa);
        placasDiv.appendChild(button);
    });
}

// Inicializar as placas para o Cadastro de Preventiva Adm
function inicializarPlacasPreventivaAdm() {
    const placasDiv = document.getElementById("placas-preventiva-adm");
    placasDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => cadastrarPreventivaAdm(placa);
        placasDiv.appendChild(button);
    });
}

// Inicializar as placas para o Status Preventiva
function inicializarStatusPreventiva() {
    const placasDiv = document.getElementById("status-preventiva-list");
    placasDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => mostrarStatusPreventivaPorPlaca(placa);
        placasDiv.appendChild(button);
    });
}

// Função para cadastrar manutenção
function cadastrarManutencao(placa) {
    const manutencaoDescricao = prompt("Informe a descrição da manutenção para " + placa);
    if (manutencaoDescricao) {
        if (!manutencoes[placa]) {
            manutencoes[placa] = [];
        }
        manutencoes[placa].push(manutencaoDescricao);
        salvarManutencoes();
        alert("Manutenção cadastrada com sucesso!");
    }
}

// Mostrar as manutenções pendentes por placa
function mostrarManutencaoPorPlaca(placa) {
    if (manutencoes[placa] && manutencoes[placa].length > 0) {
        alert("Manutenções pendentes para a placa " + placa + ":\n" + manutencoes[placa].join("\n"));
    } else {
        alert("Não há manutenções pendentes para a placa " + placa);
    }
}




