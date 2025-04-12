function converter(input = 0, base_origem, base_final) {
  let decimal, resultado;
  switch (base_origem) {
    case 2:
      console.log("Base origem: Binário");
      decimal = parseInt(input, 2);
      break;
    case 8:
      console.log("Base origem: Octal");
      decimal = parseInt(input, 8);
      break;
    case 10:
      console.log("Base origem: Decimal");
      decimal = parseInt(input, 10);
      break;
    case 16:
      console.log("Base origem: Hexa-Decimal");
      decimal = parseInt(input, 16);
      break;
  }
  switch (base_final) {
    case 2:
      console.log("Base final: Binário");
      resultado = decimal.toString(2);
      break;
    case 8:
      console.log("Base final: Octal");
      resultado = decimal.toString(8);
      break;
    case 10:
      console.log("Base final: Decimal");
      resultado = decimal.toString(10);
      break;
    case 16:
      console.log("Base final: Hexa-Decimal");
      resultado = decimal.toString(16);
      break;
  }
  return resultado;
}

console.log(converter("2AAAA", 16, 2));
