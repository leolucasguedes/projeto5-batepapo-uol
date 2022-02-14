let chat = document.querySelector("#chat");
let logged = false;

let nomeUsuario;
let participants = [];
let messages = [];

let startMessageCount;
let lastMessageLoop = null;
let lastMessageArray = null;


//usuario
function pedirNomeUsuario(){
    let nomeUsuario = prompt("Escolha um nome de Usuário");
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v4/uol/participants`,{
     name: `${nomeUsuario}` 
 })
     promisse.then(response => {
         logged = true;
         getParticipants();
         getMessages();
     })
     promisse.catch(error => {
         alert("Esse nome já está em uso, escolha outro ou aguarde.");
         pedirNomeUsuario();
     });
}

pedirNomeUsuario();


//menu nav

function aparecerNav(){
    const nav = document.querySelector("nav");
    nav.classList.remove("escondido");
}

function sumirNav(){
    const sumir = document.querySelector("nav");
    sumir.classList.add("escondido");
}
