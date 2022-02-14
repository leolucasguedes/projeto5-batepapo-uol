let chat = document.querySelector("#chat");
let logged = false;

let nomeUsuario = '';
let participants = [];
let messages = [];

let startMessageCount;
let lastMessageLoop = null;
let lastMessageArray = null;


//usuario
function pedirNomeUsuario(){
    nomeUsuario = prompt("Escolha um nome de Usuário");
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v4/uol/participants`,{
     name: `${nomeUsuario}` 
 })
     promisse.then(response => {
         logged = true;
         getParticipants();
         getMessages();
         setInterval(checkIfUserOnline, 5000);
     })
     promisse.catch(error => {
         alert("Esse nome já está em uso, escolha outro ou aguarde.");
         pedirNomeUsuario();
     });
}

pedirNomeUsuario();

//status
function checkIfUserOnline(User) {
    const statusPromisse = axios.post(`https://mock-api.driven.com.br/api/v4/uol/status`, {
        name: `${nomeUsuario}`
})
    statusPromisse.catch(isOffline);
}

function isOffline(error) {
    alert("Usuário offline!");
    pedirNomeUsuario();
}

    getMessages();
    setInterval(getMessages, 3000);


//pegar participantes
function getParticipants() {
    axios.get(`https://mock-api.driven.com.br/api/v4/uol/participants`)
        .then(participants)
}


//pegar mensagem
function getMessages() {
    const promisseMessage = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisseMessage.then(getMessagesOK);
    promisseMessage.catch(didntGetMessages);
}

function getMessagesOK(response) {
    const messages = response.data;
    const containerMessages = document.querySelector(".mensagens");
    startMessageCount = 0;
    lastMessageArray = `${messages[messages.length - 1].from}`;

    if (lastMessageArray !== lastMessageLoop || lastMessageLoop === nomeUsuario) {
        containerMessages.innerHTML = "";
    while(startMessageCount < messages.length) {
    const from = messages[startMessageCount].from;
    const to = messages[startMessageCount].to;
    const text = messages[startMessageCount].text;
    const type = messages[startMessageCount].type;
    const time = messages[startMessageCount].time;
    if (type === "status") {
        containerMessages.innerHTML += `
        <article class="msg-enter-exit ellipsis" data-identifier="message">
        <p><span>
                (${time})
            </span>
            <strong>${from}</strong> ${text}
        </p>
        </article>
        `;
    } else if (type === "message") {
        containerMessages.innerHTML += `
        <article class="msg-all ellipsis" data-identifier="message">
        <p><span>
                (${time})
            </span>
            <strong>${from}</strong> para <strong>${to}</strong>: ${text}
        </p>
        </article>
        `;
    } else if ((type === "private_message" && to === nomeUsuario) || (type === "private_message" && from === nomeUsuario)) {
        containerMessages.innerHTML += `
        <article class="msg-pvt ellipsis" data-identifier="message">
        <p><span>
                (${time})
            </span>
            <strong>${from}</strong> para <strong>${to}</strong>: ${text}
        </p>
        </article>
        `;
    }
    startMessageCount++;
}

const lastElement = document.querySelector("article:last-child");
lastMessageLoop = lastElement.querySelector("strong").innerText;
lastElement.scrollIntoView();
}
}

function didntGetMessages(error) {
console.log(error);
alert("Houve um problema com as mensagens, tente reiniciar");
}

function postMessage() {
    const messagePost = document.querySelector("footer input").value;
    const messageTo = document.querySelector(".usersAll .check").parentNode.querySelector("span").innerHTML;

    const messageVisibility = document.querySelector(".check").parentNode.querySelector("span").innerHTML;
    let messageType;

    if (messageVisibility === "Público") {
        messageType = "message";
    } else if (messageVisibility === "Reservadamente") {
        messageType = "private_message";
    }

    const objectPost = {
        from: username,
        to: messageTo,
        text: messagePost,
        type: messageType
    };

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objectPost);
    promise.then(postMessageOK);
    promise.catch(() => {
        alert("Houve algum erro com a menssagem digitada, tente de novo");
    });
}

function postMessageOK(response) {
    const messagePost = document.querySelector("footer input").value = '';
    getMessages();
}


//menu nav

function aparecerNav(){
    const nav = document.querySelector("nav");
    nav.classList.remove("escondido");
}

function sumirNav(){
    const sumir = document.querySelector("nav");
    sumir.classList.add("escondido");
}

//valeu vini, agr ta formatado direitinho