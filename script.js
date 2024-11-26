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
function inicializarPlacas() {
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

    // Tela de Manutenções Pendentes
    const placasPendentesDiv = document.getElementById("placas-pendentes");
    placasPendentesDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => mostrarManutencaoPendentesPorPlaca(placa);
        placasPendentesDiv.appendChild(button);
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

// Função para cadastrar manutenção
function cadastrarManutencao(placa) {
    const manutencao = prompt("Informe o tipo de manutenção (ex: troca de óleo, revisão, etc.):");

    if (manutencao) {
        if (!manutencoes[placa]) {
            manutencoes[placa] = [];
        }
        manutencoes[placa].push(manutencao);
        salvarDados();
        alert("Manutenção cadastrada com sucesso!");
    }
}

// Função para mostrar manutenções pendentes de uma placa
function mostrarManutencaoPendentesPorPlaca(placa) {
    const manutencaoList = document.createElement("div");
    manutencaoList.classList.add("manutencao-list");

    const manutencoesPlaca = manutencoes[placa] || [];
    if (manutencoesPlaca.length > 0) {
        manutencoesPlaca.forEach(manutencao => {
            const p = document.createElement("p");
            p.innerText = manutencao;
            manutencaoList.appendChild(p);
        });
    } else {
        const p = document.createElement("p");
        p.innerText = "Não há manutenções pendentes.";
        manutencaoList.appendChild(p);
    }

    document.getElementById("placas-pendentes").appendChild(manutencaoList);
}

// Inicializar a página
carregarDados();


