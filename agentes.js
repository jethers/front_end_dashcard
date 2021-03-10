function carregaInfo(){
    // 1a coisa: vamo ver se o usuário está mesmo conectado?

    var strUser = localStorage.getItem("userDASH");

    if (!strUser){    // se o objeto não existe no localStorage, signifca que eu não estou conectado
        window.location = "index.html";
        return;
    }

    var user = JSON.parse(strUser);  // já "desconverto" de String para objeto

    document.getElementById("fotoUser").innerHTML = `<img src="${user.linkFoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML  = `<h4> ${user.nome} </h4>
                                                     RACF: ${user.racf} <br>
                                                     Ramal: ${user.ramal} <br>
                                                     Email: ${user.email} <br>`;

    // vamos fazer o preenchimento do select e tb da tabela??
    
    fetch("http://localhost:8080/agentes")
         .then(res=> res.json())
         .then(lista => preenche(lista) );

  // se o fetch não fosse assíncrono, como seria?
  /*
   res = fetch("http://localhost:8080/agentes")
   lista = res.json();
   preenche(lista);
  */


}

function preenche(lista){

    var strTabela = ` <div class="row">
                           <div class="col-12 text-center">
                                <h4> Top 10 Agentes Financeiros </h4>
                            </div>
                      </div>
                      <div class="row">
                        <div class="col-8"><strong>Nome do Agente Financeiro</strong></div>
                        <div class="col-4 text-center"><strong>Volume</strong></div>
                    </row>`;
    var strSelect = `<select id="slcAgente" class="form-select"> `

    for (i=0; i<lista.length; i++){
        var agente = lista[i];
        strSelect = strSelect + ` <option value="${agente.id}"> ${agente.nome} </option>` ;

        strTabela = strTabela + `<div class="row linha-da-tabela">
                                   <div class="col-8">${agente.nome}</div>
                                   <div class="col-4 text-center">${agente.volume}</div>
                                </div>`;
    }
    strSelect = strSelect + `</select>`;

    document.getElementById("divAgentes").innerHTML = strSelect;
    document.getElementById("tabelaAgentes").innerHTML = strTabela;
    

}

function gerarDashboard(){
    var idAgente = document.getElementById("slcAgente").value;
    console.log("Agente selecionado = "+idAgente);
    window.location = "dashboard.html?id="+idAgente;
}