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
    if (manutencoesPlaca.length === 0) {
        const p = document.createElement("p");
        p.innerText = `Nenhuma manutenção cadastrada para a placa ${placa}.`;
        manutencaoList.appendChild(p);
    } else {
        manutencoesPlaca.forEach((manutencao, index) => {
            const p = document.createElement("p");
            p.innerText = `Manutenção: ${manutencao}`;
            const concluirButton = document.createElement("button");
            concluirButton.innerText = "Encerrar Manutenção";
            concluirButton.onclick = () => encerrarManutencao(placa, index);
            manutencaoList.appendChild(p);
            manutencaoList.appendChild(concluirButton);
        });
    }

    document.getElementById("placas-pendentes").innerHTML = "";
    document.getElementById("placas-pendentes").appendChild(manutencaoList);
}

// Função para encerrar (remover) a manutenção
function encerrarManutencao(placa, index) {
    manutencoes[placa].splice(index, 1);  // Remove a manutenção
    salvarDados();  // Salva as mudanças
    mostrarManutencaoPendentesPorPlaca(placa);  // Atualiza a tela
}

// Função para cadastrar preventiva
function cadastrarPreventivaAdm(placa) {
    const tipoPreventiva = prompt("Informe o tipo de Preventiva:");
    const dataPreventiva = prompt("Informe a data da Preventiva:");
    const proximaPreventiva = prompt("Informe a data da próxima Preventiva:");

    if (tipoPreventiva && dataPreventiva && proximaPreventiva) {
        if (!preventivas[placa]) {
            preventivas[placa] = [];
        }
        preventivas[placa].push({ tipo: tipoPreventiva, data: dataPreventiva, proxima: proximaPreventiva });
        salvarDados();
        alert("Preventiva cadastrada com sucesso!");
    }
}

// Função para mostrar as preventivas cadastradas
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
            p.innerText = `Preventiva: ${preventiva.tipo} | Data: ${preventiva.data} | Próxima: ${preventiva.proxima}`;
            const encerrarButton = document.createElement("button");
            encerrarButton.innerText = "Encerrar Preventiva";
            encerrarButton.onclick = () => encerrarPreventiva(placa, index);
            preventivaList.appendChild(p);
            preventivaList.appendChild(encerrarButton);
        });
    }

    document.getElementById("status-preventiva-list").innerHTML = "";
    document.getElementById("status-preventiva-list").appendChild(preventivaList);
}

// Função para encerrar (remover) a preventiva
function encerrarPreventiva(placa, index) {
    preventivas[placa].splice(index, 1);  // Remove a preventiva
    salvarDados();  // Salva as mudanças
    mostrarStatusPreventivaPorPlaca(placa);  // Atualiza a tela
}

// Carregar os dados ao iniciar
carregarDados();
