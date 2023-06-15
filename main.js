//Inicio Ex 1

const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const login = document.querySelector('#login');

function preencherCampoLogin(){
    login.value = `${nome.value.toLowerCase().trim()}.${sobrenome.value.toLowerCase().trim()}`;
}
nome.addEventListener("keyup", () => {
    preencherCampoLogin();
  });

sobrenome.addEventListener("keyup", () => {
    preencherCampoLogin();
  });

//Fim Ex 1

//Inicio Ex2

const api = 'https://viacep.com.br/ws/';
const cep = document.querySelector('#cep');

const endereco = document.querySelector('#endereco');
const complemento = document.querySelector('#complemento');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const div_erro_cep = document.querySelector('#cep-erro');

const obterDadosEndereco = async () => {

  const url_api = api + cep.value + '/json';
  try {
    const resposta = await fetch(url_api);
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    div_erro_cep.classList.remove('d-none');
    div_erro_cep.classList.add('d-block');
    console.error('Erro ao obter os dados do endereço:', erro);
    return null;
  }
};

function desabilitarCamposEndereco(){
    endereco.disabled = true;
    bairro.disabled = true;
    cidade.disabled = true;
    complemento.disabled = true;
    estado.disabled = true;
}

function limparCamposEndereco(){
    endereco.value = "";
    bairro.value = "";
    cidade.value = "";
    complemento.value = "";
    complemento.disabled = true;
    estado.value = "";
}

function preencherDadosEndereco() {
  limparCamposEndereco();
  obterDadosEndereco().then(dados => {
      if (dados) {
        div_erro_cep.classList.remove('d-block');
        div_erro_cep.classList.add('d-none');
        endereco.value = dados.logradouro;
        complemento.value = dados.complemento;
        complemento.disabled = false;
        bairro.value = dados.bairro;
        cidade.value = dados.localidade;
        estado.value = dados.uf;
      }
    });
}

cep.addEventListener('change', () => {
  preencherDadosEndereco();
});

//Fim Ex2

//Inicio Ex3

const tabela_dados = document.querySelector('#tabela-dados');
const formulario = document.querySelector('#formulario');
const quantidadeTH = tabela_dados.querySelectorAll('th').length - 1;
const quantidadeInputs = formulario.querySelectorAll('input').length;
const quantidadeSelects = formulario.querySelectorAll('select').length;

desabilitarCamposEndereco();

function demonstrarTabelaDados(){
    tabela_dados.classList.remove('d-none');
    tabela_dados.classList.add('d-block');
}

const lista = [];

const obterItensFormulario = (lista) => {
  let valor_campo = '';
  for(let i = 0; i < quantidadeTH; i++){
    if(document.getElementsByClassName('item_formulario')[i].type == 'radio'){
      if(document.getElementsByClassName('item_formulario')[i].checked){
        valor_campo = 'Receber notificações por e-mail';
      }else{
        valor_campo = 'Não receber notificações por e-mail';
      }
    }else{
      valor_campo = document.getElementsByClassName('item_formulario')[i].value;
    }
    lista.push(valor_campo);
  }
  return lista;
}


function preencherDadosNaTabela(lista){

  lista = [];

  lista = obterItensFormulario(lista);

  for(let i = 0; i < quantidadeTH; i++){

    if(lista[i] == 'java' || lista[i] == 'dot-net'){
      lista[i] = tratarItemListaAcademia(lista[i]);
    }
    if(lista[i] > 0 && lista[i] < 7){
      lista[i] = tratarItemListaProfessor(lista[i]);
    }
    if(lista[i] == 'on'){
      lista[i] = 'Aceito';
    }

    document.getElementsByTagName('td')[i].innerHTML = lista[i];
  }
}

function validarPreenchimentoCamposRequeridos(){

  const nome = document.querySelector('#nome').value;
  const sobre_nome = document.querySelector('#sobrenome').value;
  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;
  const github = document.querySelector('#github').value;
  const academia = document.querySelector('#academia').value;
  const professor = document.querySelector('#professor').value;

  let arrayInfos = [nome, sobre_nome, email, senha, github, academia, professor];

  const aceite = document.querySelector('#termos').checked;

  let campos_preenchidos = false;

  if(aceite == false){
    return false;
  }else{
    for(let i = 0; i < arrayInfos.length; i++){
      if(arrayInfos[i] == ""){
        return false;
      }else{
        campos_preenchidos = true;
      }
    }
  }

  return campos_preenchidos;
}

document.querySelector('button').addEventListener("click", (event) => {
  
  const dadosPreenchidos = validarPreenchimentoCamposRequeridos();

  if(dadosPreenchidos){
    demonstrarTabelaDados();
    event.preventDefault();
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    atribuirClasseEmElementosForm();
    preencherDadosNaTabela(lista);
    limparCamposFormulario();
    alert('Formulário enviado com sucesso!')
  }else{
    alert('É necessário preencher os campos obrigatórios e concordar com os termos legais');
  }
});

  function atribuirClasseEmElementosForm(){

    for(let i = 0; i < quantidadeInputs ; i++){
      document.querySelectorAll('input')[i].classList.add('item_formulario');
    }

    for(let i = 0; i < quantidadeSelects ; i++){
      document.querySelectorAll('select')[i].classList.add('item_formulario');
    }

  }

  let inputs = document.querySelectorAll('input');

  inputs.forEach(input => {
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});

  function desabilitarCampoTermosLegais(){
    document.querySelector('textarea').disabled = true;
  }

  desabilitarCampoTermosLegais();


  function tratarItemListaAcademia(valor){
    return valor == 'java' ? 'Java' : '.NET';
  }

  function tratarItemListaProfessor(valor){

    let professor = '';

    switch (valor){
      case '1':
        professor = 'Alexandre Zamberlan';
        break;
      case '2':
        professor = 'André Flores';
        break;
      case '3':
        professor = 'Deivison Pasa';
        break;
      case '4':
          professor = 'Fabrício Tonetto';
          break;
      case '5':
          professor = 'Lucas Schlestein';
          break;
      case '6':
          professor = 'Ricardo Frohlich';
          break;
    }
  return professor;
}

function limparCamposFormulario() {
  let form = document.querySelector('#formulario');
  form.reset();
}

//Fim Ex3

//Inicio Ex4

let checkbox = document.querySelector('#termos');

desabilitarCheckboxContrato();

function desabilitarCheckboxContrato(){
  checkbox.disabled = true;
}

let textarea = document.querySelector('textarea');

textarea.addEventListener('scroll', function() {
  if (textarea.scrollTop + textarea.clientHeight >= textarea.scrollHeight) {
    checkbox.disabled = false;
  } else {
    checkbox.checked = false;
    checkbox.disabled = true;
  }
});

//Fim Ex4