function pedirNomeUsuario(){
    let nomeUsuario = prompt("Escolha um nome de Usuário")
    usuario.nome = nomeUsuario
    let promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',{
    name: `${nomeUsuario}` 
}).then(teste)
}

function teste(promisse){
    console.log(promisse);
}



//renderizar mensagens

let mensagens = [];

function buscarDados(){
const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
promessa.then(processarResposta);
}

function processarResposta(resposta) {
	console.log(resposta.data);
    mensagens = resposta.data;
    renderizarMensagens();
}

function renderizarMensagens() {
    const ulMensagens = document.querySelector(".mensagens");
    ulMensagens.innerHTML = "";
    for (let i = 0; i < mensagens.length; i++) {
      ulReceitas.innerHTML += `
          <li onClick='renderizarInformações(${i})'>
          </li>   
      `;
    }
  }

  function renderizarInformações(){

  }
