const placas = ["PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"];

// Função para mostrar uma tela
function mostrarTela(tela) {
    // Esconde todas as telas
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => {
        tela.style.display = 'none';
    });

    // Exibe a tela selecionada
    document.getElementById(tela).style.display = 'block';

    if (tela === 'cadastrar-manutencao') {
        carregarPlacas('placas-container');
    }
    if (tela === 'cadastrar-preventiva') {
        carregarPlacas('placas-container-preventiva');
    }
    if (tela === 'manutencao-pendente') {
        carregarManutencaoPendente();
    }
    if (tela === 'status-preventiva') {
        carregarStatusPreventiva();
    }
}

// Função para carregar as placas na tela de cadastro de manutenção ou preventiva
function carregarPlacas(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    placas.forEach(placa => {
        const btn = document.createElement('button');
        btn.textContent = placa;
        btn.classList.add('placa');
        btn.onclick = () => selecionarPlaca(placa);
        container.appendChild(btn);
    });
}

// Função ao selecionar uma placa no cadastro de manutenção ou preventiva
function selecionarPlaca(placa) {
    if (document.getElementById('cadastro-manutencao-form')) {
        // Mostrar formulário de cadastro de manutenção
        document.getElementById('cadastro-manutencao-form').style.display = 'block';
        localStorage.setItem('placaSelecionada', placa);
    } else if (document.getElementById('cadastro-preventiva-form')) {
        // Mostrar formulário de cadastro de preventiva
        document.getElementById('cadastro-preventiva-form').style.display = 'block';
        localStorage.setItem('placaSelecionadaPreventiva', placa);
    }
}

// Função para salvar a manutenção
function salvarManutencao() {
    const descricao = document.getElementById('descricao-manutencao').value;
    const placa = localStorage.getItem('placaSelecionada');
    if (descricao && placa) {
        let manutencao = JSON.parse(localStorage.getItem('manutencoes')) || [];
        manutencao.push({ placa, descricao });
        localStorage.setItem('manutencoes', JSON.stringify(manutencao));
        alert('Manutenção cadastrada com sucesso!');
        document.getElementById('descricao-manutencao').value = '';
        mostrarTela('manutencao-pendente');
    }
}

// Função para carregar manutenções pendentes
function carregarManutencaoPendente() {
    const container = document.getElementById('manutencao-pendente-container');
    container.innerHTML = '';
    const manutencoes = JSON.parse(localStorage.getItem('manutencoes')) || [];
    placas.forEach(placa => {
        const btn = document.createElement('button');
        btn.textContent = placa;
        btn.classList.add('placa');
        btn.onclick = () => mostrarManutencaoDetalhada(placa);
        container.appendChild(btn);
    });
}

// Função para mostrar manutenções detalhadas e concluir manutenção
function mostrarManutencaoDetalhada(placa) {
    const manutencoes = JSON.parse(localStorage.getItem('manutencoes')) || [];
    const manutencao = manutencoes.filter(m => m.placa === placa);
    let descricao = '';
    manutencao.forEach(m => {
        descricao += `<p>${m.descricao}</p>`;
    });
    const container = document.getElementById('manutencao-pendente-container');
    container.innerHTML = descricao + `<button onclick="finalizarManutencao('${placa}')">Finalizar Manutenção</button>`;
}

// Função para finalizar manutenção
function finalizarManutencao(placa) {
    let manutencoes = JSON.parse(localStorage.getItem('manutencoes')) || [];
    manutencoes = manutencoes.filter(m => m.placa !== placa);
    localStorage.setItem('manutencoes', JSON.stringify(manutencoes));
    alert('Manutenção concluída!');
    mostrarTela('manutencao-pendente');
}

// Função para salvar a preventiva
function salvarPreventiva() {
    const tipo = document.getElementById('tipo-preventiva').value;
    const data = document.getElementById('data-preventiva').value;
    const proximaData = document.getElementById('proxima-preventiva').value;
    const placa = localStorage.getItem('placaSelecionadaPreventiva');
    if (tipo && data && proximaData && placa) {
        let preventivas = JSON.parse(localStorage.getItem('preventivas')) || [];
        preventivas.push({ placa, tipo, data, proximaData });
        localStorage.setItem('preventivas', JSON.stringify(preventivas));
        alert('Preventiva cadastrada com sucesso!');
        mostrarTela('status-preventiva');
    }
}

// Função para carregar status preventivo
function carregarStatusPreventiva() {
    const container = document.getElementById('status-preventiva-container');
    container.innerHTML = '';
    const preventivas = JSON.parse(localStorage.getItem('preventivas')) || [];
    placas.forEach(placa => {
        const btn = document.createElement('button');
        btn.textContent = placa;
        btn.classList.add('placa');
        btn.onclick = () => mostrarStatusPreventivaDetalhado(placa);
        container.appendChild(btn);
    });
}

// Função para mostrar status detalhado da preventiva
function mostrarStatusPreventivaDetalhado(placa) {
    const preventivas = JSON.parse(localStorage.getItem('preventivas')) || [];
    const preventiva = preventivas.filter(p => p.placa === placa);
    let descricao = '';
    preventiva.forEach(p => {
        descricao += `<p>Tipo: ${p.tipo}<br>Data: ${p.data}<br>Próxima: ${p.proximaData}</p>`;
    });
    const container = document.getElementById('status-preventiva-container');
    container.innerHTML = descricao + `<button onclick="encerrarPreventiva('${placa}')">Encerrar Preventiva</button>`;
}

// Função para encerrar preventiva
function encerrarPreventiva(placa) {
    let preventivas = JSON.parse(localStorage.getItem('preventivas')) || [];
    preventivas = preventivas.filter(p => p.placa !== placa);
    localStorage.setItem('preventivas', JSON.stringify(preventivas));
    alert('Preventiva concluída!');
    mostrarTela('status-preventiva');
}

// Função para quando clicar em "Entrar"
document.getElementById('entrar-btn').onclick = function() {
    document.getElementById('tela-inicial').style.display = 'none';
    document.getElementById('tela-principal').style.display = 'block';
};




