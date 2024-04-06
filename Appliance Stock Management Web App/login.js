let array = ["luis","tpsi0623"];

document.cookie = 'utilizador = '+ array;

let formLogin = document.getElementById('formLogin'); //form de login

formLogin.addEventListener('submit', (event) => {   //Evento de submit do form de login
    event.preventDefault();

    let nomeInput = document.getElementById('nome').value;
    let passwordInput = document.getElementById('password').value;

    //Verifica se algum input está vazio
    if(nomeInput.trim() === '' || passwordInput.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    verificaLogin(nomeInput,passwordInput);     //função de vai validar o login
});

function verificaLogin(nomeInput,passwordInput){ //valida os dados introduzidos no login

    //FUNÇÃO QUE RETORNA O VALOR DE UM COOKIE
    function getCookie(name){

        let cookieArr = document.cookie.split(";");     //cria um vetor que recebe todos os cookies

        for(let i=0; i< cookieArr.length;i++){              //itera o vetor de cookies

            let cookiePair = cookieArr[i].split("=");

            if(name == cookiePair[0].trim()){               //se o nome recebido for igual ao nome do cookie retorna o cookie
                return decodeURIComponent(cookiePair[1]);
            }

        }

        return null;        // se o cookie nao  for encontrado retorna null
    }

    let utilizador = getCookie("utilizador");

    let dados = [];

    dados=utilizador.split(",");

    if(nomeInput === dados[0] && passwordInput === dados[1]){   //se os valores introduzidos forem iguais ao do cookie utilizador


        //MOSTRA O MODEL DE SUCESSO
        const modalSucesso = new bootstrap.Modal('#modalSucesso');
        modalSucesso.show();

        modalSucesso._element.addEventListener('hide.bs.modal', (event) => {
            event.preventDefault();


            //Simula um clique para avançar para a lista de eletrodomesticos
            window.location.href = 'index.html';
        })

        //CRIA O COOKIE TEMPORARIO COM EXPIRAÇÃO DE 8 HORAS
        let expireDate = new Date()
        expireDate.setTime(expireDate.getTime() + (8*60*60*1000)); // 8 horas a partir de agora
        document.cookie = nomeInput+'=' + array + "; expires=" + expireDate.toUTCString(); //adiciona a data de expiração ao cookie
    }

    else{   //Se algo nao correspondeu mostra a mensagem de login Falhado

        alert('Login Errado');

        formLogin.reset();      //limpa o formulário

    }

}



