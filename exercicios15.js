/*
  Não altere nada ABAIXO disso até o próximo comentário;

  -- Este código permite que tenhamos uma 
  -- experiência interativa com o usuário;
  -- Não é necessário entendê-lo neste momento.
*/
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
  Não altere nada ACIMA deste comentário;;
*/
const chalk = require('chalk');

const produtos = [{
  nome: 'feijão',
  quantidade: 30,
  preco: 500
},
{
  nome: 'arroz',
  quantidade: 15,
  preco: 600
},
{
  nome: 'farinha',
  quantidade: 50,
  preco: 800
},
{
  nome: 'macarrão',
  quantidade: 20,
  preco: 1000
}];   

const fazerpergunta = ()=>{
  rl.question('Qual produto você gostaria? Para encerrar digite: "sair"', (resposta) =>{
    if(resposta === 'sair'){
      rl.close();
    } else{ 
    consulta(resposta);
      }
  });
}

function consulta(resposta){
  let disponibiidade = false;
  let quantidadeProdutoRequerido = '';
  let produtoRequerido = '';

  for(let i = 0; i < produtos.length; i++){
    if(produtos[i].nome === resposta){
      disponibiidade = true;
      quantidadeProdutoRequerido = produtos[i].quantidade;
      produtoRequerido = produtos[i];
    } 
  } if (disponibiidade === true){
    console.log(`Yay! Temos seu produto ${chalk.green(resposta)}!`);
    quantidade(resposta, quantidadeProdutoRequerido, produtoRequerido);
    } else{
      console.log(`Infelizmente não temos ${chalk.red(resposta)} em nosso estoque...`)
      fazerpergunta();
    }
}

function quantidade (resposta, quantidadeProdutoRequerido, produtoRequerido){
  rl.question(`Qual a quantidade de ${chalk.green(resposta)} que você gostaria?`, (quantidade)=>{
    if (quantidadeProdutoRequerido >= quantidade){
      console.log(`Perfeito! separamos ${chalk.green(quantidade)} do produto ${chalk.green(resposta)} para você!`);
      pagamento(quantidade, produtoRequerido);
    } else{
      quantidadeAMenos(resposta, quantidadeProdutoRequerido, produtoRequerido);
    }
  });
}

function quantidadeAMenos(resposta, quantidadeProdutoRequerido, produtoRequerido){
  rl.question(`Poxa... só temos ${chalk.red(quantidadeProdutoRequerido)} unidade(s) do produto ${chalk.green(resposta)} em estoque... Você vai querer essa quantidade? responda 's' para sim.`, (simOuNao)=>{
    if(simOuNao === 's'){
      console.log(`Perfeito! separamos ${chalk.green(quantidadeProdutoRequerido)} unidade(s) do produto ${chalk.green(resposta)} para você!`);
      pagamento(quantidadeProdutoRequerido, produtoRequerido);
    } else{
      console.log('Até a próxima!');
    }
    rl.close();
  });
}

function pagamento(quantidade, produtoRequerido){
  const valor = (produtoRequerido.preco * quantidade)/100
  rl.question(`O valor da sua compra é de R$${valor},00. Gostaria de fazer o pagamento agora?`, (resposta)=>{
    if (resposta === 's'){
      console.log(`Compra realizada. Muito obrigado.`)
    } else{
      rl.close();
    }
    rl.close();
  });
}

fazerpergunta();