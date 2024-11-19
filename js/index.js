const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("campoInput");
const tipButtons = document.querySelectorAll(".tips button");

const customTipInput = document.querySelector(".custom");
const campoInput = document.querySelectorAll('.campo');
const tipAmountDisplay = document.getElementById("tipAmountDisplay");

const totalDisplay = document.getElementById("totalDisplay");
const spans = document.querySelectorAll('.error');
const resetButton = document.querySelector(".btn-reset");


let billValue = 0;
let tipValue = 0;
let peopleCount = 1;

function calculateTip() {
    if (!billValue || !tipValue || !peopleCount) {
        return;
    }

    const tipAmount = (billValue * tipValue) / peopleCount;
    const total = (billValue * (1 + tipValue)) / peopleCount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;

}

function validarCampos() {
    campoInput.forEach((input, index) => {
        if (isNaN(input.value) || input.value === '') {
            input.classList.add('invalido');
            spans[index].style.display = 'block';
        } else {
            input.classList.remove('invalido');
            spans[index].style.display = 'none';
        }
    });
}


function handleEnterKey(event) {
    if (event.key === "Enter") {
        calculateTip();
        validarCampos();
    }
}


billInput.addEventListener("input", () => {
    billValue = parseFloat(billInput.value) || 0;
});


tipButtons.forEach(button => {
    button.addEventListener("click", () => {
        tipValue = parseFloat(button.textContent) / 100;
        customTipInput.value = "";
    });
});


customTipInput.addEventListener("input", () => {
    tipValue = parseFloat(customTipInput.value) / 100 || 0;
    tipButtons.forEach(button => button.classList.remove("active"));
});


peopleInput.addEventListener("input", () => {
    peopleCount = parseInt(peopleInput.value) || 0;
});



/* EVENTO DA TECLA ENTER E RESET */

billInput.addEventListener("keydown", handleEnterKey);
customTipInput.addEventListener("keydown", handleEnterKey);
peopleInput.addEventListener("keydown", handleEnterKey);


resetButton.addEventListener("click", () => {
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = "";
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
    billValue = 0;
    tipValue = 0;
    peopleCount = 1;
    tipButtons.forEach(button => button.classList.remove("selected"));
});



/* ESTILO DOS BOTOES */

document.querySelectorAll('.options .tip-selector .tips button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe 'selected' de todos os botões
        document.querySelectorAll('.options .tip-selector .tips button').forEach(btn => btn.classList.remove('selected'));
        // Adiciona a classe 'selected' ao botão clicado
        button.classList.add('selected');
    });
});
