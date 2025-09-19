const gasolinaInput = document.getElementById("gasolina");
const botoes = document.querySelectorAll(".botoes-gasto button");

// Formatar número com pontos nos milhares
function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR");
}

// Remover formatação para cálculo
function desformatarNumero(valorFormatado) {
    return parseInt(valorFormatado.replace(/\./g, "")) || 0;
}

// Atualizar gasolina ao clicar nos botões de gasto
botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        let gasto = parseInt(botao.dataset.gasto);
        let atual = parseInt(gasolinaInput.value);
        gasolinaInput.value = atual - gasto >= 0 ? atual - gasto : 0;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const adicionarGasolinaButton = document.querySelector("#adicionarGasolina > button");
    const campoOculto = document.getElementById("campoOculto");
    const campoAdicionar = document.querySelector("#campoAdicionar input");
    const campoGastar = document.querySelector("#campoGastar input");
    const dinheiroInput = document.getElementById("dinheiro");

    // Mostrar ou esconder o campo
    adicionarGasolinaButton.addEventListener("click", () => {
        campoOculto.style.display = campoOculto.style.display === "none" ? "block" : "none";
    });

    // Atualizar valor do custo automaticamente
    campoAdicionar.addEventListener("input", () => {
        let valorAdicionar = parseInt(campoAdicionar.value) || 0;
        let custo = valorAdicionar * 100;
        campoGastar.value = formatarNumero(custo);
    });

    // Cancelar
    document.querySelector("#botoesConfirmar button:first-child").addEventListener("click", () => {
        campoOculto.style.display = "none";
        campoAdicionar.value = "";
        campoGastar.value = "0";
    });

    // Confirmar
    document.querySelector("#botoesConfirmar button:last-child").addEventListener("click", () => {
        let valorAdicionar = parseInt(campoAdicionar.value) || 0;
        let atualGasolina = parseInt(gasolinaInput.value) || 0;
        let atualDinheiro = desformatarNumero(dinheiroInput.value);

        let custo = valorAdicionar * 100;

        // Verificar se há dinheiro suficiente
        if (atualDinheiro < custo) {
            alert("Dinheiro insuficiente.");
            return;
        }

        gasolinaInput.value = atualGasolina + valorAdicionar;
        dinheiroInput.value = formatarNumero(atualDinheiro - custo);

        campoOculto.style.display = "none";
        campoAdicionar.value = "";
        campoGastar.value = "0";
    });
});

// Ganhar 500 de dinheiro
const dinheiroExtraButton = document.getElementById("dinheiroExtra");
const dinheiroInput = document.getElementById("dinheiro");

dinheiroExtraButton.addEventListener("click", () => {
    let atual = desformatarNumero(dinheiroInput.value);
    let novoValor = atual + 500;
    dinheiroInput.value = formatarNumero(novoValor);
});
