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

//VERIFICA SE O COOKIE DO UTILIZADOR EXISTE

let utilizador = getCookie("luis");

if(!utilizador){    //se não existir retorna para o login
    window.location.href = 'login.html';
}


let formNovoEletrodomestico = document.getElementById('formNovoEletrodomestico'); //form que cria uma novo eletrodomestico

formNovoEletrodomestico.addEventListener('submit', (event) => {

    event.preventDefault();

    //Recebe os valores introduzidos pelo utilizador
    let nomeInput = document.getElementById('nome').value;
    let marcaInput = document.getElementById('marca').value;
    let modeloInput = document.getElementById('modelo').value;
    let precoInput = document.getElementById('preco').value;
    let stockInput = document.getElementById('stock').value;


    //VALIDAÇÕES FORMATO DE PREÇO E STOCK
    if(isNaN(parseFloat(precoInput))){  //verifica se o preco é um número
        alert('Introduza um valor válido no preço do produto');
        return;
    }

    if(isNaN(parseFloat(stockInput))){  //verifica se o stock é um número
        alert('Introduza um valor válido no stock do produto');
        return;
    }

    addEletrodomestico(nomeInput,marcaInput,modeloInput,precoInput,stockInput); //função de criação de eletrodoméstico
});

function addEletrodomestico(nomeInput,marcaInput,modeloInput,precoInput,stockInput){ //adiciona um eletrodomestico ao localStorage

    //cria o array de eletrodomesticos
    let eletrodomesticos = [];

    eletrodomesticos = localStorage.getItem('eletrodomesticos') ? JSON.parse(localStorage.getItem('eletrodomesticos')) : [];

    //encontra o maior id da lista de eletrodomesticos
    const maxID = eletrodomesticos.reduce(            //encontra o maior Id
        (max, item) => (max.id || 0) > (item.id || 0) ? max : item,
        { id: 0 }
    );

    let novoEletrodomestico = {                 //adiciona todos os registos introduzidos pelo utilizador ao objeto novoEletrodomestico
        id: parseFloat(maxID.id)+1,
        nome: nomeInput,
        marca: marcaInput,
        modelo: modeloInput,
        preco: precoInput,
        stock: stockInput,
    }

    eletrodomesticos.push(novoEletrodomestico);             //adiciona o novo eletrodomestico ao array

    localStorage.setItem('eletrodomesticos', JSON.stringify(eletrodomesticos)); // Atualiza o vetor eletrodomesticos guardado em localStorage

    formNovoEletrodomestico.reset();      //limpa o formulário


    //MOSTRA O MODAL
    const modalSucesso = new bootstrap.Modal('#modalSucesso');
    modalSucesso.show();
}
