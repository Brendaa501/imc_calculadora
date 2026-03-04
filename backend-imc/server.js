const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


let resultadosIMC = [];


app.post("/imc", (req, res) => {
  const { peso, altura, imc, classificacao } = req.body;

  if (!peso || !altura || !imc || !classificacao) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  const novoResultado = {
    id: resultadosIMC.length + 1,
    peso,
    altura,
    imc,
    classificacao,
    data: new Date(),
  };

  resultadosIMC.push(novoResultado);

  res.status(201).json({
    mensagem: "IMC salvo com sucesso",
    resultado: novoResultado,
  });
});


app.get("/imc", (req, res) => {
  res.json(resultadosIMC);
});

app.listen(PORT, () => {
  console.log(`API IMC rodando em http://localhost:${PORT}`);
});