// Converte strings de peso/altura e retorna números válidos
export const parseNumero = (valor) => {
  if (typeof valor !== "string" && typeof valor !== "number") return NaN;
  return parseFloat(String(valor).replace(",", "."));
};

// Função 1 — Calcular IMC
export const calcularIMC = (peso, altura) => {
  const pesoNum = parseNumero(peso);
  let alturaNum = parseNumero(altura);

  if (!peso || !altura) return NaN;
  if (isNaN(pesoNum) || isNaN(alturaNum)) return NaN;
  if (pesoNum <= 0 || alturaNum <= 0) return NaN;

  // Se vier em centímetros (ex: 170)
  if (alturaNum > 3) alturaNum = alturaNum / 100;

  if (alturaNum > 3) return NaN;

  return +(pesoNum / (alturaNum * alturaNum)).toFixed(2);
};

// Função 2 — Classificação e dica
export const gerarClassificacaoEDica = (imc) => {
  if (imc < 18.5)
    return {
      classificacao: "Abaixo do peso",
      dica:
        "Procure incluir mais calorias e proteínas saudáveis na sua dieta. Consulte um nutricionista se possível.",
      cor: "#4da6ff",
    };
  else if (imc < 24.9)
    return {
      classificacao: "Peso normal",
      dica:
        "Ótimo! Mantenha uma alimentação equilibrada e pratique atividade física regularmente.",
      cor: "#28c76f",
    };
  else if (imc < 29.9)
    return {
      classificacao: "Sobrepeso",
      dica:
        "Reduza alimentos ultraprocessados, aumente fibras e pratique exercícios.",
      cor: "#ffb020",
    };
  else if (imc < 34.9)
    return {
      classificacao: "Obesidade grau I",
      dica:
        "Considere acompanhamento profissional para ajustar alimentação e exercícios.",
      cor: "#ff8a65",
    };
  else if (imc < 39.9)
    return {
      classificacao: "Obesidade grau II",
      dica: "Procure um médico e nutricionista.",
      cor: "#ff7043",
    };
  else
    return {
      classificacao: "Obesidade grau III (grave)",
      dica: "Acompanhamento médico especializado recomendado.",
      cor: "#ff4d4f",
    };
};

// Função 3 — Validar entradas
export const validarEntradas = (peso, altura) => {
  const pesoNum = parseNumero(peso);
  const alturaNum = parseNumero(altura);

  if (!peso || !altura) return false;
  if (isNaN(pesoNum) || isNaN(alturaNum)) return false;
  if (pesoNum <= 0 || alturaNum <= 0) return false;

  return true;
};

// Função 4 — Formatar resultado
export const formatarResultado = (imc, classificacao) => {
  return `Seu IMC é ${imc} (${classificacao})`;
};
