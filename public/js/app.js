document.addEventListener("DOMContentLoaded", function() {
    const btnRegistro = document.getElementById("btnRegistro");
    const btnLogin = document.getElementById("btnLogin");

    if (btnRegistro) {
        btnRegistro.addEventListener("click", function() {
            window.location.href = "../html/registroEmpleado.html";
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener("click", function() {
            window.location.href = "../html/login.html";
        });
    }
});