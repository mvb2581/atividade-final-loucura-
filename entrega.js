const fs = require("fs");
const promptsync = require("prompt-sync")(); // Importando funções e termos da biblioteca node.
const path = require("path");

let nomes = []; // Vetor que armazenará o nome do cliente.
let enderecos = []; // Vetor que armazenará os endereços da entrega.
let distanciasEntregas = []; // Vetor que armazenará a distância da entrega.
let valoresEntregas = []; // Valor cobrado por km na entrega.
let multiplicador = []; // Multiplicador para calcular o valor das entregas.
let valorFinal = []; // valor final das entregas feitas pelo cliente.
let i = 0; // Inicialização da contadora.
let confirmacaoEntregas; // Variável para confirmar a continuidade das entregas.

do {

    let nome, endereco, distanciaEntrega, valorEntrega, tipoEntrega; // Variáveis que irão armazenar uma única informação, enquanto o declarado em cima, foram os vetores.

    do {
        nome = promptsync("Digite o seu nome: "); // Pede ao cliente para digitar o seu nome.
        if (!isNaN(nome) || nome == "") {
            console.log("Inválido! Você não digitou um nome, escreva novamente!"); // Indica se a entrada de informações não foi compatível com o pedido.
        }
    } while (!isNaN(nome) || nome == ""); // Repetição do looping.

    nomes[i] = nome; // Armazena a informação da variável no vetor indicado.

    do {
        endereco = promptsync("Digite o seu endereço, como o seu bairro: "); // Pede ao cliente para digitar o seu endereço.
        if (!isNaN(endereco) || endereco== "") {
            console.log("Inválido! Você não digitou o seu endereço, escreva novamente!"); // Indica se a entrada de informações não foi compatível com o pedido.
        }
    } while (!isNaN(endereco) || endereco == ""); // Repetição do looping.

    enderecos[i] = endereco; // Armazena a informação da variável no vetor indicado.

    do {
        valorEntrega = parseFloat(promptsync("Digite o valor da entrega (por KM): ")); // Pede ao cliente para digitar o valor cobrado por KM.
        if (isNaN(valorEntrega)) {
            console.log("Inválido! Você não digitou um número, escreva novamente!"); // Indica se a entrada de informações não foi compatível com o pedido.
        }
    } while (isNaN(valorEntrega)); // Repetição do looping.

    valoresEntregas[i] = valorEntrega; // Armazena a informação da variável no vetor indicado.

    do {
        distanciaEntrega = parseFloat(promptsync("Digite a distância da entrega (em KM): ")); // Pede para o cliente colocar a distância da entrega.
        if (isNaN(distanciaEntrega)) {
            console.log("Inválido! Você não digitou um número, escreva novamente!"); // Indica se a entrada de informações não foi compatível com o pedido.
        }
    } while (isNaN(distanciaEntrega)); // Repetição do looping.

    distanciasEntregas[i] = distanciaEntrega; // Armazena a informação da variável no vetor indicado.

    do {
        tipoEntrega = parseInt(promptsync("Qual o tipo da sua entrega? Se for normal, digite 1; se for urgente, digite 2: ")); // Pergunta ao usuário se a entrega será normal ou urgente.

        if (tipoEntrega !== 1 && tipoEntrega !== 2) {
            console.log("Inválido! Digite 1 para normal ou 2 para urgente."); // Indica se a entrada de informações não foi compatível com o pedido.
        }
    } while (tipoEntrega !== 1 && tipoEntrega !== 2); // Repetição do looping.

    if (tipoEntrega === 2) {
        multiplicador[i] = 1.2; // Se o usuário digitar 2, a entrega será urgente, então o multiplicador será usado 1.2 para calcular.
    } else {
        multiplicador[i] = 1; // Se o usuário digitar 1, a entrega será normal, então o multiplicador será usado 1 para calcular.
    }

    valorFinal[i] = distanciaEntrega * valorEntrega * multiplicador[i]; // Cáçculo para o valor final.

    console.log("\nResumo da Entrega:"); // Título do que será apresentado ao usuário.
    console.log(`Cliente: ${nomes[i]}`); // Nome do cliente.
    console.log(`Endereço: ${enderecos[i]}`); // endereço do cliente.
    console.log(`Distância: ${distanciaEntrega} km`); // Distância da entrega feita.
    console.log(`Valor por KM: R$ ${valorEntrega.toFixed(2)}`); // Valor cobrado por KM na entrega.
    console.log(`Tipo de Entrega: ${tipoEntrega === 2 ? "Urgente" : "Normal"}`); // Informa para o cliente o tipo de entrega escolhido por ele.
    console.log(`Valor final: R$ ${valorFinal[i].toFixed(2)}\n`); // Valor final da entrega.

    let historico = `Cliente: ${nomes[i]} | Endereço: ${enderecos[i]} | Distância: ${distanciaEntrega} km | Valor por KM: R$ ${valorEntrega.toFixed(2)} | Tipo de Entrega: ${tipoEntrega === 2 ? "Urgente" : "Normal"} | Valor final: R$ ${valorFinal[i].toFixed(2)}\n; // Variável do histórico de informações da entrega.
    fs.appendFileSync(Entregas_feitas.txt, historico)`; // Criação do arquivo de texto com as informações.

    confirmacaoEntregas = promptsync("Você quer continuar as entregas? Se sim, digite um número, se não quer, digite uma letra: "); //Pergunta ao cliente se ele quer parar ou continuar com as entregas.
    i++; // Contadora.

} while (!isNaN(confirmacaoEntregas)); // Repetição do looping.

let somatoriaFinal = 0; // Somatória das entregas.
for (let j = 0; j < i; j++) {
    somatoriaFinal += valorFinal[j]; // somatório total de todas as entregas feitas.
}

if (i > 0) {
    let media = somatoriaFinal / i; // Cálculo para a média das entregas.

    console.log(`\nTotal de entregas: ${i}`); // Título do que será informado.
    console.log(`Custo total das entregas: R$ ${somatoriaFinal.toFixed(2)}`); // Custo total das entregas.
    console.log(`Média de custo por entrega: R$ ${media.toFixed(2)}`); // Média das entregas feitas.

    fs.appendFileSync(`Entregas_feitas.txt, \nTotal de entregas: ${i} | Média de custo por entrega: R$ ${media.toFixed(2)}\n`); // Conteúdo do arquivo de texto.
} else {
    console.log("Nenhuma entrega foi registrada."); // Informa ao cliente se nenhuma entrega foi registrada ou feita.
}