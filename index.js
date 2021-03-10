function enviar() {
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    // 1 criar a variável de mensagem para enviar ao backend
    // 2 criar o cabecalho indicando metodo POST e mensagem do tipo JSON
    // 3 enviar para o BackEnd

    // 1 - corpo da mensagem
    var msgBody = {
        email: txtLogin,
        racf: txtLogin,
        senha: txtSenha
    }

    // 2 - cabecalho
    var cabecalho = {
        method: "POST",
        body  : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    }

    // 3 - enviar para o backend
    fetch("http://localhost:8080/login", cabecalho).then(resultado => trataResultado(resultado));

}

function trataResultado(resultado){
    if (resultado.status == 200){
        resultado.json().then(usuario =>
        {
            // quero manter o usuário conectado (vou usar este objeto como TOKEN e armazená-lo localmente)
            localStorage.setItem("userDASH", JSON.stringify(usuario));
            // redireciono para a outra página
            window.location = "agentes.html";

        });
    }
    else if (resultado.status == 401){
        document.getElementById("msgErro").innerHTML = "Senha Inválida";
    }
    else if (resultado.status == 404){
        document.getElementById("msgErro").innerHTML = "Usuário não encontrado";
    }
}