const departamentos =
    [
        { "departamento": "Artigas", "ciudades": ["Artigas", "Bella Unión", "Baltasar Brum", "Bernabé Rivera", "Colonia Palma", "Montes Quintela", "Paso Campamento", "Sequeira", "Tomás Gomensoro"] },
        { "departamento": "Canelones", "ciudades": ["Atlántida", "Barra de Carrasco", "Canelones", "Ciudad de la Costa", "Colonia Nicolich", "La Paz", "Las Piedras", "Pando", "Paso Carrasco", "Santa Lucía"] },
        { "departamento": "Cerro Largo", "ciudades": ["Aceguá", "Fraile Muerto", "Isidoro Noblía", "Lago Merín", "Melo", "Plácido Rosas", "Río Branco", "Tupambaé"] },
        { "departamento": "Colonia", "ciudades": ["Carmelo", "Colonia de Sacramento", "Juan Lacaze", "Nueva Helvecia", "Nueva Palmira", "Rosario", "Tarariras"] },
        { "departamento": "Durazno", "ciudades": ["Durazno", "Sarandí del Yí", "Villa del Carmen"] },
        { "departamento": "Flores", "ciudades": ["Andresito", "Área Rural", "Ismael Cortinas", "La Casilla", "La Casilla"] },
        { "departamento": "Florida", "ciudades": ["25 de Agosto", "25 de Mayo", "Cardal", "Casupá", "Cerro Colorado", "Florida", "Fray Marcos", "Nico Pérez", "Sarandí Grande"] },
        { "departamento": "Lavalleja", "ciudades": ["Colón", "Illescas", "José Batlle y Ordóñez", "José Pedro Varela", "Mariscala", "Minas", "Pirarajá", "Solís de Mataojo", "Zapicán"] },
        { "departamento": "Maldonado", "ciudades": ["Aiguá", "Cerro Pelado", "Gregorio Aznárez", "Hipódromo", "José Ignacio", "La Barra", "Maldonado", "Pan de Azúcar", "Pinares-Las Delicias", "Piriápolis", "Portezuelo", "Punta del Este", "San Carlos", "San Rafael-El placer"] },
        { "departamento": "Montevideo", "ciudades": ["Abayubá", "Montevideo", "Montevideo Rural", "Pajas Blancas", "Santiago Vázquez"] },
        { "departamento": "Paysandú", "ciudades": ["Barrio Norte", "Guichón", "Nuevo Paysandú", "Paysandú", "Porvenir", "Piedras Coloradas", "Quebracho", "Sam Félix", "Tambores"] },
        { "departamento": "Río Negro", "ciudades": ["Algorta", "Bellaco", "Colonia Ofir", "El Ombú", "Gartenal", "Grecco", "General Borges", "Fray Bentos", "Los Arrayanes", "Las Cañas", "Menafra", "Nuevo Berlín", "Paso de los Mellizos", "San Javier", "Sarandí de Navarro", "Villa María", "Young"] },
        { "departamento": "Rivera", "ciudades": ["La Pedrera", "Masoller", "Minas de Corrales", "Rivera", "Santa Teresa", "Tranqueras", "Vichadero"] },
        { "departamento": "Rocha", "ciudades": ["Chuy", "Castillos", "Lascano", "La Paloma"] },
        { "departamento": "Salto", "ciudades": ["Albisu", "Belén", "Biassini", "Colonia 18 de Julio", "Colonia Itapebí", "Constitución", "Fernández", "Garibaldi", "Pueblo Lavalleja", "Rincón de Valentín", "Salto", "San Antonio", "Saucedo", "Sarandí del Arapey", "Termas del Daymán"] },
        { "departamento": "San José", "ciudades": ["Ciudad de Plata", "Ecilda Paullier", "Libertad", "Puntas de Valdez", "Rafael Perazza", "Rodríguez", "San José de Mayo"] },
        { "departamento": "Soriano", "ciudades": ["Cardona", "Chacras de Dolores", "Dolores", "José Enrique Rodó", "La Pedrera", "Mercedes", "Palmitas", "Villa Soriano"] },
        { "departamento": "Tacuarembó", "ciudades": ["Achar", "Balneario Iporá", "Cuchilla de Peralta", "Curtina", "Cuchilla del Ombú", "Clara", "Chamberlain", "Cardozo", "Las Toscas", "Laureles", "Paso de toros", "Paso Bonilla", "Paso del Cerro", "Piedra Sola", "Punta de Cinco Sauces", "Pueblo de Barro", "Rincón del Bonete", "Sauce de Batoví", "San Gregorio de Polanco", "Tacuarembó", "Tambores", "Villa Ansina"] },
        { "departamento": "Treinta y tres", "ciudades": ["Cerro Chato", "Ejido de Treinta y Tres", "General Enrique Martínez", "Santa Clara de Olimar", "Treinta y Tres", "Vergara", "Villa Sara"] },

    ];  //Creando a mano un json con los departamentos y ciudades :) :) :) :) :) :) :) *Todos los derechos reservados.*





function cargarDepartamentos() {

    var div = document.getElementById("divDptos");
    div.innerHTML = '';// limpiamos el div
    var select = document.createElement("select");  // creo un select en la variable <<select>>
    var label = document.createElement("label");    // Creo un label en la variable <<label>>
    label.innerHTML = "Departamento:";
    label.htmlFor = "deptos"
    label.required = true;
    select.name = "deptos";
    select.className = "form-group form-control-sm";            //Le doy atributos al label y al select
    select.id = "deptos";
    select.required = true;
    div.appendChild(label);
    div.appendChild(select);            //los agrego al div
    var def = document.createElement("option");
    def.text = "Seleccione departamento";               //Creo un option en la variable <<def>> 
    def.selected = true;
    def.disabled = true;                //le doy los atributos correspondientes al option
    def.required = true;
    select.appendChild(def);    //le agrego el option al select
    for (var i = 0; i < departamentos.length; i++) {
        var option = document.createElement("option");
        option.text = departamentos[i].departamento;        //Acá uso el for para agregar todos los departamentos guardados arriba 
        option.value = departamentos[i].departamento;
        select.appendChild(option);     //En esta línea se agregan todos los departamentos como opción

    }

    select.addEventListener("change", function (e) {        //Al seleccionar un departamento se ejecuta cargarCiudades()
        cargarCiudades();
    });
}

function cargarCiudades() {
    var div = document.getElementById("divCiudades");
    div.innerHTML = '';
    var filtro = document.getElementById("deptos").value;
    var dpto = departamentos.filter(function (e) { return e.departamento == filtro })[0];
    var select = document.createElement("select");
    var label = document.createElement("label");   //Creamos algunas variables para guardar divs y otras para crear un select y un label
    label.innerHTML = "Ciudad:";
    label.htmlFor = "ciudades";
    label.required = true;                          //Le damos los atributos al select y al label                
    select.id = "ciudades";
    select.name = "ciudades";
    select.className = "form-group form-control-sm";
    select.required = true;
    div.appendChild(label);
    div.appendChild(select);                //agregamos el label y el select al div ( divCiudades)

    for (var i = 0; i < dpto.ciudades.length; i++) {
        var option = document.createElement("option");
        option.value = dpto.ciudades[i];
        option.text = dpto.ciudades[i];
        select.appendChild(option);     //Esta función es reciclada de la anterior(departamentos) entonces acá hago lo mismo pero con las ciudades

    }
}