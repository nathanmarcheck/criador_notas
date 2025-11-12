// Contador global para rastrear o número de notas
let contadorNotas = 0;

function adicionarNota() {
    //get dos elementos
    const notaInput = document.getElementById('nota');
    const nota = notaInput.value;

    const checkbox = document.getElementById('urgente');
    const urgente = checkbox.checked;

    //mensagem de erro
    if (nota === '') {
        alert('Por favor, insira uma nota.');
        return;
    }

    contadorNotas++; //contador
    let mensagem = nota;

    // Define a cor 
    let cor;
    if (contadorNotas === 1) {
        cor = 'blue';
    } else if (contadorNotas === 2) {
        cor = '#bbce11';
    } else if (contadorNotas === 3) {
        cor = 'purple';
    }
    // reset
    if (contadorNotas > 3) {
        contadorNotas = 1;
        cor = "blue";
    }
    if (urgente) {
        const notasUrgentes = document.querySelector('.lista-urgentes');
        const pUrgente = document.createElement('li');
        pUrgente.textContent = mensagem;
        pUrgente.className = "remover";
        if (cor) {
            pUrgente.style.color = cor;
        }

        notasUrgentes.appendChild(pUrgente);
    }
    else {
        const notasNormais = document.querySelector('.lista-normais');
        const pNormal = document.createElement('li');
        pNormal.textContent = mensagem;
        pNormal.className = "remover";
        if (cor) {
            pNormal.style.color = cor;
        }

        notasNormais.appendChild(pNormal);
    }
    notaInput.value = '';
    checkbox.checked = false;
}
function removerTodasNotas() {
    const reposta = confirm('Tem certeza que deseja remover todas as notas?');
    if (reposta) { //verifica se o usuário confirmou
        const tudo = document.getElementsByClassName('remover');
        if (tudo) {
            while (tudo.length > 0) {
                tudo[0].remove();
            }
        }
    }

    // Reseta o contador quando todas as notas são removidas
    contadorNotas = 0;
}
function removerNotasUrgentes() {
    const notasUrgentes = document.querySelector('.lista-urgentes').lastChild;
    if (notasUrgentes) {
        notasUrgentes.remove();
    }
}
function removerNotas() {
    const notasNormais = document.querySelector('.lista-normais').lastChild;
    if (notasNormais) {
        notasNormais.remove();
    }
}

