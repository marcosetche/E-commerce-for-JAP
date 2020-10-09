//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var articulos = [];

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status==="ok"){
            articulos=resultObj.data.articles; 
            cargarCart();
            
        }
    });
    
});

function obtenerSubtotal(moneda, costo, cantidad){
    return moneda == 'UYU' ? (costo * cantidad) : (costo * cantidad * 40);    
}

function contador(){
    //de los argumentos del Event Object se obtiene el id del elemento que disparó el evento on change (en este caso el input number)
    var aux = arguments[0].id; 
    // con esta linea obtenemos el número del id del elemento, que es necesario para filtrar el articulo en el arreglo de articulos (cantArticulos.0)
    var id = aux.split(".")[1];

    // se usa la funcion filter para filtrar el articulo del arreglo de articulos
    var articulo = articulos.filter(function(e){return e.id == id})[0];
    // se cambia el atributo count de ese articulo para reflejar el cambio realizado con el input number
    articulo.count = document.getElementById(aux).value;
    // se vuelve a llamar a cargarCart para actualizar el subtotal y total del carrito
    cargarCart();
}

function cargarCart(){
    var tabla = document.getElementById("bodyTabla");
    var contenido = "";
    var total = 0;
    if(articulos.length > 0){
        for(var i=0; i < articulos.length; i++){
            articulos[i]['id'] = i; // generamos nuevo atributo id en el json para poder filtrar despues
            contenido += "<tr><th scope='row'><img style='width: 100px; height: 100px;' src='"+ articulos[i].src +"' alt=''></th>";
            contenido += "<td><strong>"+ articulos[i].name +"</td>";
            contenido += "<td><strong>"+ articulos[i].currency +"</td>";
            contenido += "<td><strong>"+ articulos[i].unitCost +"</td>";
            contenido += "<td><input min='0' style='width : 60px;' class='form-control' onchange='contador(this,event);' type='number' id='cantArticulos."+i+"' value='"+ articulos[i].count +"'></td>";
            var subtotal = obtenerSubtotal(articulos[i].currency, articulos[i].unitCost, articulos[i].count);
            total += subtotal;
            
            contenido += "<td id='total."+i+"'><strong>"+ subtotal + " <img src='img/pesouy.png' style='width:15px; height:15px;'></td></tr>";
            
        }
        
        contenido += "<tr><td colspan='6' style='text-align: right;'><strong>Total: "+ total +" <img src='img/pesouy.png' style='width:15px; height:15px;'>";
       
        tabla.innerHTML = contenido;
    }
    
}