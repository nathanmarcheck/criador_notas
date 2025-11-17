// Contador global para rastrear o número de notas
let contadorNotas = 0;
let notas = [];
const STORAGE_KEY = 'criador_notas.notas';

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

        notas.push({ text: mensagem, urgente: true });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));

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

        notas.push({ text: mensagem, urgente: false });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));

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
        notas = [];
        localStorage.clear()
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
    const notasUrgentes = document.querySelector('.lista-urgentes').lastChild; //lastChild- seleciona o ultimo elemento da lista.
    if (notasUrgentes) {
        notasUrgentes.remove();
        for (let i = notas.length - 1; i >= 0; i--) {
            if (notas[i].urgente) {
                notas.splice(i, 1)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(notas))
                break
            }
        }
    }
}
function removerNotas() {
    const notasNormais = document.querySelector('.lista-normais').lastChild;
    if (notasNormais) {
        notasNormais.remove();
        for (let i = notas.length - 1; i >= 0; i--) {
            if (!notas[i].urgente) {
                notas.splice(i, 1);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
                break;
            }
        }
    }
}

// Carrega as notas do localStorage e renderiza na página ao abrir
function carregarNotas() {
    const carregar = localStorage.getItem(STORAGE_KEY);
    if (carregar) {
        try {
            notas = JSON.parse(carregar);
        } catch (e) {
            notas = [];
        }
    }

    const listaUrgentes = document.querySelector('.lista-urgentes');
    const listaNormais = document.querySelector('.lista-normais');
    if (!listaUrgentes || !listaNormais) return;

    listaUrgentes.innerHTML = '';
    listaNormais.innerHTML = '';
    contadorNotas = 0;

    for (const nota of notas) {
        contadorNotas++;
        const li = document.createElement('li');
        li.textContent = nota.text;
        li.className = 'remover';

        // Define cor em ciclo (1..3)
        let cor;
        if (contadorNotas === 1) {
            cor = 'blue';
        } else if (contadorNotas === 2) {
            cor = '#bbce11';
        } else if (contadorNotas === 3) {
            cor = 'purple';
        }
        if (contadorNotas > 3) {
            contadorNotas = 1;
            cor = 'blue';
        }

        if (cor) {
            li.style.color = cor;
        }

        if (nota.urgente) {
            listaUrgentes.appendChild(li);
        } else {
            listaNormais.appendChild(li);
        }
    }
}

// Executa carregarNotas quando a página termina de carregar
document.addEventListener('DOMContentLoaded', carregarNotas);


