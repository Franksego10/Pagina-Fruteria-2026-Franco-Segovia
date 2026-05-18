/* ===============================
        ARRAY DE 13 FRUTAS
   ===============================

    Creamos un array llamado frutas que contiene 13 objetos.

    Cada objeto representa una fruta y guarda su: 
            - id - nombre - precio - src -
*/

const frutas = [
    {id: 1, 
     nombre: "Banana",
     precio: 80,
     src: "img/banana.jpg"
    },
    {id: 2, 
     nombre: "Manzana",
     precio: 100,
     src: "img/manzana.jpg"
    },
    {id: 3, 
     nombre: "Anana",
     precio: 180,
     src: "img/anana.jpg"
    },
    {id: 4, 
     nombre: "Arandano",
     precio: 40,
     src: "img/arandano.jpg"
    },
    {id: 5, 
     nombre: "Frambuesa",
     precio: 85,
     src: "img/frambuesa.png"
    },
    {id: 6, 
     nombre: "Frutilla",
     precio: 90,
     src: "img/frutilla.jpg"
    },
    {id: 7, 
     nombre: "Kiwi",
     precio: 60,
     src: "img/kiwi.jpg"
    },
    {id: 8, 
     nombre: "Mandarina",
     precio: 110,
     src: "img/mandarina.jpg"
    },
    {id: 9, 
     nombre: "Naranja",
     precio: 109,
     src: "img/naranja.jpg"
    },
    {id: 10, 
     nombre: "Pera",
     precio: 65,
     src: "img/pera.jpg"
    },
    {id: 11, 
     nombre: "Pomelo Amarillo",
     precio: 45,
     src: "img/pomelo-amarillo.jpg"
    },
    {id: 12, 
     nombre: "Pomelo Rojo",
     precio: 50,
     src: "img/pomelo-rojo.jpg"
    },
    {id: 13, 
     nombre: "Sandia",
     precio: 160,
     src: "img/sandia.jpg"
    }
];

// CARRITO
let carrito = [];

/*
======================================
    FUNCION IMPRIMIR DATOS ALUMNO
======================================

    Se encargara de crear un objeto alumno con los respectivos datos
    Mostrara los datos en la consola
    Imprimira el nombre y apellido dentro del nav de la pagina html

    Este se incluira dentro de la funcion init() para que se ejecute al inicio
*/
function imprimirDatosAlumno() {
    // OBJETO ALUMNO
    const alumno = {
    dni: "12345678",
    nombre: "Franco",
    apellido: "Segovia",
    };

    // MENSAJE CONSOLA
    console.log(`Alumno:\ndni: ${alumno.dni}\nnombre: ${alumno.nombre}\napellido: ${alumno.apellido}`)

    // MOSTRAR EN EL NAV NOMBRE Y APELLIDO
    let alumnoHTML = `<p>${alumno.apellido} ${alumno.nombre}</p>`;   // la linea que se agregara a html
    let contenedorAlumno = document.querySelector(".nombreAlumno");    // buscamos por la clase donde se agregara, en que parte
    contenedorAlumno.innerHTML = alumnoHTML;                           // agregamos la linea a html con innerHTML
};

// FUNCION IMPRIMIR PRODUCTOS

function imprimirProductos(lista){
    let contenedor = document.querySelector(".contenedor-productos");  // buscamos la clase donde se agregaran los productos
    let productoHTML = "";                                             // definimos la linea y formato que se agregara a html
    lista.forEach(element => {                                         // Recorremos la lista que convertiremos a la linea html
        productoHTML += `<div class="card-producto"><img src="${element.src}" alt="${element.nombre}"><h3>${element.nombre}</h3><p>$${element.precio}</p><button class="boton-agregar" id="${element.id}">Agregar al carrito</button></div>`;
    });                                                                // En cada iteracion agrega esta linea con sus respectivos datos de cada elemento 
    contenedor.innerHTML = productoHTML;                               // finalmente agrega todo a la pagina html
    agregarEventosBotones(lista);                                      // llama a la funciona que agrega funcionalidad los botones de la lista pasada por parametro
};

// Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el campo de texto
function filtrarProductos(listaProductos){                             // se le pasa una lista para filtrar
    let contenedorInput = document.querySelector(".barra-busqueda");   // guardamos en una variable la clase que escucha el evento
    contenedorInput.addEventListener("input", event=> {                // creo un escuchador de evento "input"
        let texto = event.target.value.toLowerCase().trim();           // esto guarda el texto que se introdujo en el "input" barra de busqueda lo pone en minuscula y le borra espacion del principo y finales
        let productosFiltrados = listaProductos.filter(element => element.nombre.toLowerCase().startsWith(texto)); //guardamos en una lista la lista que se filtrara mediante la funcion filter() la cual la configuramos para que coincida con el texto guardado anteriormente en el input
        imprimirProductos(productosFiltrados);                         // finalmente reutilizamos la funcion funcion que imprime en la pantalla y le pasamos la lista filtrada de parametro para que se actualice la pantalla
    });   
};


// FUNCION INICIALIZADORA
function init(){
    imprimirDatosAlumno();
    imprimirProductos(frutas);
    filtrarProductos(frutas);
    cargarCarrito();
    botonesOrden(frutas);
};

// INICIA LA PAGINA
init();


// FUNCION QUE AGREGA FUNCIONABILIDAD A BOTONES
function agregarEventosBotones(lista){                                  // se le pasa una lista por parametro porque dsp se usara el id de cada elemento
    const botones = document.querySelectorAll(".boton-agregar");        // se busca la clase donde agregaremos el evento y la guardamos, como son varios devuelve una especie de array
    
    botones.forEach(boton => {                                          // recorremos el array mencionado anteriormente para recorrerlo con forEach y que cada elemento reaccione a un evento "click". 
        boton.addEventListener("click", event => {
            // obtener id del boton apretado
            const id = Number(event.target.id);                         // guardara el numero id del boton que esta relacionado a la lista de productos

            // busca producto
            const producto = lista.find(element => element.id === id);  // utiliza el find para encontrar un elemento que coincida con el id del boton clickeado y lo guarda en el const producto

            // agrega al carrito
            agregarProductoCarrito(producto, carrito);                                           
                                               
        });
    });
};

// FUNCION PARA MOSTRAR EL CARRITO
function mostrarCarrito(listaCarrito){
    let contenedorCarrito = document.getElementById("items-carrito");   // buscamos donde se mostrara el carrito
    if (listaCarrito.length >= 1){                                      // si el carrito tiene 1 elemento o mas, mostrara su contenido
        // guardamos el mensaje (en este caso el contenido) que se mostrara en el html en una variable
        let carritoProdHTML = "<div class='contenedor-vaciar'><button class='boton-vaciar'>Vaciar Carrito!</button></div><ul>"; 
        //este recorre cada elemento del carrito para crear su linea                                  
        listaCarrito.forEach(element => {
            carritoProdHTML += `<li class="bloque-item"><p class="nombre-item">${element.nombre} - $${element.precio}</p><div class="modificar-cantidad"><button class="boton-sumar" id="${element.id}">+</button><span>${element.cantidad}</span><button class="boton-eliminar" id= "${element.id}">-</button></div></li>`;
        });
        carritoProdHTML += "</ul>";
        // insertamos el contenido final en el html
        contenedorCarrito.innerHTML = carritoProdHTML;

        // agrego evento al boton
        sumarProducto(listaCarrito);
        eliminarProducto(listaCarrito);
        vaciarCarrito(listaCarrito);
        //actualizo contador
    }
    else{       //si el contenedor esta vacio va a mostrar este mensaje
        contenedorCarrito.innerHTML = `<p>No hay elementos en el carrito.</p>`;
    }   
    contadorProductos(listaCarrito);
    sumarTotalPrecio(listaCarrito);
}

function eliminarProducto(listaCarrito){
    // Buscamos las clases de botones eliminar
    const botones = document.querySelectorAll(".boton-eliminar");
    // Recorremos la lista de botones y le agregamos un escuchador de eventos
    botones.forEach(boton => {
        boton.addEventListener("click", event => {
            const id = Number(event.target.id);         // guardamos el id del boton en una variable
            const producto = listaCarrito.find(
                element => element.id === id            // recorremos la lista del carrito para encontrar el indice del que coindide con el id del boton
            );
            // borramos el elemento que se encuentra dentro del indice
            eliminarProductoCarrito(producto, listaCarrito);
        });
        
    })
}

function guardarCarrito(listaCarrito){
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));  // guarda el carrito con setItem en formato JSON
}

function cargarCarrito(){

    const carritoGuardado = localStorage.getItem("carrito");    // obtenemos el JSON Carrito 
    if(carritoGuardado){                                        // si esta en true (es decir existe)
        carrito = JSON.parse(carritoGuardado);                  // reemplazamos el carrito original con el carrito JSON parseado nuevamente a objeto
        mostrarCarrito(carrito);                                // mostramos el carrito sino cuando se cargue la pagina no se podra ver
    }
}

function botonesOrden(listaProductos){                              // esta funcion es la que se encargara de los eventos de los botones de ordenamiento
    const botones = document.querySelectorAll(".ordenar");          // seleccionamos los botones de ordenamiento
    botones.forEach(boton => {                                      // recorremos la lista de botones
        boton.addEventListener("click", event => {
            const tipoOrden = event.target.id;                      // guarda en una variable el id del boton que se clickeo

            ordenarListaProductos(tipoOrden, listaProductos) ;       // llama a la funcion ordenarProductos pasandole el id del boton para su respectivo ordenamiento
        })
    })
}

function ordenarListaProductos(tipoOrdenamiento, listaProductos){           // funcion de ordenamiento, se le pasa el "string" para realizar su debido ordenamiento y la lista de productos para efectuarlo
    if (tipoOrdenamiento === "A-Z"){
        listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));    // ordena de A-Z
    }
    else if (tipoOrdenamiento === "Z-A") {
        listaProductos.sort((a, b) => b.nombre.localeCompare(a.nombre));    // ordena Z-A
    }
    else if (tipoOrdenamiento === "menorPrecio") {
        listaProductos.sort((a, b) => a.precio - b.precio);                 // ordena por menor precio
    }
    else {
        listaProductos.sort((a, b) => b.precio - a.precio);                 // ordena por mayor precio
    }
    imprimirProductos(listaProductos);                                      // imprime la lista ordenada depende por cual condicion entro
}


function agregarProductoCarrito (producto, listaCarrito){
    const productoExistente = listaCarrito.find(element => element.id === producto.id) // verifica si el objeto existe en el array

    if (productoExistente){
        productoExistente.cantidad += 1;
    }
    else{
        let productoAgregado = {...producto, cantidad: 1}    // esto crea una copia del producto y le agrega un campo cantidad
        listaCarrito.push(productoAgregado); // lo agrega a un array carrito 
                                            
    }
    console.log(listaCarrito);                                       // me muestra el array carrito en consola
    mostrarCarrito(listaCarrito);                                    // muestra el carrito en la pagina actualizado
    guardarCarrito(listaCarrito);                                   // guarda el carrito actualizado
}

function eliminarProductoCarrito (producto, listaCarrito){
    if (producto.cantidad > 1){
        producto.cantidad -= 1;
    }
    else if (producto.cantidad === 1){
        const indice = listaCarrito.findIndex(element => producto.id === element.id);
        listaCarrito.splice(indice, 1);
    }
    console.log(listaCarrito);                                       // me muestra el array carrito en consola
    mostrarCarrito(listaCarrito);                                    // muestra el carrito en la pagina actualizado
    guardarCarrito(listaCarrito);                                    // guarda el carrito actualizado
    }


/*
function modificarCantidadProducto(producto, cambio){

    const productoExistente = carrito.find(
        element => element.id === producto.id
    );

    if(productoExistente){

        productoExistente.cantidad += cambio;

        if(productoExistente.cantidad <= 0){

            const indice = carrito.findIndex(
                element => element.id === producto.id
            );

            carrito.splice(indice, 1);
        }

    }                                                   VERSION GENERALIZADA PARA AGREGAR O ELIMINAR PRODUCTOS
    else if(cambio > 0){

        const productoNuevo = {
            ...producto,
            cantidad: 1
        };

        carrito.push(productoNuevo);
    }

    mostrarCarrito(carrito);
    guardarCarrito(carrito);
}*/

function sumarProducto (listaCarrito){
    const botonSumar = document.querySelectorAll(".boton-sumar");
    botonSumar.forEach(element => element.addEventListener("click", event => {
        const id = Number(event.target.id);
        let producto = listaCarrito.find(element => element.id === id);
        producto.cantidad += 1;
        console.log(listaCarrito);
        mostrarCarrito(listaCarrito);
        guardarCarrito(listaCarrito);
    }))
}

function contadorProductos(listaCarrito) {
    let contadorCarrito = 0;
    let contenedorCarrito = document.getElementById("contador-carrito");
   /* let total = listaCarrito.reduce((acc, item) => acc + item.cantidad, 0);  Otra alternativa usando reduce*/
    listaCarrito.forEach(element => contadorCarrito += element.cantidad);

    contenedorCarrito.innerHTML = contadorCarrito;
}


function sumarTotalPrecio(listaCarrito){
    
    let contenedorPrecioTotal = document.getElementById("precio-total");
    let totalPrecio = listaCarrito.reduce((acumulador, element) => acumulador + (element.precio * element.cantidad), 0);

    contenedorPrecioTotal.innerHTML = `$${totalPrecio.toFixed(2)}`;
}

function vaciarCarrito (listaCarrito){
    const botonVaciar = document.querySelector(".boton-vaciar");
    botonVaciar.addEventListener("click", event => {
        listaCarrito.length = 0
        console.log(listaCarrito);                                       // me muestra el array carrito en consola
        mostrarCarrito(listaCarrito);                                    // muestra el carrito en la pagina actualizado
        guardarCarrito(listaCarrito);
    }); 
     
}