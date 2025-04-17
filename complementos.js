/*
input tem que ser binário positivo
*/

function complementoUm(input) {
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i] == 0 ? 1 : 0;
  }
  return input;
}

function complementoDois(input) {
  let resultado = complementoUm(input);

  for (let i = resultado.length - 1; i >= 0; i--) {
    if (resultado[i] === 0) {
      resultado[i] = 1;
      break;
    } else {
      resultado[i] = 0;
    }
  }
  return resultado;
}

let entrada = "1010".split("").map(Number);
let resultado = complementoDois(entrada);

console.log("Complemento de 2:", resultado.join(""));
