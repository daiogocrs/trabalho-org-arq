function aritimeticaClick() {
  const input1 = document.getElementById("inputA_aritimetica").value;
  const input2 = document.getElementById("inputB_aritimetica").value;
  const base1 = parseInt(document.getElementById("base1").value);
  const base2 = parseInt(document.getElementById("base2").value);
  const base3 = parseInt(document.getElementById("base3").value);
  const operacao = document.getElementById("operacao").value;

  try {
    const resultado = aritimetica(input1, input2, operacao, base1, base2, base3);
    document.getElementById("resultado_operacao").textContent = `Resultado: ${resultado}`;
  } catch (error) {
    document.getElementById("resultado_operacao").textContent = `Erro: ${error.message}`;
  }
}

function aritimetica(input1, input2, operacao, base1, base2, base3) {
  if (!input1 || !input2 || !operacao || !base1 || !base2 || !base3) {
    throw new Error("Número ou operação indefinidos");
  }  
  let input1Decimal = paraDecimal(input1, base1);
  let input2Decimal = paraDecimal(input2, base2);
  let resultado = 0;
  if (operacao == "+") {
    resultado = input1Decimal + input2Decimal;
  } else if (operacao == "-") {
    resultado = input1Decimal - input2Decimal;
  } else if (operacao == "*") {
    resultado = input1Decimal * input2Decimal;
  } else if (operacao == "/") {
    if (input2Decimal == 0) {
      throw new Error("Divisao por zero");
    }
    resultado = input1Decimal / input2Decimal;
  }
  resultado = paraNovaBase(resultado, base3);
  console.log(input1Decimal, operacao, input2Decimal, " = ", resultado);
  return resultado;
}
