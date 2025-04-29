function aritimeticaClick() {
  const input1 = document.getElementById("inputA_aritimetica").value.trim();
  const input2 = document.getElementById("inputB_aritimetica").value.trim();
  const base1 = parseInt(document.getElementById("base1").value);
  const base2 = parseInt(document.getElementById("base2").value);
  const base3 = parseInt(document.getElementById("base3").value);
  const operacao = document.getElementById("operacao").value;

  try {
    const resultado = aritimetica(input1, input2, operacao, base1, base2, base3);
    console.log(`${input1} (base ${base1}) ${operacao} ${input2} (base ${base2}) = ${resultado} (base ${base3})`);
    document.getElementById("resultado_operacao").textContent = `Resultado: ${resultado}`;
  } catch (error) {
    document.getElementById("resultado_operacao").textContent = `Erro: ${error.message}`;
  }
}

function aritimetica(input1, input2, operacao, base1, base2, base3) {
  if (!input1 || !input2 || !operacao || isNaN(base1) || isNaN(base2) || isNaN(base3)) {
    throw new Error("Número, base ou operação indefinidos.");
  }

  const operacoesValidas = ["+", "-", "*", "/"];
  if (!operacoesValidas.includes(operacao)) {
    throw new Error("Operação inválida. Use +, -, * ou /.");
  }

  const input1Decimal = paraDecimal(input1, base1);
  const input2Decimal = paraDecimal(input2, base2);
  let resultado = 0;

  switch (operacao) {
    case "+":
      resultado = input1Decimal + input2Decimal;
      break;
    case "-":
      resultado = input1Decimal - input2Decimal;
      break;
    case "*":
      resultado = input1Decimal * input2Decimal;
      break;
    case "/":
      if (input2Decimal === 0) {
        throw new Error("Divisão por zero.");
      }
      resultado = input1Decimal / input2Decimal;
      break;
  }

  return paraNovaBase(resultado, base3);
}

function paraDecimal(valor, base) {
  const permitido = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, base);
  const [parteInteira, parteFracionaria] = valor.toLowerCase().split(".");

  for (let char of parteInteira) {
    if (!permitido.includes(char)) {
      throw new Error(`Caractere '${char}' inválido para base ${base}.`);
    }
  }

  if (parteFracionaria) {
    for (let char of parteFracionaria) {
      if (!permitido.includes(char)) {
        throw new Error(`Caractere '${char}' inválido na parte fracionária para base ${base}.`);
      }
    }
  }

  let decimal = parseInt(parteInteira, base);

  if (parteFracionaria) {
    let fracao = 0;
    for (let i = 0; i < parteFracionaria.length; i++) {
      const valorDigito = permitido.indexOf(parteFracionaria[i]);
      fracao += valorDigito / Math.pow(base, i + 1);
    }
    decimal += fracao;
  }

  return decimal;
}

function paraNovaBase(numeroDecimal, base) {
  if (typeof numeroDecimal !== "number" || isNaN(numeroDecimal)) {
    throw new Error("Valor decimal inválido para conversão.");
  }

  const permitido = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const parteInteira = Math.floor(Math.abs(numeroDecimal));
  let parteFracionaria = Math.abs(numeroDecimal) - parteInteira;

  let resultadoInteiro = parteInteira.toString(base).toUpperCase();

  let resultadoFracao = "";
  let limiteCasas = 10;
  while (parteFracionaria > 0 && resultadoFracao.length < limiteCasas) {
    parteFracionaria *= base;
    const digito = Math.floor(parteFracionaria);
    resultadoFracao += permitido[digito];
    parteFracionaria -= digito;
  }

  let resultado = resultadoFracao ? `${resultadoInteiro}.${resultadoFracao}` : resultadoInteiro;
  return numeroDecimal < 0 ? `-${resultado}` : resultado;
}
