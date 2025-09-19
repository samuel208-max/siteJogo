const gasolinaInput = document.getElementById("gasolina");
const botoes = document.querySelectorAll(".botoes-gasto button");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        let gasto = parseInt(botao.dataset.gasto);
        let atual = parseInt(gasolinaInput.value);
        if (atual - gasto >= 0) { // não deixa ficar negativo
            gasolinaInput.value = atual - gasto;
        } else {
            gasolinaInput.value = 0;
        }
    });
});

// Garantir que o DOM está carregado
document.addEventListener("DOMContentLoaded", () => {
    const adicionarGasolinaButton = document.querySelector("#adicionarGasolina > button");
    const campoOculto = document.getElementById("campoOculto");
    const campoAdicionar = document.querySelector("#campoAdicionar input");
    const campoGastar = document.querySelector("#campoGastar input");
    const dinheiroInput = document.getElementById("dinheiro");
    const gasolinaInput = document.getElementById("gasolina");

    // Mostrar/ocultar o campo de adicionar gasolina
    adicionarGasolinaButton.addEventListener("click", () => {
        campoOculto.style.display = campoOculto.style.display === "none" ? "block" : "none";
    });

    // Atualizar o valor gasto automaticamente
    campoAdicionar.addEventListener("input", () => {
        let valorAdicionar = parseInt(campoAdicionar.value) || 0;
        let custo = valorAdicionar * 100; // custo fixo de 100 por unidade
        campoGastar.value = custo;
    });

    // Botões cancelar e confirmar
    const confirmarButton = document.querySelector("#botoesConfirmar button:nth-child(2)");



    confirmarButton.addEventListener("click", () => {
        let valorAdicionar = parseInt(campoAdicionar.value) || 0;
        let atual = parseInt(gasolinaInput.value) || 0;
        gasolinaInput.value = atual + valorAdicionar;

        dinheiroInput.value = (parseInt(dinheiroInput.value) || 0) - (valorAdicionar * 100);

        // Resetar os campos
        campoOculto.style.display = "none";
        campoAdicionar.value = "";
        campoGastar.value = "0";
    });

    const canvas = document.getElementById("canvasRoleta");
    const ctx = canvas.getContext("2d");
    const girarBtn = document.getElementById("girarRoleta");
    const resultadoDiv = document.getElementById("resultado");

    const categorias = {
        "Animal": ["Leão", "Elefante", "Tigre", "Girafa", "Urso", "Lobo", "Golfinho", "Coruja", "Cavalo", "Jacaré", "Canguru", "Pinguim", "Tartaruga", "Rinoceronte", "Anta", "Gato", "Cão", "Porco", "Tamanduá", "Zebra", "Camaleão"],
        "Objeto": ["Cadeira", "Mesa", "Lâmpada", "Livro", "Relógio", "Caneta", "Computador", "Garrafa", "Celular", "Espelho", "Mochila", "Chave", "Quadro", "Tesoura", "Controle remoto", "Almofada", "Copo", "Televisão", "Vaso", "Janela"],
        "Personagem": ["Harry Potter", "Sherlock Holmes", "Darth Vader", "Homem-Aranha", "Batman", "Frodo Bolseiro", "Elsa (Frozen)", "Naruto Uzumaki", "Mulher-Maravilha", "Indiana Jones", "Goku", "Katniss Everdeen", "Hornet (Silk Song)", "Tony Stark", "Luke Skywalker", "James Bond", "Saci-Pererê", "Hulk", "Mickey Mouse", "João e Maria", "Megamente"],
        "Esporte": ["Futebol", "Basquete", "Vôlei", "Tênis", "Natação", "Atletismo", "Judô", "Ciclismo", "Handebol", "Boxe", "Rugby", "Beisebol", "Surfe", "Skate", "Golfe", "Esgrima", "Ginástica artística", "Hipismo", "Caratê", "Remo"],
        "Profissão": ["Médico", "Professor", "Engenheiro", "Advogado", "Arquiteto", "Enfermeiro", "Policial", "Bombeiro", "Psicólogo", "Jornalista", "Dentista", "Motorista", "Cozinheiro", "Ator", "Cantor", "Bibliotecário"]
    };

    const setores = Object.keys(categorias);
    const cores = ["#8000ff", "#a64dff"];
    let anguloAtual = 0;

    // desenhar roleta
    function desenharRoleta() {
        const tamanho = canvas.width;
        const raio = tamanho / 2;
        const anguloSetor = 2 * Math.PI / setores.length;

        for (let i = 0; i < setores.length; i++) {
            ctx.beginPath();
            ctx.moveTo(raio, raio);
            ctx.arc(raio, raio, raio, i * anguloSetor, (i + 1) * anguloSetor);
            ctx.fillStyle = cores[i % cores.length];
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.stroke();

            // Texto do setor
            ctx.save();
            ctx.translate(raio, raio);
            ctx.rotate(i * anguloSetor + anguloSetor / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "14px Arial";
            ctx.fillText(setores[i], raio - 10, 5);
            ctx.restore();
        }
    }

    desenharRoleta();

    // girar roleta
    girarBtn.addEventListener("click", () => {
        const giro = Math.random() * 360 + 360; // entre 360 e 720 graus
        const duracao = 3000; // 3 segundos
        const inicio = performance.now();

        function animar(time) {
            let tempo = time - inicio;
            let porcentagem = Math.min(tempo / duracao, 1);
            let angulo = anguloAtual + (giro * (1 - Math.pow(1 - porcentagem, 3)));
            canvas.style.transform = `rotate(${angulo}deg)`;

            if (porcentagem < 1) {
                requestAnimationFrame(animar);
            } else {
                anguloAtual = (anguloAtual + giro) % 360;
                // descobrir setor selecionado
                const anguloSetor = 360 / setores.length;
                const indice = setores.length - Math.floor((anguloAtual % 360) / anguloSetor) - 1;
                const categoriaSelecionada = setores[indice];
                const lista = categorias[categoriaSelecionada];
                const item = lista[Math.floor(Math.random() * lista.length)];
                resultadoDiv.innerHTML = `<span>${categoriaSelecionada}:</span> ${item}`;
            }
        }

        requestAnimationFrame(animar);
    });

});

const dinheiroExtraButton = document.getElementById("dinheiroExtra");
const dinheiroInput = document.getElementById("dinheiro");

dinheiroExtraButton.addEventListener("click", () => {
    let atual = parseInt(dinheiroInput.value) || 0;
    dinheiroInput.value = atual + 500; // Adiciona 500 ao dinheiro atual
});


