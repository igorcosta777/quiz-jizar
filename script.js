// ==========================================
// CONFIGURAÇÕES
// ==========================================

// Coloque aqui o número do WhatsApp.
// Formato: código do país + DDD + número
// Exemplo: 5581999999999

const numeroWhatsApp = "5581999999999";


// Mensagem que será enviada ao clicar no botão

const mensagemWhatsApp =
    "Olá! Fiz o quiz e gostaria de saber mais informações.";


// ==========================================
// ELEMENTOS
// ==========================================

const telas = document.querySelectorAll(".tela");

const btnComecar = document.getElementById("btnComecar");

const botoesOpcoes = document.querySelectorAll(".opcao");

const botoesContinuar = document.querySelectorAll(".continuar");

const whatsappBtn = document.getElementById("whatsappBtn");


// ==========================================
// CONTROLE DOS QUIZZES
// ==========================================

let quizAtual = 0;

let respostas = {};


// Ordem das telas

const etapas = [
    "inicio",
    "quiz1",
    "quiz2",
    "quiz3",
    "final"
];


// ==========================================
// FUNÇÃO PARA TROCAR DE TELA
// ==========================================

function mostrarTela(idTela) {

    telas.forEach(function(tela) {

        tela.classList.remove("ativa");

    });

    const novaTela = document.getElementById(idTela);

    if (novaTela) {

        novaTela.classList.add("ativa");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// BOTÃO COMEÇAR
// ==========================================

btnComecar.addEventListener("click", function() {

    quizAtual = 1;

    mostrarTela("quiz1");

});


// ==========================================
// SELEÇÃO DAS RESPOSTAS
// ==========================================

botoesOpcoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const quiz = this.dataset.quiz;

        // Remove seleção das outras opções
        document
            .querySelectorAll(`.opcao[data-quiz="${quiz}"]`)
            .forEach(function(opcao) {

                opcao.classList.remove("selecionada");

            });


        // Seleciona a opção clicada
        this.classList.add("selecionada");


        // Guarda a resposta
        respostas[quiz] = this.textContent.trim();


        // Localiza o botão continuar daquele quiz
        const quizTela = this.closest(".tela");

        const botaoContinuar =
            quizTela.querySelector(".continuar");


        // Libera o botão
        botaoContinuar.disabled = false;

    });

});


// ==========================================
// BOTÕES CONTINUAR
// ==========================================

botoesContinuar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Segurança: não permite continuar sem resposta
        if (this.disabled) {
            return;
        }


        const telaAtual = this.closest(".tela");


        if (telaAtual.id === "quiz1") {

            quizAtual = 2;

            mostrarTela("quiz2");

        }

        else if (telaAtual.id === "quiz2") {

            quizAtual = 3;

            mostrarTela("quiz3");

        }

        else if (telaAtual.id === "quiz3") {

            quizAtual = 4;

            mostrarTela("final");

        }

    });

});


// ==========================================
// WHATSAPP
// ==========================================

const linkWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;


whatsappBtn.href = linkWhatsApp;