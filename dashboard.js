function recuperarDashboard(){
    var str = window.location.search;
    console.log("parametro da URL = "+str);

    var idAgente = str.substr(4);
    console.log("ID do Agente = "+idAgente);
}