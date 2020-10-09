//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

   var json_info;
   var comentarios = [];

   var enviarComentario = document.getElementById("inpCOM");

    enviarComentario.addEventListener("click", function(e){
    e.preventDefault();
    subirComentario();    
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if(resultObj.status==="ok"){
            json_info=resultObj.data; 
            showProductoInfo();
            getJSONData(PRODUCTS_URL).then(function(resultObject){
                 if(resultObject.status==="ok"){
                     var listaProd=resultObject.data;
                     let htmlContentToAppend = ``;
                     for (let a = 0; a < json_info.relatedProducts.length; a++){
                          let myProduct = listaProd[json_info.relatedProducts[a]];
                          htmlContentToAppend += `
                            <div class="row"> 
                            <div class="col-sm-6 col-md-3">
                                <a href="products.html" class="thumbnail">
                                    <img class="bd-placeholder-img card-img-top" src="`+ myProduct.imgSrc + `">
                                    <h3 class="m-3" style="color:black;">` + myProduct.name + `</h3>
                                    <div class="card-body">
                                        <p class="card-text" style="color:black;">`+ myProduct.currency + ` ` + myProduct.cost + `</p>
                                    </div>
                                </a>
                            </div></div><hr>
                            `;
                     }
                     document.getElementById("productosRelacionados").innerHTML=htmlContentToAppend;
                 }
             });
        }
    });

   getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        json_info = resultObj.data;
        showProductoInfo();
    }
    });

function obtenerFecha(){ //Saco la fecha y la formateo para que se vea más natural
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}





function subirComentario(){
    var div_comentarios = document.getElementById("comentarios");
    var htmlComentario = '';
    var puntaje = document.getElementById("puntaje");
    var usuario = document.getElementById("cajaNAME");
    var comentario = document.getElementById("cajaCOM");
    //hago una variante para cada dato que necesito (usuario, cantidad de estrellas y el comentario en sí)
    htmlComentario += "<div class='card-body'><div class='estilo_comentario  border rounded'>";
    htmlComentario += "<div class='com_user card-title'>"+ usuario.value + " "+ 
    puntaje.value + "<i class='fas fa-star checked'></i></div>";
    htmlComentario += "<div class='com_desc card-body'>"+ comentario.value +"</div>";   
    htmlComentario += "<div class='com_fecha card-text'>"+ obtenerFecha() +"</div>";      // muestro todo con el mismo formato que los otros
    htmlComentario += "</div></div>";  
    var div_comentario = document.createElement("div");
    div_comentario.innerHTML = htmlComentario;
    div_comentarios.append(div_comentario);    //agrego el comentario a lo último con un append
    puntaje.value = '';
    usuario.value = '';
    comentario.value = ''; //limpio las cajas
}
    


    function cargarComentarios(){
        var div_comentarios = document.getElementById("comentarios");
        var htmlComentarios = '';

        if(comentarios.length != 0){
            for(var k=0; k < comentarios.length; k++){
                htmlComentarios += "<div class='card-body'><div class='estilo_comentario border rounded'>";
                htmlComentarios += "<div class='com_user card-title'>"+ comentarios[k].user + " " + 
                comentarios[k].score + "<i class='fas fa-star checked'></i></div>";
                htmlComentarios += "<div class='com_desc card-body'>"+ comentarios[k].description +"</div>";   
                htmlComentarios += "<div class='com_fecha card-text'>"+ comentarios[k].dateTime +"</div>";
                htmlComentarios += "</div></div>";
            }
           //Con un for recorro el array, y agrego los datos al html con un .innerHTML
            div_comentarios.innerHTML = htmlComentarios;
        }
    }

    function generarCarrusel(){
        let htmlCarrusel = "";
        var div_carrusel = document.getElementById("div_carrusel")

        htmlCarrusel += "<div id='carrusel' class='carousel slide' data-ride='carousel'>";
        htmlCarrusel += "<ol class='carousel-indicators'>";
        for(var i=0; i < 4; i++){
            if(i == 0){
                htmlCarrusel += "<li data-target='#carrusel' data-slide-to='"+ i +"' class='active'></li>";
            }else{
                htmlCarrusel += "<li data-target='#carrusel' data-slide-to='"+ i +"'></li>";
            }
        }
    
        htmlCarrusel += "</ol>";
        htmlCarrusel += "<div class='carousel-inner'>";             //la estructura del carrusel la saqué de internet, tuve que sustituir la fuente de las imagenes
        for(var j=0; j < 4; j++){
            if(j == 0){
                htmlCarrusel += "<div class='carousel-item active'>";
                htmlCarrusel += "<img class='d-block w-100' src='"+json_info.images[j]+"' alt='Imagen del producto'>";
                htmlCarrusel += "</div>";
            }else{
                htmlCarrusel += "<div class='carousel-item'>";
                htmlCarrusel += "<img class='d-block w-100' src='"+json_info.images[j]+"' alt='Imagen del producto'>";
                htmlCarrusel += "</div>";
            }
        }
        htmlCarrusel += "</div>";
        htmlCarrusel += "<a class='carousel-control-prev' href='#carrusel' role='button' data-slide='prev'>";
        htmlCarrusel += "<span class='carousel-control-prev-icon' aria-hidden='true'></span>";
        htmlCarrusel += "<span class='sr-only'>Anterior</span></a>";
      
        htmlCarrusel += "</a><a class='carousel-control-next' href='#carrusel' role='button' data-slide='next'>";
        htmlCarrusel += "<span class='carousel-control-next-icon' aria-hidden='true'></span>";
        htmlCarrusel += "<span class='sr-only'>Siguiente</span></a></div>";
        div_carrusel.innerHTML = htmlCarrusel;
    }

    function showProductoInfo(){
    
        let htmlContentToAppend = "";
        var div_info = document.getElementById("informacion").innerHTML = '';
        
        if(json_info){
            htmlContentToAppend +=
            "<div class='list-group-item list-group-item-action'>"+
                "<div class='row'>"+
                    "<div  id='div_carrusel' class='col-3'>";
                    htmlContentToAppend += "</div>"+
                    //acá estuve modificando las fuentes, tamaños y el lugar para que quede mas prolijo la presentación de los json_infos.
                    "<div class='col'>"+
                        "<div class='d-flex w-100 justify-content-between'>"+
                            "<h4 class='mb-1'>"+ "<font face='Helvetica, Arial, sans-serif' size=5>" + json_info.name + "</font>" +"</h4>"+ "<br>" +
                            "<h5>" + "<font face='Lucida Sans' size=4>" + "<strong>"  + json_info.cost + " " + json_info.currency + "</strong>" + "</font>" + "</h5>"+
                        "</div>"+
                      
                      "<h6>"+ "<font size=4>" + json_info.description + "</font>" +"</h6>"+ "<br>" + "<br>" + "<br>" + "<br>" +
                      "<h7>" + "Cantidad de vendidos: " + "<font face='Franklin Gothic Medium' >" + json_info.soldCount + "</font>" + "</h7>"+
                    "</div>"+
                "</div>"+
            "</div>";
            document.getElementById("informacion").innerHTML = htmlContentToAppend;
            generarCarrusel();


            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    comentarios = resultObj.data;
                    cargarComentarios();
                }
                });
        }
       
    }
    
});