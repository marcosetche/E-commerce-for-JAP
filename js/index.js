//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    var guardarDatos = () => {
        var email = document.getElementById("campoemail").value; //alojams los datos ingresador en el usuario y la contraseña en dos variables
        var pass = document.getElementById("campocontrasenia").value;
        localStorage.setItem("email", email);
        localStorage.setItem("pass", pass);
    }; //guardamos los datos en local storage

    var obtenerDatos = () => {
        var email = document.getElementById("campoemail");
        var pass = document.getElementById("campocontrasenia");
        email.value = localStorage.getItem("email");
        pass.value = localStorage.getItem("pass"); 
    };

    if(localStorage.getItem("email") && localStorage.getItem("pass")){
     obtenerDatos();   
    }

    var formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function(e){
        e.preventDefault();
        var recordarDatos = document.getElementById("datos");

        if(recordarDatos.checked == true){  //Si el usuario marca Recordar mis datos, los datos se guardan en el local storage, de lo contrario no se guardan
            guardarDatos();
        }
        window.location.href = "paginaprincipal.html"; //redireccionamos a la proxima pagina cuando iniciemos sesión
    });

    
 
});