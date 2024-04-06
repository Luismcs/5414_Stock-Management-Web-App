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



let url = new URL(window.location.href);
let formEditarEletrodomestico = document.getElementById('formEditarEletrodomestico'); //form que edita um objeto
let eletrodomesticoEdit;


//Se o id que for passado for um número maior que 0
if(
    url.searchParams.has('id') &&
    url.searchParams.get('id') &&
    Number(url.searchParams.get('id'))&&
    Number(url.searchParams.get('id'))>0){  //valida se o id do eletrodomestico é valido

    let eletrodomesticos = JSON.parse(localStorage.getItem('eletrodomesticos'));

    let eletrodomestico = eletrodomesticos.find((item) => item.id == Number(url.searchParams.get('id')));   //posicao do eletrodomestico no vetor

    if(!eletrodomestico){     //se o eletrodomestico não existir mostra a mensagem que não existe
        mensagem();
    }
    else{           //senão mostra os dados do eletrodomestico

        //Mostra os dados do eletrodomestico no ecrã
        let inputNome = document.getElementById('nome');
        inputNome.value = eletrodomestico.nome;
        let inputMarca = document.getElementById('marca');
        inputMarca.value = eletrodomestico.marca;
        let inputModelo = document.getElementById('modelo');
        inputModelo.value = eletrodomestico.modelo;
        let inputPreco = document.getElementById('preco');
        inputPreco.value = eletrodomestico.preco;
        let inputStock = document.getElementById('stock');
        inputStock.value = eletrodomestico.stock;

        eletrodomesticoEdit=eletrodomestico;

    }

}
else{           //Senão, se o id do eletrodomestico for inválido

    //Remove a tabela e mostra uma mensagem para voltar para a lista de eletrodomesticos

    formEditarEletrodomestico.remove();

    const main = document.querySelector('.conteudo main');

    let message = document.createElement('p');
    message.innerHTML = 'Eletrodomestico não existe! <a href="index.html"> Clique para voltar para a lista de eletrodomesticos </a>';

    main.appendChild(message);

}

formEditarEletrodomestico.addEventListener('submit', (event) => {
    event.preventDefault();

    editEletrodomestico(eletrodomesticoEdit);   //Função de editar eletrodoméstico
});



function editEletrodomestico(eletrodomesticoEdit){ //adiciona um eletrodomestico ao localStorage

    //cria o array de eletrodomestico
    let eletrodomesticos = [];

    //vai buscar os inputs do utilizador
    let inputNome = document.getElementById('nome');
    let inputMarca = document.getElementById('marca');
    let inputModelo = document.getElementById('modelo');
    let inputPreco = document.getElementById('preco');
    let inputStock = document.getElementById('stock');

    // Verifica se algum campo está vazio após o trim
    if (inputNome.value.trim() === "" ||
        inputMarca.value.trim() === "" ||
        inputModelo.value.trim() === "" ||
        inputPreco.value.trim() === "" ||
        inputStock.value.trim() === "") {

        alert('Existem campos vazios. Por favor preencha com algum dado');
        return;
    }


    //VALIDAÇÕES FORMATO DE PREÇO E STOCK
    if(isNaN(parseFloat(inputPreco.value))){  //verifica se o preco é um número
        alert('Introduza um valor válido no preço do produto');
        return;
    }

    if(isNaN(parseFloat(inputStock.value))){  //verifica se o stock é um número
        alert('Introduza um valor válido no stock do produto');
        return;
    }

    eletrodomesticos = localStorage.getItem('eletrodomesticos') ? JSON.parse(localStorage.getItem('eletrodomesticos')) : [];

    //Percorre o vetor de eletrodomestico

    eletrodomesticos.forEach(eletrodomestico => {

        if(eletrodomestico.id==eletrodomesticoEdit.id){ //quando o eletrodomestic tiver o mesmo id que o eletrodomestic a editar

            //Altera os seus valores para os que o utilizador introduzir
            eletrodomestico.nome = inputNome.value;
            eletrodomestico.marca = inputMarca.value;
            eletrodomestico.modelo = inputModelo.value;
            eletrodomestico.preco = inputPreco.value;
            eletrodomestico.stock = inputStock.value;

            localStorage.setItem('eletrodomesticos', JSON.stringify(eletrodomesticos)); //Atualiza o vetor em LocalStorage

            //Mostrar o modal
            const modalSucesso = new bootstrap.Modal('#modalSucessoEdit');
            modalSucesso.show();

            modalSucesso._element.addEventListener('hide.bs.modal', (event) => {
                event.preventDefault();


                //Simula um clique para voltar para a lista de eletrodomesticos
                window.location.href = 'index.html';
            })

        }

    });

}

function mensagem(){
//Remove a tabela e mostra uma mensagem para voltar para a lista de eletrodomesticos

    formEditarEletrodomestico.remove();

    const main = document.querySelector('.conteudo main');

    let message = document.createElement('p');
    message.innerHTML = 'Eletrodomestico não existe! <a href="index.html"> Clique para voltar para a lista de eletrodomesticos </a>';

    main.appendChild(message);

}

