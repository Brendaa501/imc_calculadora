import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState("");
  const [dica, setDica] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [corClassificacao, setCorClassificacao] = useState("#4CAF50"); // cor padrão (verde)

  const calcularIMC = () => {
    let pesoNum = parseFloat(peso.replace(",", "."));
    let alturaNum = parseFloat(altura.replace(",", "."));

    if (!peso || !altura) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      toast.error("Digite apenas números válidos!");
      return;
    }

    if (pesoNum <= 0) {
      toast.error("O peso precisa ser maior que zero!");
      return;
    }

    if (alturaNum <= 0) {
      toast.error("A altura precisa ser maior que zero!");
      return;
    }

    // Altura informada em centímetros → converte para metros
    alturaNum = alturaNum / 100;

    if (alturaNum > 3) {
      toast.error("A altura máxima permitida é de 3 metros!");
      return;
    }

    const valorIMC = pesoNum / (alturaNum * alturaNum);
    const imcFormatado = valorIMC.toFixed(2);
    const { classificacao, dica, cor } = gerarClassificacaoEDica(valorIMC);

    setImc(imcFormatado);
    setClassificacao(classificacao);
    setDica(dica);
    setCorClassificacao(cor);
    setModalVisible(true);
  };

  const gerarClassificacaoEDica = (imc) => {
    if (imc < 18.5)
      return {
        classificacao: "Abaixo do peso",
        dica:
          "Procure incluir mais calorias e proteínas saudáveis na sua dieta. Consulte um nutricionista.",
        cor: "#2196F3", // azul
      };
    else if (imc < 24.9)
      return {
        classificacao: "Peso normal",
        dica:
          "Continue mantendo uma alimentação equilibrada e pratique atividades físicas regularmente!",
        cor: "#4CAF50", // verde
      };
    else if (imc < 29.9)
      return {
        classificacao: "Sobrepeso",
        dica:
          "Evite alimentos ultraprocessados e inclua mais frutas e verduras. Pequenas mudanças ajudam!",
        cor: "#FFC107", // amarelo
      };
    else if (imc < 34.9)
      return {
        classificacao: "Obesidade grau I",
        dica:
          "Busque acompanhamento profissional para ajustar sua alimentação e rotina de exercícios.",
        cor: "#FF9800", // laranja
      };
    else if (imc < 39.9)
      return {
        classificacao: "Obesidade grau II",
        dica:
          "É importante procurar um endocrinologista e adotar hábitos saudáveis de forma orientada.",
        cor: "#FF5722", // laranja escuro
      };
    else
      return {
        classificacao: "Obesidade grau III (grave)",
        dica:
          "Cuide-se com ajuda médica especializada. Pequenos passos diários podem gerar grandes resultados.",
        cor: "#f44336", // vermelho
      };
  };

  return (
    <View style={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />

      <Text style={styles.titulo}>HappyBody</Text>

      <Text style={styles.subtitulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua altura (cm)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.resultado}>Seu IMC é {imc}</Text>
            <Text
              style={[styles.classificacao, { color: corClassificacao }]}
            >
              {classificacao}
            </Text>
            <Text style={styles.dica}>{dica}</Text>

            <TouchableOpacity
              style={styles.fecharBotao}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6bebe79",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ca6060ff",
  },
    subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#e28a8aff",
  },

  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  botao: {
    backgroundColor: "#ca6060ff",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    width: "60%",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalConteudo: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    elevation: 5,
  },
  resultado: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  classificacao: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dica: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  fecharBotao: {
    backgroundColor: "#ca6060ff",
    padding: 10,
    borderRadius: 10,
  },
  textoFechar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
