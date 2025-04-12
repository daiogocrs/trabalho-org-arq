function converter(input = 0, base_origem, base_final) {
  let resultado = 0,
    potencia = 0,
    passos = "",
    potencia2 = input.length - 1;

  switch (base_origem) {
    case 2:
      for (let i = input.length - 1; i >= 0; i--) {
        resultado += input[i] * Math.pow(2, potencia);
        potencia++;
      }

      for (let j = 0; j < input.length; j++) {
        passos += `${input[j]} x 2^${potencia2}`;
        if (potencia2 > 0) passos += " + ";
        potencia2--;
      }

      console.log(`\nBIN(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;

    case 8:
      for (let i = input.length - 1; i >= 0; i--) {
        resultado += input[i] * Math.pow(8, potencia);
        potencia++;
      }

      for (let j = 0; j < input.length; j++) {
        passos += `${input[j]} x 8^${potencia2}`;
        if (potencia2 > 0) passos += " + ";
        potencia2--;
      }

      console.log(`\nOCT(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;

    case 10:
      console.log("Base origem: Decimal");
      resultado = input;
      console.log(`\nDEC(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;

    case 16:
      console.log("Base origem: Hexa-Decimal");

      for (let i = input.length - 1; i >= 0; i--) {
        switch (input[i]) {
          case "A":
            resultado += 10 * Math.pow(16, potencia);
            break;
          case "B":
            resultado += 11 * Math.pow(16, potencia);
            break;
          case "C":
            resultado += 12 * Math.pow(16, potencia);
            break;
          case "D":
            resultado += 13 * Math.pow(16, potencia);
            break;
          case "E":
            resultado += 14 * Math.pow(16, potencia);
            break;
          case "F":
            resultado += 15 * Math.pow(16, potencia);
            break;
          default:
            resultado += input[i] * Math.pow(16, potencia);
            break;
        }
        potencia++;
      }

      for (let j = 0; j < input.length; j++) {
        let tmp;
        switch (input[j]) {
          case "A":
            tmp = "10";
            break;
          case "B":
            tmp = "11";
            break;
          case "C":
            tmp = "12";
            break;
          case "D":
            tmp = "13";
            break;
          case "E":
            tmp = "14";
            break;
          case "F":
            tmp = "15";
            break;
          default:
            tmp = input[j];
            break;
        }
        passos += `${tmp} x 16^${potencia2}`;
        if (potencia2 > 0) passos += " + ";
        potencia2--;
      }
      console.log(`\nHEX(${input}) => DEC(${resultado}) \n` + passos + "\n");
      break;
  }
}

converter("66", 8, 10);
