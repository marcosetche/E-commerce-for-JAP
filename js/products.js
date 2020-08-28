//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

var productosArray = [];

var btnRelevancia = document.getElementById("btnRelevancia"); //obtenemos los botones para poder setearle el evento click
var btnAZ = document.getElementById("btnAZ");
var btnZA = document.getElementById("btnZA");
var btnRANGO = document.getElementById("btnRANGO");
var inputBuscador = document.getElementById("buscador");

inputBuscador.addEventListener("keyup", function(e){
    if(productosArray.length != 0)
    {
        var busqueda = document.getElementById("buscador").value;
        var resultado = buscar(busqueda);
        showProductosList(resultado);
    }
});

btnRelevancia.addEventListener("click", function(e){ //al hacer click en el boton Relevancia, se ejecuta la ordenanza del array según cantidad de vendidos
    e.preventDefault();
    if (productosArray.length != 0)
    {
        var ordenado = ordenar(1);
        showProductosList(ordenado);
    }
   
});

btnRANGO.addEventListener("click", function(e){ //lo mismo acá pero en el rango de precios
    e.preventDefault();
    if (productosArray.length != 0)
    {
        var ordenado = ordenar(4);
        showProductosList(ordenado);
    }  
});

btnAZ.addEventListener("click", function(e){ //mas de lo mismo pero con el botón de ordenar precio mayor a menos(A-Z)
    e.preventDefault(); //esta función lo que hace es terminar de ejecutar todas las líneas antes de procesar otro clic 
    if (productosArray.length != 0)
    {
        var ordenado = ordenar(2);
        showProductosList(ordenado);
    }
    
});

btnZA.addEventListener("click", function(e){ //acá el botón de menor a mayor (Z-A)
    e.preventDefault();
    if (productosArray.length != 0)
    {
        var ordenado = ordenar(3);
        showProductosList(ordenado);
    }
});

function showProductosList(array){
    
    let htmlContentToAppend = "";
    document.getElementById("cat-list-container").innerHTML = '';
    for(let i = 0; i < array.length; i++){
        let producto = array[i];
        htmlContentToAppend +=
        "<div class='list-group-item list-group-item-action'>"+
            "<div class='row'>"+
                "<div class='col-3'>"+
                    "<img src='" + producto.imgSrc + "' alt='" +  "' class='img-thumbnail'>"+
                "</div>"+
                //acá estuve modificando las fuentes, tamaños y el lugar para que quede mas prolijo la presentación de los productos.
                "<div class='col'>"+
                    "<div class='d-flex w-100 justify-content-between'>"+
                        "<h4 class='mb-1'>"+ "<font face='Helvetica, Arial, sans-serif' size=5>" + producto.name + "</font>" +"</h4>"+ "<br>" +
                        "<h5>" + "<font face='Lucida Sans' size=4>" + "<strong>"  + producto.cost + " " + producto.currency + "</strong>" + "</font>" + "</h5>"+
                    "</div>"+
                  
                  "<h6>"+ "<font size=4>" + producto.description + "</font>" +"</h6>"+ "<br>" + "<br>" + "<br>" + "<br>" +
                  "<h7>" + "Cantidad de vendidos: " + "<font face='Franklin Gothic Medium' >" + producto.soldCount + "</font>" + "</h7>"+
                "</div>"+
            "</div>"+
        "</div>";
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    //Por si no hay resultados después de lo filtrado
    if (array.length == 0){
        document.getElementById("cat-list-container").innerHTML = '';
        document.getElementById("cat-list-container").innerHTML = '<button type="button" class="glyphicon glyphicon-remove-circle">'  +
      '</button>' + " No se han encontrado resultados con esos filtros de búsqueda.";

    }
}
                                                                                                                                                                                                                                   
function ordenar(tipo){ //recibe la variable tipo, que indica la manera de ordenar el array, ya sea por relevancia o precio asc. o desc.
    if(tipo == 1){
        return productosArray.sort(function(a, b){
            return b.soldCount - a.soldCount;
        });
    }else if(tipo == 2){
        return productosArray.sort(function(a, b){
            return a.cost - b.cost;
        });
    } else if(tipo == 3){
    return productosArray.sort(function(a, b){
        return   b.cost - a.cost;
    });
}
    else {
        var minimo = document.getElementById("minimo").value;
        var maximo = document.getElementById("maximo").value;
    return productosArray.filter(function(a){
        return (a.cost >= minimo && a.cost <= maximo);
    });
}
}

function buscar(filtro){
    return productosArray.filter(function(a){
        return a.name.toLowerCase().includes(filtro.toLowerCase());
    });
}

getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        productosArray = resultObj.data;
        showProductosList(productosArray);
    }
});

});
