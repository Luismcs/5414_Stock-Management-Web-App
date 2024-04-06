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
else{   //Senao mostra a mensagem de boas vindas
    let array = utilizador.split(",");
    let elementoSaudacao = document.getElementById('saudacao');

    let saudacao = document.createElement('p');
    saudacao.innerHTML = "Olá " + array[0] + "!";

    elementoSaudacao.appendChild(saudacao);

}

mostarProdutos();

function mostarProdutos(){
    let eletrodomesticos = JSON.parse(localStorage.getItem('eletrodomesticos'));

    setTimeout(() => {      //define um intervalo de tempo para carregar dados


        const listaEletrodomesticos = document.getElementById('listaEletrodomesticos');

        listaEletrodomesticos.getElementsByTagName('tr')[0].remove();     //remove a primeira linha que está criada no html


        if (!Array.isArray(eletrodomesticos) || eletrodomesticos.length === 0) {     //se a lista estiver vazia, aparece uma mensagem

            msgNaoHaDados();

        } else {   //senão mostra todos os eletrodomesticos

            eletrodomesticos.forEach(eletrodomestico => {                   //itera o vetor de eletrodomesticos e mostra os seus dados na tabela

                    //cria todos os elementos necessários
                    let novaLinha = document.createElement('tr');
                    let tdSelect = document.createElement('td');
                    let tdId = document.createElement('td');
                    let tdNome = document.createElement('td');
                    let tdMarca = document.createElement('td');
                    let tdModelo = document.createElement('td');
                    let tdPreco = document.createElement('td');
                    let tdStock = document.createElement('td');
                    let tdAcoes = document.createElement('td');

                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    tdSelect.appendChild(checkbox);

                    //escreve os valores nos elementos
                    tdId.innerHTML = eletrodomestico.id;
                    tdNome.innerHTML = eletrodomestico.nome;
                    tdMarca.innerHTML = eletrodomestico.marca;
                    tdModelo.innerHTML = eletrodomestico.modelo;
                    tdPreco.innerHTML = eletrodomestico.preco;
                    tdStock.innerHTML = eletrodomestico.stock;

                    if(eletrodomestico.stock <= 2){       //se o stock do eletrodomestico for 2 entao o seu texto aparece a vermelho
                        tdStock.style.color = "red";
                    }


                    novaLinha.appendChild(tdSelect);
                    novaLinha.appendChild(tdId);
                    novaLinha.appendChild(tdNome);
                    novaLinha.appendChild(tdMarca);
                    novaLinha.appendChild(tdModelo);
                    novaLinha.appendChild(tdPreco);
                    novaLinha.appendChild(tdStock);
                    novaLinha.appendChild(tdAcoes);

                    //Botão de editar eletrodomestico
                    let editar = document.createElement('a');
                    editar.href = 'editar-eletrodomestico.html?id='+eletrodomestico.id;             //envia o id do eletrodomestico pelo url
                    editar.innerHTML = '<i class="bi bi-pencil"></i> Editar';
                    tdAcoes.appendChild(editar);

                    //Botão de Remover eletrodomestico
                    let eliminar = document.createElement('a');
                    eliminar.href = '#';
                    eliminar.innerHTML = '<i class="bi bi-trash3"></i> Eliminar';
                    tdAcoes.appendChild(eliminar);

                    //ELIMINAR ELETRODOMESTICO
                    eliminar.addEventListener('click', (event) => {
                        event.preventDefault();

                        const index = eletrodomesticos.findIndex((item) => item.id == eletrodomestico.id)

                        eletrodomesticos.splice(index, 1);

                        localStorage.setItem('eletrodomesticos', JSON.stringify(eletrodomesticos));

                        novaLinha.remove();

                        if(eletrodomesticos.length<1){
                            msgNaoHaDados();
                        }

                    });

                    listaEletrodomesticos.appendChild(novaLinha);
                }
            );
        }

    }, 2000)
}



function msgNaoHaDados(){       //Mostra uma mensagem a informar o utilizador que a lista está vazia
    let novaLinha = document.createElement('tr');
    let mensagem = document.createElement('td');

    novaLinha.appendChild(mensagem);
    mensagem.setAttribute('colspan', '8');        //adiciona um atributo para ocupar a linha toda

    mensagem.innerHTML = 'A lista está vazia! Adicione <a href="novo-eledrodomestico.html"> aqui</a>';

    listaEletrodomesticos.appendChild(novaLinha);
}



// ---PESQUISAR UM ELETRODOMESTICO NA LISTA PELO NOME---


let formPesquisaEletrodomestico = document.getElementById('formPesquisaEletrodomestico'); //form de pesquisa de objeto

formPesquisaEletrodomestico.addEventListener('submit', (event) => {                     //evento de pesquisa de objeto
    event.preventDefault();

    let nomeInput = document.getElementById('nome').value;

    //Verifica se algum input está vazio
    if(nomeInput.trim()==="") {
        alert('Por favor, preencha o campo com algum valor.');
        return;
    }

    while (listaEletrodomesticos.getElementsByTagName('tr').length > 0) {   //Limpa a lista
        listaEletrodomesticos.getElementsByTagName('tr')[0].remove();
    }

    mostrarEletrodometico(nomeInput); //função que procura o produto na lista
});

function mostrarEletrodometico(nomeInput) { //Função que vai mostrar o produto na tabela

    let verificaAmostra = false;  //vai ajudar a verificar se algo foi apresentado na lista

    //cria o array de eletrodomesticos
    let eletrodomesticos = [];

    eletrodomesticos = localStorage.getItem('eletrodomesticos') ? JSON.parse(localStorage.getItem('eletrodomesticos')) : [];

    eletrodomesticos.forEach(eletrodomestico => {   //itera a lista de eletrodomesticos

        if (eletrodomestico.nome == nomeInput) { //quando o eletrodomestico tiver o mesmo nome que o utilizador introduziu  mostra as sua informações

            //Cria os elementos necessários
            let novaLinha = document.createElement('tr');
            let tdSelect = document.createElement('td');
            let tdId = document.createElement('td');
            let tdNome = document.createElement('td');
            let tdMarca = document.createElement('td');
            let tdModelo = document.createElement('td');
            let tdPreco = document.createElement('td');
            let tdStock = document.createElement('td');
            let tdAcoes = document.createElement('td');

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            tdSelect.appendChild(checkbox);

            tdId.innerHTML = eletrodomestico.id;
            tdNome.innerHTML = eletrodomestico.nome;
            tdMarca.innerHTML = eletrodomestico.marca;
            tdModelo.innerHTML = eletrodomestico.modelo;
            tdPreco.innerHTML = eletrodomestico.preco;
            tdStock.innerHTML = eletrodomestico.stock;

            if(eletrodomestico.stock <= 2){         //Se o stock do eletrodomestico for 2 entao mostra o valor a vermelho
                tdStock.style.color = "red";
            }


            novaLinha.appendChild(tdSelect);
            novaLinha.appendChild(tdId);
            novaLinha.appendChild(tdNome);
            novaLinha.appendChild(tdMarca);
            novaLinha.appendChild(tdModelo);
            novaLinha.appendChild(tdPreco);
            novaLinha.appendChild(tdStock);
            novaLinha.appendChild(tdAcoes);

            //Botão de editar eletrodomestico
            let editar = document.createElement('a');
            editar.href = 'editar-eletrodomestico.html?id='+eletrodomestico.id;             //envia o id do eletrodomestico pelo url
            editar.innerHTML = '<i class="bi bi-pencil"></i> Editar';
            tdAcoes.appendChild(editar);

            //Botão de Remover eletrodomestico
            let eliminar = document.createElement('a');
            eliminar.href = '#';
            eliminar.innerHTML = '<i class="bi bi-trash3"></i> Eliminar';
            tdAcoes.appendChild(eliminar);

            //ELIMINAR ELETRODOMESTICO
            eliminar.addEventListener('click', (event) => {
                event.preventDefault();

                const index = eletrodomesticos.findIndex((item) => item.id == eletrodomestico.id)

                eletrodomesticos.splice(index, 1);

                localStorage.setItem('eletrodomesticos', JSON.stringify(eletrodomesticos));

                novaLinha.remove();

                if(eletrodomesticos.length<1){
                    msgNaoHaDados();
                }

            });

            verificaAmostra=true;   //se pelo menos um produto for apresentado então a veriavel para a tru
            listaEletrodomesticos.appendChild(novaLinha);   //adiciona a linha com os dados do eletrodomestico á tabela

        }

    });

    //Verifica se algum produto com aquele nome foi encontador

    if(verificaAmostra === false){  //Se não foi encontrado nenhum eletrodomestico, então mostra uma mensagem a informar o utilizador

        let novaLinha = document.createElement('tr');
        let mensagem = document.createElement('td');

        novaLinha.appendChild(mensagem);
        mensagem.setAttribute('colspan', '8');        //adiciona um atributo para ocupar a linha toda

        mensagem.innerHTML = 'Não foram encontrados produtos com esse nome</a>';

        listaEletrodomesticos.appendChild(novaLinha);
    }

}


//--- MOSTRAR TODOS OS OBJETOS DE VOLTA NA LISTA ---

var botaoMostrarEletrodomesticos = document.getElementById("mostrarTudo");

//Evento do botão para voltar a mostrar tudo
botaoMostrarEletrodomesticos.addEventListener("click", function() {

    const listaEletrodomesticos = document.getElementById('listaEletrodomesticos');

    while (listaEletrodomesticos.getElementsByTagName('tr').length > 0) {   //limpa a lista
        listaEletrodomesticos.getElementsByTagName('tr')[0].remove();
    }

    let tbody = document.getElementById('listaEletrodomesticos');

    let novaLinha = document.createElement("tr");
    let mensagem = document.createElement("td");

    mensagem.innerHTML = "A carregar dados";                        //adiciona a mesagem de simulação de carregamento de dados
    mensagem.setAttribute('colspan', '8');        //adiciona um atributo para ocupar a linha toda


    novaLinha.appendChild(mensagem);
    tbody.appendChild(novaLinha);                                   //adiciona a mensagem á lista

    mostarProdutos();                                               //mostra todos os produtos na tabela
});



//--- MOSTRAR ELETRODOMESTICOS ORDENADOS POR STOCK ---


var botaoOrdenarStock = document.getElementById("ordenarStock");

//Evento do botão para voltar a mostrar tudo
botaoOrdenarStock.addEventListener("click", function() {

    const listaEletrodomesticos = document.getElementById('listaEletrodomesticos');

    while (listaEletrodomesticos.getElementsByTagName('tr').length > 0) {   //limpa a lista
        listaEletrodomesticos.getElementsByTagName('tr')[0].remove();
    }

    let tbody = document.getElementById('listaEletrodomesticos');

    let novaLinha = document.createElement("tr");
    let mensagem = document.createElement("td");

    mensagem.innerHTML = "A carregar dados";                        //adiciona a mesagem de simulação de carregamento de dados
    mensagem.setAttribute('colspan', '8');        //adiciona um atributo para ocupar a linha toda


    novaLinha.appendChild(mensagem);
    tbody.appendChild(novaLinha);                                   //adiciona a mensagem á lista

    mostrarProdutosOrdenados();                                               //mostra todos os produtos na tabela
});

function mostrarProdutosOrdenados(){

    let eletrodomesticos = JSON.parse(localStorage.getItem('eletrodomesticos'));

    //Se "a" for menor que "b" retorna negativo e "a" vem primeiro que "b"
    //Senão se "b" for menor que "a" retorna positivo dizendo que "b" vem primeiro que "a"
    //Se forem iguais nao acontece nada
    eletrodomesticos.sort((a, b) => a.stock - b.stock); //Ordena os eletrodomesticos por stock

    const listaEletrodomesticos = document.getElementById('listaEletrodomesticos');

        listaEletrodomesticos.getElementsByTagName('tr')[0].remove();     //remove a primeira linha que está criada no html


        if (!Array.isArray(eletrodomesticos) || eletrodomesticos.length === 0) {     //se a lista estiver vazia, aparece uma mensagem

            msgNaoHaDados();

        } else {   //senão mostra todos os eletrodomesticos

            eletrodomesticos.forEach(eletrodomestico => {                   //itera o vetor de eletrodomesticos e mostra os seus dados na tabela

                    //cria todos os elementos necessários
                    let novaLinha = document.createElement('tr');
                    let tdSelect = document.createElement('td');
                    let tdId = document.createElement('td');
                    let tdNome = document.createElement('td');
                    let tdMarca = document.createElement('td');
                    let tdModelo = document.createElement('td');
                    let tdPreco = document.createElement('td');
                    let tdStock = document.createElement('td');
                    let tdAcoes = document.createElement('td');

                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    tdSelect.appendChild(checkbox);

                    //escreve os valores nos elementos
                    tdId.innerHTML = eletrodomestico.id;
                    tdNome.innerHTML = eletrodomestico.nome;
                    tdMarca.innerHTML = eletrodomestico.marca;
                    tdModelo.innerHTML = eletrodomestico.modelo;
                    tdPreco.innerHTML = eletrodomestico.preco;
                    tdStock.innerHTML = eletrodomestico.stock;

                    if(eletrodomestico.stock <= 2){       //se o stock do eletrodomestico for 2 entao o seu texto aparece a vermelho
                        tdStock.style.color = "red";
                    }

                    novaLinha.appendChild(tdSelect);
                    novaLinha.appendChild(tdId);
                    novaLinha.appendChild(tdNome);
                    novaLinha.appendChild(tdMarca);
                    novaLinha.appendChild(tdModelo);
                    novaLinha.appendChild(tdPreco);
                    novaLinha.appendChild(tdStock);
                    novaLinha.appendChild(tdAcoes);

                    //Botão de editar eletrodomestico
                    let editar = document.createElement('a');
                    editar.href = 'editar-eletrodomestico.html?id='+eletrodomestico.id;             //envia o id do eletrodomestico pelo url
                    editar.innerHTML = '<i class="bi bi-pencil"></i> Editar';
                    tdAcoes.appendChild(editar);

                    //Botão de Remover eletrodomestico
                    let eliminar = document.createElement('a');
                    eliminar.href = '#';
                    eliminar.innerHTML = '<i class="bi bi-trash3"></i> Eliminar';
                    tdAcoes.appendChild(eliminar);

                    //ELIMINAR ELETRODOMESTICO
                    eliminar.addEventListener('click', (event) => {
                        event.preventDefault();

                        const index = eletrodomesticos.findIndex((item) => item.id == eletrodomestico.id)

                        eletrodomesticos.splice(index, 1);

                        localStorage.setItem('eletrodomesticos', JSON.stringify(eletrodomesticos));

                        novaLinha.remove();

                        if(eletrodomesticos.length<1){
                            msgNaoHaDados();
                        }

                    });

                    listaEletrodomesticos.appendChild(novaLinha);
                }
            );
        }
}
