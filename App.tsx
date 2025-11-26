import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState("");
  const [dica, setDica] = useState("");
  const [diferencaPeso, setDiferencaPeso] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [corClassificacao, setCorClassificacao] = useState("#6b5bff");

  // Calcula quanto precisa ganhar/perder (usa IMC 18.5 e 24.9)
  const calcularDiferencaPeso = (pesoAtual, alturaMetros, imcValor) => {
    const pesoMin = 18.5 * alturaMetros * alturaMetros;
    const pesoMax = 24.9 * alturaMetros * alturaMetros;

    if (imcValor < 18.5) {
      const ganhar = pesoMin - pesoAtual;
      return {
        mensagem: `Você precisa ganhar pelo menos ${ganhar.toFixed(1)} kg para atingir IMC 18.5.`,
        diferenca: ganhar,
      };
    }

    if (imcValor > 24.9) {
      const perder = pesoAtual - pesoMax;
      return {
        mensagem: `Você precisa perder pelo menos ${perder.toFixed(1)} kg para atingir IMC 24.9.`,
        diferenca: perder,
      };
    }

    return { mensagem: "Você está no peso ideal!", diferenca: 0 };
  };

  // Gera classificação / dica / cor
  const gerarClassificacaoEDica = (valorIMC) => {
    if (valorIMC < 18.5)
      return {
        classificacao: "Abaixo do peso",
        dica:
          "Procure incluir mais calorias e proteínas saudáveis na sua dieta. Consulte um nutricionista se possível.",
        cor: "#4da6ff",
      };
    else if (valorIMC < 24.9)
      return {
        classificacao: "Peso normal",
        dica:
          "Ótimo! Mantenha uma alimentação equilibrada e pratique atividade física regularmente.",
        cor: "#28c76f",
      };
    else if (valorIMC < 29.9)
      return {
        classificacao: "Sobrepeso",
        dica:
          "Reduza alimentos ultraprocessados, aumente fibras e pratique exercícios. Pequenas mudanças já ajudam.",
        cor: "#ffb020",
      };
    else if (valorIMC < 34.9)
      return {
        classificacao: "Obesidade grau I",
        dica:
          "Considere acompanhamento profissional para ajustar alimentação e rotina de exercícios.",
        cor: "#ff8a65",
      };
    else if (valorIMC < 39.9)
      return {
        classificacao: "Obesidade grau II",
        dica:
          "Procure um médico e um nutricionista para acompanhamento individualizado.",
        cor: "#ff7043",
      };
    else
      return {
        classificacao: "Obesidade grau III (grave)",
        dica:
          "Acompanhamento médico especializado recomendado. Busque suporte de profissionais.",
        cor: "#ff4d4f",
      };
  };

  const validarENotificar = (tipo, mensagem) => {
    // tipo: "info" | "error" | "success"
    Toast.show({ type: tipo, text1: mensagem });
  };

  const calcularIMC = () => {
    // aceita vírgula como separador
    let pesoNum = parseFloat(peso.replace(",", "."));
    let alturaNum = parseFloat(altura.replace(",", "."));

    // campos vazios
    if (!peso || !altura) {
      validarENotificar("info", "Preencha todos os campos!");
      return;
    }

    // número inválido
    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      validarENotificar("error", "Digite apenas números válidos!");
      return;
    }

    // valores maiores que zero
    if (pesoNum <= 0) {
      validarENotificar("error", "O peso precisa ser maior que zero!");
      return;
    }
    if (alturaNum <= 0) {
      validarENotificar("error", "A altura precisa ser maior que zero!");
      return;
    }

    // Se usuário informar altura em centímetros (ex: 170), converte para metros.
    // Heurística simples: se altura >= 3 assume que foi informada em cm (170 -> 1.70)
    // Se já informada em metros (1.70) e <= 3, mantemos.
    if (alturaNum > 3) {
      // recebeu cm -> converte
      alturaNum = alturaNum / 100;
    }

    // Limite máximo de altura em metros (3m)
    if (alturaNum > 3) {
      validarENotificar("error", "A altura máxima permitida é de 3 metros!");
      return;
    }

    // cálculo do IMC
    const valorIMC = pesoNum / (alturaNum * alturaNum);

    if (!isFinite(valorIMC) || isNaN(valorIMC)) {
      validarENotificar("error", "Não foi possível calcular o IMC com esses valores.");
      return;
    }

    const imcFormatado = valorIMC.toFixed(2);
    const { classificacao, dica, cor } = gerarClassificacaoEDica(valorIMC);
    const diff = calcularDiferencaPeso(pesoNum, alturaNum, valorIMC);

    setImc(imcFormatado);
    setClassificacao(classificacao);
    setDica(dica);
    setDiferencaPeso(diff.mensagem);
    setCorClassificacao(cor);
    setModalVisible(true);
  };

  const tabela = [
    { faixa: "Menor que 18.5", nome: "Abaixo do peso" },
    { faixa: "18.5 - 24.9", nome: "Peso normal" },
    { faixa: "25 - 29.9", nome: "Sobrepeso" },
    { faixa: "30 - 34.9", nome: "Obesidade grau I" },
    { faixa: "35 - 39.9", nome: "Obesidade grau II" },
    { faixa: "40 ou mais", nome: "Obesidade grau III" },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>HappyBody</Text>
        <Text style={styles.sub}>Calculadora de IMC</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 68.5 (use vírgula ou ponto)"
            placeholderTextColor="#bdbdbd"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />

          <Text style={styles.label}>Altura</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 170 (cm) ou 1.70 (m)"
            placeholderTextColor="#bdbdbd"
            keyboardType="numeric"
            value={altura}
            onChangeText={setAltura}
          />

          <TouchableOpacity style={styles.button} onPress={calcularIMC}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de resultado */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <ScrollView contentContainerStyle={styles.modalContent}>
                <View style={styles.header}>
                  <View style={[styles.badge, { backgroundColor: corClassificacao }]} />
                  <Text style={styles.modalTitle}>Resultado</Text>
                </View>

                <Text style={styles.imcText}>Seu IMC: <Text style={styles.imcNumber}>{imc}</Text></Text>

                <Text style={[styles.classText, { color: corClassificacao }]}>
                  {classificacao}
                </Text>

                <Text style={styles.diffText}>{diferencaPeso}</Text>

                <Text style={styles.helpText}>{dica}</Text>

                <View style={styles.table}>
                  {tabela.map((row, idx) => {
                    const isActive = row.nome === classificacao;
                    return (
                      <View
                        key={idx}
                        style={[
                          styles.tableRow,
                          isActive ? styles.rowActive : null,
                        ]}
                      >
                        <Text style={[styles.tableCell, isActive && styles.activeText]}>{row.faixa}</Text>
                        <Text style={[styles.tableCell, isActive && styles.activeText]}>{row.nome}</Text>
                      </View>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Toast />
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilos modernos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7ff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  logo: {
    fontSize: 34,
    fontWeight: "800",
    color: "#5a40ff",
    letterSpacing: 0.5,
  },

  sub: {
    fontSize: 16,
    color: "#6b6f82",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#2b2b2b",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 6,
  },

  label: {
    color: "#6b6f82",
    marginBottom: 6,
    marginLeft: 6,
    fontSize: 13,
  },

  input: {
    backgroundColor: "#f7f8ff",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef0ff",
  },

  button: {
    marginTop: 6,
    backgroundColor: "#5a40ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5a40ff",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(12, 12, 20, 0.45)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    maxHeight: "85%",
  },

  modalContent: {
    alignItems: "center",
    paddingBottom: 12,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  badge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  imcText: {
    fontSize: 18,
    marginTop: 6,
    color: "#444",
  },

  imcNumber: {
    fontWeight: "800",
    color: "#111",
    fontSize: 18,
  },

  classText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },

  diffText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
    textAlign: "center",
  },

  helpText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 12,
    paddingHorizontal: 6,
  },

  table: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eef0ff",
    marginTop: 8,
    marginBottom: 14,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },

  rowActive: {
    backgroundColor: "#f6f0ff",
  },

  tableCell: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },

  activeText: {
    fontWeight: "800",
    color: "#5a40ff",
  },

  closeButton: {
    backgroundColor: "#5a40ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: "center",
  },

  closeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
