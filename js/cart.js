//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var articulos = [];

document.addEventListener("DOMContentLoaded", function (e) {

    $('#modalmetodo').on('shown.bs.modal', function () {
        cargarCart();
        
        var gold = document.getElementById("txtGold"); // 13
        var premium = document.getElementById("txtPremium"); // 7
        var estandar = document.getElementById("txtEstandar"); // 3
        var total = parseInt(document.getElementById("total").innerText);

        gold.innerHTML = "Gold ($U " + (Math.round(total * 0.13)) + ")";
        premium.innerHTML = "Premium ($U " + (Math.round(total * 0.07)) + ")";      //Calculo los 3 tipos de envío para saca el costo y mostrarselo al usuario
        estandar.innerHTML = "Estándar ($U " + (Math.round(total * 0.03)) + ")";

    })

   
   

    function obtenerEnvio() {

        var radio = document.getElementsByName('optradio');

        for (var i = 0, length = radio.length; i < length; i++) {       //Acá obtengo el tipo de envío que eligieron
            if (radio[i].checked) {
                return radio[i].value;
            }
        }
    }

    var btnPago = document.getElementById("btnPAGO");

    btnPago.addEventListener("click", function (e) {
        var texto = document.getElementById("total");                   //al hacer click en el boton "Aceptar" dentro de "Seleccione método de envío" se ejecuta esta función
        var total = parseInt(texto.innerText);
        texto.innerText = "";
        var radio = obtenerEnvio();

        if (radio.localeCompare("G") == 0) {
            texto.innerText = Math.round(total + (total * 0.13));
        } else if (radio.localeCompare("P") == 0) {
            texto.innerText = Math.round(total + (total * 0.07));                       //Lo que hace es aplicar el costo del envío seleccionado al subtotal que se había calculado anteriormente (linea 63)
        } else {
            texto.innerText = Math.round(total + (total * 0.03));
        }
        var btnPagar = document.getElementById("btnPagar");
        $('#modalmetodo').modal('hide'); //cerrar modal
        btnPagar.disabled = false; // volver a activar el botón Pagar
    });

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data.articles;
            cargarCart();

        }
    });

});

function obtenerSubtotal(moneda, costo, cantidad) {
    return moneda == 'UYU' ? (costo * cantidad) : (costo * cantidad * 40);
}

function contador() {
    //de los argumentos del Event Object se obtiene el id del elemento que disparó el evento on change (en este caso el input number)
    var aux = arguments[0].id;
    // con esta linea obtenemos el número del id del elemento, que es necesario para filtrar el articulo en el arreglo de articulos (cantArticulos.0)
    var id = aux.split(".")[1];

    // se usa la funcion filter para filtrar el articulo del arreglo de articulos
    var articulo = articulos.filter(function (e) { return e.id == id })[0];
    // se cambia el atributo count de ese articulo para reflejar el cambio realizado con el input number
    articulo.count = document.getElementById(aux).value;
    // se vuelve a llamar a cargarCart para actualizar el subtotal y total del carrito
    cargarCart();
}

function eliminarArticulo(id) {
    var tr = document.getElementById(id);
    if (tr) {
        var hijos_tr = tr.children; // obtenemos el tr (devuelve los 7 td)
        var subtotal = parseInt(hijos_tr[(hijos_tr.length - 2)].children[1].innerText);
        var total = document.getElementById("total");
        var restar = parseInt(total.innerText);
        total.innerText = restar - subtotal;
        tr.remove();
    }
}

function cargarCart() {
    var tabla = document.getElementById("bodyTabla");
    var contenido = "";
    var total = 0;
    if (articulos.length > 0) {
        for (var i = 0; i < articulos.length; i++) {
            articulos[i]['id'] = i; // generamos nuevo atributo id en el json para poder filtrar despues
            contenido += "<tr id='" + i + "'><th scope='row'><img style='width: 100px; height: 100px;' src='" + articulos[i].src + "' alt=''></th>";
            contenido += "<td><strong>" + articulos[i].name + "</td>";
            contenido += "<td><strong>" + articulos[i].currency + "</td>";
            contenido += "<td><strong>" + articulos[i].unitCost + "</td>";
            contenido += "<td><input min='0' style='width : 60px;' class='form-control' onchange='contador(this,event);' type='number' id='cantArticulos." + i + "' value='" + articulos[i].count + "'></td>";
            var subtotal = obtenerSubtotal(articulos[i].currency, articulos[i].unitCost, articulos[i].count);
            total += subtotal;

            contenido += "<td id='total." + i + "'><img src='img/pesouy.png' style='width:15px; height:15px;'> <strong>" + subtotal + "</td>";
            contenido += "<td><button  type='button' class='close btn btn-danger' aria-label='Close' onclick='eliminarArticulo(" + i + ")'><span class='btn btn-danger' aria-hidden='true'>&times;</span></button></td></tr>";

        }

        contenido += "<tr><td><a href='#modalmetodo' class='btn btn-outline-danger' data-target='#modalmetodo' id='metodo'  data-toggle='modal'>Seleccionar método de envío</a></td>";
        contenido += "<td colspan='5' style='text-align: right;'><strong>Total: </strong><img src='img/pesouy.png' style='width:15px; height:15px;'><strong id='total'>" + total + "</strong>";

        tabla.innerHTML = contenido;
    }

}