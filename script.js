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
    const cancelarButton = document.querySelector("#botoesConfirmar button:nth-child(1)");
    const confirmarButton = document.querySelector("#botoesConfirmar button:nth-child(2)");

    cancelarButton.addEventListener("click", () => {
        campoOculto.style.display = "none";
        campoAdicionar.value = "";
        campoGastar.value = "0";
    });

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
});
