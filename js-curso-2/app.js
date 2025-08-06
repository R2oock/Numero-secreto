let listaDeNumerosEscolhidos = [];
let LimeteTentativas = 10;  
document.querySelector('input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
    verificarChute();
    }
});

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, mensagem){
    let texto = document.querySelector(tag);
    texto.innerHTML = mensagem;
   if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(mensagem);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.3; // Velocidade da fala
        utterance.pitch = 1; // Tom da fala
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemJogoInicio() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Descubra o número secreto entre 1 e 10');
 }

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * LimeteTentativas + 1);
    let quantidadeNumerosEscolhidos = listaDeNumerosEscolhidos.length;
    if (quantidadeNumerosEscolhidos == LimeteTentativas) {
        listaDeNumerosEscolhidos = [];
    }
    if (listaDeNumerosEscolhidos.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaDeNumerosEscolhidos.push(numeroEscolhido);
        return numeroEscolhido;
    }  
}

function limparcampo(){
    let campo = document.querySelector('input');    
    campo.value = '';
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto ) {
        exibirTexto('h1', "Acertou");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`; 
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
        reiniciarJogo;
        //document.getElementById('reiniciar').disabled = false; // Habilita o botão de reiniciar 
    }
    else {
        if(chute < numeroSecreto){
            exibirTexto('h1', "Errou, Tente novamente.");
            exibirTexto('p', 'O número secreto é maior! ');      
        }
        else {
            exibirTexto('h1',  "Errou, Tente novamente.");
            exibirTexto('p', 'O número secreto é Menor! ');
        }
        tentativas++;
        limparcampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparcampo();
    mensagemJogoInicio();
    //document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar
    document.getElementById('reiniciar').disabled = true; // Desabilita o botão de reiniciar
    
}
mensagemJogoInicio(); 
console.log(chute);