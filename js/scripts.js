function adicionarNota() {
    const notaInput = document.getElementById('nota');
    const nota = notaInput.value;

    const checkbox = document.getElementById('urgente');
    const urgente = checkbox.checked;

    if (nota === '') {
        alert('Por favor, insira uma nota.');
        return;
    }

    let mensagem = nota;

    if (urgente) {
        const notasUrgentes = document.querySelector('.lista-urgentes');
        const pUrgente = document.createElement('li');
        pUrgente.textContent = mensagem;
        pUrgente.id = 'urgente';
        pUrgente.className = "reUrgente";
        notasUrgentes.appendChild(pUrgente);
    } 
    else 
        {
        const notasNormais = document.querySelector('.lista-normais');
        const pNormal = document.createElement('li');
        pNormal.textContent = mensagem;
        pNormal.id = 'normal';
        pNormal.className = "reNormal";
        notasNormais.appendChild(pNormal);
    }
    notaInput.value = '';
    checkbox.checked = false;
}
function removerTodasNotas() {
    const notasUrgentes = document.getElementsByClassName('reUrgente');
    const notasNormais = document.getElementsByClassName('reNormal');
    if (notasUrgentes) {
        while(notasUrgentes.length > 0) {
            notasUrgentes[0].remove();
        }
    }
    if (notasNormais) {
        while(notasNormais.length > 0) {
            notasNormais[0].remove();
        }
    }
}
function removerNotasUrgentes() {
    const notasUrgentes = document.getElementById('urgente');
    if (notasUrgentes) {
        notasUrgentes.remove();
        notasUrgentes.innerHTML = '<h3>Notas Urgentes</h3>';
    }
}
function removerNotas() {
    const notasNormais = document.getElementById('normal');
    if (notasNormais) {
        notasNormais.remove();
        notasNormais.innerHTML = '<h3>Notas Normais</h3>';
    }
}

