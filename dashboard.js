function recuperarDashboard(){
    var str = window.location.search;
    console.log("parametro da URL = "+str);
    const urlParams = new URLSearchParams(str);

    //var idAgente = str.substr(4);
    var idAgente = urlParams.get("id");
    console.log("ID do Agente = "+idAgente);
}
