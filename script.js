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

function carregarPreventivas() {
    const dadosSalvos = localStorage.getItem('preventivas');
    if (dadosSalvos) {
        preventivas = JSON.parse(dadosSalvos);
    }
}

function salvarManutencoes() {
    localStorage.setItem('manutencoes', JSON.stringify(manutencoes));
}

function salvarPreventivas() {
    localStorage.setItem('preventivas', JSON.stringify(preventivas));
}

function inicializarPlacas() {
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

    const placasPreventivaDiv = document.getElementById("placas-preventiva");
    placasPreventivaDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => cadastrarPreventivaAdm(placa);
        placasPreventivaDiv.appendChild(button);
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

function mostrarCadastrarPreventivaAdm() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "block";
    inicializarPlacas();
}

function mostrarStatusPreventiva() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("status-preventiva").style.display = "block";
    mostrarStatusPreventivas();
}

function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("cadastrar-preventiva-adm").style.display = "none";
    document.getElementById("status-preventiva").style.display = "none";
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
        salvarManutencoes();
        alert("Manutenção cadastrada com sucesso!");
    }
}

function concluirManutencao(placa, index) {
    manutencoes[placa].splice(index, 1);
    salvarManutencoes();
    mostrarManutencaoPorPlaca(placa);
}

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

function mostrarStatusPreventivas() {
    const statusDiv = document.getElementById("status-preventiva-list");
    statusDiv.innerHTML = "";

    placas.forEach(placa => {
        if (preventivas[placa]) {
            preventivas[placa].forEach(preventiva => {
                const p = document.createElement("p");
                p.innerText = `Placa: ${placa} - Preventiva: ${preventiva.data} - Próxima Preventiva: ${preventiva.proximaPreventiva}`;
                statusDiv.appendChild(p);
            });
        }
    });
}

carregarManutencoes();
carregarPreventivas();

