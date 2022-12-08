// Variáveis

const visor1 = document.getElementById("visualizacao1");
const visor2 = document.getElementById("visualizacao2");

const numeros = document.getElementById("numeros");
const botoes = numeros.getElementsByTagName("button");

const simbolos = document.getElementsByClassName("simbolos");

var n1 = null;
var n2 = null;
var sinal = "";
var permiteSinal = true;

// Ações com botões

for (let i = 0; i < botoes.length - 1; i++) {
  botoes[i].addEventListener("click", () => {
    if (visor1.innerText.includes("=")) 
    limpar();

    if (visor2.innerText.length < 20) 
    visor2.innerText += botoes[i].innerText;
  });
}

for (let i = 0; i < simbolos.length; i++) {
  simbolos[i].addEventListener("click", () => {
    sinal = simbolos[i].innerText;
    simboloAlternativo();
  });
}

function virgula() {
  if (visor1.innerText.includes("=")) 
  visor1.innerText = "";

  if (
    !visor2.innerText.includes(".") &&
    visor2.innerText != "" &&
    !isNaN(visor2.innerText)
  )
    visor2.innerText += ".";
}

function letraC() {
  limpar();
  permiteSinal = true;
}

// Métodos para conta

function igualar() {
  let acao = "";
  n2 = Number(visor2.innerText);
  permiteSinal = true;

  if (validaNumeros()) {
    switch (sinal) {
      case "+":
        acao = somar();
        break;
      case "-":
        acao = diminuir();
        break;
      case "*":
        acao = multiplicar();
        break;
      case "%":
        acao = porcentar();
        break;
      case "/":
        if (n2 == 0) {
          acao = "Não pode dividir por 0";
          permiteSinal = false;
        } else acao = dividir();
        break;
      default:
        acao = `<h4 style="color: rgb(220, 0, 0); margin-top: -5px;">[ERRO]<h4>`;
        break;
    }

    visor2.innerHTML = acao;

    if (n1.toString().length + n2.toString().length <= 30)
      visor1.innerText = `${n1} ${sinal} ${n2}=`;
    else visor1.innerText = "Número muito grande";
  }

  n1 = null;
  n2 = null;
}

function somar() {
  return n1 + n2;
}

function diminuir() {
  return n1 - n2;
}

function multiplicar() {
  return n1 * n2;
}

function porcentar() {
  return multiplicar() / 100;
}

function dividir() {
  return n1 / n2;
}

// Métodos de chamamento

function limpar() {
  visor1.innerText = null;
  visor2.innerText = null;

  n1 = null;
  n2 = null;
}

function simboloAlternativo() {
  if (permiteSinal) {
    n1 = Number(visor2.innerText);

    visor1.innerText = visor2.innerText + sinal;
    visor2.innerText = null;

    permiteSinal = false;
  }
}

function validaNumeros() {
  if (n1 == null || n2 == null) 
    return false;
   else 
    return true;
}
