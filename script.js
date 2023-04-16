'use strict'

//declaracion de funciones

function actualizarProductosDOM(){ 
    for (let i=0; i<listaProductos.length ;i++){
        let card = document.createElement("DIV");
        card.classList.add("card");
        card.style.backgroundImage = `url(./img/${listaProductos[i].img}.jpg)`

        let name = document.createElement("H4");
        name.classList.add("name");
        var texto = document.createTextNode(`${listaProductos[i].nombre}`);
        name.appendChild(texto);
        card.appendChild(name)

        let description = document.createElement("P");
        description.classList.add("description");
        texto = document.createTextNode(`${listaProductos[i].descripcion}`);
        description.appendChild(texto);
        card.appendChild(description)

        let comprar = document.createElement("DIV");
        comprar.classList.add("comprar");
        card.appendChild(comprar)
         
        let titulo = document.createElement("P");
        texto = document.createTextNode(`Agregar al carrito`);
        titulo.appendChild(texto);
        comprar.appendChild(titulo);

        if (`click${listaProductos[i].nombre}` == prodFav){
            card.classList.add("prod-fav");
        }

        for(let indice in listaProductos[i].precio){
            let btn = document.createElement("BUTTON");
            btn.classList.add(`btn${listaProductos[i].nombre}-${indice}`);
            texto = document.createTextNode(`${indice} - $${listaProductos[i].precio[indice]}`);
            btn.appendChild(texto);
            comprar.appendChild(btn);
        }

        contProd.appendChild(card)
    }
}

function actualizarProductosCarrito(){ 
    //------Limpiar la lista
    let container = document.querySelector(".order-container")
    let hijos = document.querySelector(".order-container").children
    while (hijos.length>1) {
        container.removeChild(container.lastChild);
    }

    //------- crear listaCarrito en el DOM
    for (let i=0; i<listaCarrito.length ;i++){

        let linea = document.createElement("LI");
        linea.classList.add("linea");
        container.appendChild(linea)

        let cant = document.createElement("P");
        cant.classList.add("cant");
        var texto = document.createTextNode(`${listaCarrito[i].cant}`);
        cant.appendChild(texto);
        linea.appendChild(cant)

        let name = document.createElement("P");
        name.classList.add("name");
        var texto = document.createTextNode(`${listaCarrito[i].nom}`);
        name.appendChild(texto);
        linea.appendChild(name)

        let precio = document.createElement("P");
        precio.classList.add("precio");
        var texto = document.createTextNode(`$${listaCarrito[i].precio}`);
        precio.appendChild(texto);
        linea.appendChild(precio);

        var btnEliminar = document.createElement("BUTTON");
        btnEliminar.classList.add("btnEliminar");
        btnEliminar.addEventListener("click",()=>{
        //tarjeta aviso producto eliminado
            Toastify({
                text: `${listaCarrito[i].nom} Eliminado del carrito`,
                duration: 2000,
                gravity: "top",
                position: "right",
                style: {
                  background: "linear-gradient(to right, #b04100, #c9a43d)",
                },
              }).showToast();
        //eliminar producto del array carrito
            listaCarrito.splice(i,1);
        //actializar el DOM
            actualizarProductosCarrito();   
        });
        
        var texto = document.createTextNode(`X`);
        btnEliminar.appendChild(texto);
        linea.appendChild(btnEliminar)
    }
    //----crear linea total
    let linea = document.createElement("LI");
        linea.classList.add("linea");
        container.appendChild(linea)

        let cant = document.createElement("P");
        cant.classList.add("cant");
        var texto = document.createTextNode(`-`);
        cant.appendChild(texto);
        linea.appendChild(cant)

        let name = document.createElement("P");
        name.classList.add("name");
        var texto = document.createTextNode(`Total`);
        name.appendChild(texto);
        linea.appendChild(name)

        let precio = document.createElement("P");
        precio.classList.add("precioT");
        let total = 0;
        for (let p in listaCarrito){
            total = total+parseInt(listaCarrito[p].precio);
        }
        var texto = document.createTextNode(`$${total}`);
        precio.appendChild(texto);
        linea.appendChild(precio)
}
//------------------------------------------------------------------

//CAMBIO ENTRE VENTANAS PRODUCTOS-CARRITO
const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");

container.classList.add("tl-1");

btn.addEventListener("click", () => {
    container.classList.toggle("tl-1");
    container.classList.toggle("tl-2");
    actualizarProductosCarrito();
})
btn2.addEventListener("click", () => {
    container.classList.toggle("tl-1");
    container.classList.toggle("tl-2");
    actualizarProductosCarrito();
})

//---------------------------------------------------------------------

//OBTENES PRODUCTOS DEL JSON PRODUCTOS (O DE UNA BASE DE DATOS)
var listaProductos = [];
var prodFav = "";
const contProd = document.querySelector(".container-products");
var listaCarrito = [];

fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    listaProductos = data;

    //Producto favorito
    let mayor = 0;
    for (let i=0; i<localStorage.length; i++){
        let clave = localStorage.key(i);
        if (localStorage.getItem(clave) >= mayor){
            mayor = localStorage.getItem(clave);
            prodFav = localStorage.key(i);
        }
    }
    // ----------------------

    actualizarProductosDOM();

    // -------------CARRITO

    //--detectar click en producto y agregarlos al array listaCarrito
    for (let i in listaProductos){
        for (let r in listaProductos[i].precio){
            const boton = document.querySelector(`.btn${listaProductos[i].nombre}-${r}`);
            boton.addEventListener("click", () => {
            //si el carrito está vacio
                if (listaCarrito.length==0){
                    listaCarrito.push({"nom" : `${listaProductos[i].nombre}-${r}`, "cant":1,"precio":`${listaProductos[i].precio[r]}`})
                //contar clicks para el local Storage
                    localStorage.setItem(`click${listaProductos[i].nombre}`,parseInt(localStorage.getItem(`click${listaProductos[i].nombre}`))+parseInt(1));
                //generar tarjeta de notificacion
                    Toastify({
                        text: `${listaProductos[i].nombre}-${r} fue agregado al carrito`,
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                    }).showToast();
                }else{
            //si el carrito ya contiene productos
                    let agregar=true;
                //controlar si el producto ya existe en el carrito
                    for (let p in listaCarrito){
                    //si el producto ya existe en el carrito, solo sumarle una unidad
                        if ( listaCarrito[p].nom == `${listaProductos[i].nombre}-${r}`){
                            listaCarrito[p].cant++;
                            listaCarrito[p].precio = listaProductos[i].precio[r] * listaCarrito[p].cant
                            agregar = false;
                            break;
                        }
                    }
                    //si el producto no existe en el carrito, agregar nuevo producto
                    if (agregar){listaCarrito.push({"nom" : `${listaProductos[i].nombre}-${r}`, "cant":1,"precio":`${listaProductos[i].precio[r]}`})}
                    //contar clicks para el local Storage
                    if (localStorage.getItem(`click${listaProductos[i].nombre}`) >=0){
                        localStorage.setItem(`click${listaProductos[i].nombre}`,parseInt(localStorage.getItem(`click${listaProductos[i].nombre}`))+parseInt(1));
                    }
                    //generar tarjeta de notificacion
                    Toastify({
                        text: `${listaProductos[i].nombre}-${r} fue agregado al carrito`,
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                    }).showToast();

                }
            });
        }
    }
    //boton de enviar pedido
    const btnForm = document.querySelector(".btnForm");
    btnForm.addEventListener("click",()=>{
        let totalText = document.querySelector(".precioT");
        let total = totalText.textContent;
        let nomText = document.querySelector(".inputNom");
        let dirText = document.querySelector(".inputDir");
        let nombreCliente = nomText.value;
        let direccionCliente = dirText.value;
        Toastify({
            text: `
            Gracias ${nombreCliente}!
            Pedido Realizado con exito
            Total: ${total}
            Direccion: ${direccionCliente}
            `,
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        nomText.value = "";
        dirText.value = "";
        listaCarrito = [];
        container.classList.toggle("tl-1");
        container.classList.toggle("tl-2");
        actualizarProductosCarrito();
    })
}) //fin del FETCH
