'use strict'

//CAMBIO PRODUCTOS-CARRITO

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

//CARGA DE PRODUCTOS

var listaProductos = [];

function crearProducto(nom,des,pre,img,precio){
    let prod = new Object()
    prod.nombre = nom;
    prod.descripcion = des;
    prod.precio = pre;
    prod.img = img;
    prod.precio = precio 

    listaProductos.push(prod);
}

crearProducto("Zeus","hamburguesa, cheddar y panceta",1200,"zeusIMG",{simple:500,doble:600,triple:700});
crearProducto("Hera","hamburguesa, lechuga y tomate",1000,"heraIMG",{simple:500,doble:600,triple:700});
crearProducto("Gea","hamburguesa, barbacoa, cebolla y panceta",1100,"geaIMG",{simple:500,doble:600,triple:700});
crearProducto("Afrodita","hamburguesa, pimientos y queso azul",1150,"afroditaIMG",{simple:500,doble:600,triple:700});
crearProducto("Atenea","hamburguesa, rucula y tomate",950,"ateneaIMG",{simple:500,doble:600,triple:700});
crearProducto("Dionisio","hamburguesa, solo cheddar",90,"dionisioIMG",{simple:500,doble:600,triple:700});
crearProducto("Hades","Lomo, lechuga, tomate y huevo",1150,"hadesIMG",{simple:600,doble:800});
crearProducto("Cronos","Lomo, panceta, cheddar y barbacoa",1150,"cronosIMG",{simple:600,doble:800});

const contProd = document.querySelector(".container-products");

//Producto favorito
let prodFav = "";
let mayor = 0;
for (let i=0; i<localStorage.length; i++){
    let clave = localStorage.key(i);
    // console.log(clave);
    if (localStorage.getItem(clave)>mayor){
        mayor = localStorage.getItem(clave);
        prodFav = localStorage.key(i);
    }
}
console.log(prodFav)
// ----------------------

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
            //console.log(indice+" "+listaProductos[i].precio[indice]);
            let btn = document.createElement("BUTTON");
            btn.classList.add(`btn${listaProductos[i].nombre}-${indice}`);
            texto = document.createTextNode(`${indice} - $${listaProductos[i].precio[indice]}`);
            btn.appendChild(texto);
            comprar.appendChild(btn);
        }

        contProd.appendChild(card)
    }
}

actualizarProductosDOM();

// -------------CARRITO
//--array vacio para almacenar los elementos del carrito
var listaCarrito = [];

//--detectar click en producto y agregarlos al array listaCarrito
//--controla tambien los repetidos
for (let i in listaProductos){
    for (let r in listaProductos[i].precio){
        const boton = document.querySelector(`.btn${listaProductos[i].nombre}-${r}`);
        boton.addEventListener("click", () => {
            if (listaCarrito.length==0){
                listaCarrito.push({"nom" : `${listaProductos[i].nombre}-${r}`, "cant":1,"precio":`${listaProductos[i].precio[r]}`})
                //contar clicks para el local Storage
                localStorage.setItem(`click${listaProductos[i].nombre}`,parseInt(localStorage.getItem(`click${listaProductos[i].nombre}`))+parseInt(1));
            }else{
                let agregar=true;
                for (let p in listaCarrito){
                    if ( listaCarrito[p].nom == `${listaProductos[i].nombre}-${r}`){
                        listaCarrito[p].cant++;
                        listaCarrito[p].precio = listaProductos[i].precio[r] * listaCarrito[p].cant
                        agregar = false;
                        break;
                    }
                }
                if (agregar){listaCarrito.push({"nom" : `${listaProductos[i].nombre}-${r}`, "cant":1,"precio":`${listaProductos[i].precio[r]}`})}
                //contar clicks para el local Storage
                if (localStorage.getItem(`click${listaProductos[i].nombre}`) >=0){
                    localStorage.setItem(`click${listaProductos[i].nombre}`,parseInt(localStorage.getItem(`click${listaProductos[i].nombre}`))+parseInt(1));
                }
            }
            console.log(listaCarrito);
        });
    }
}

//--generar elementos del carrito en DOM

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
            listaCarrito.splice(i,1);
            //console.log(`eliminar${i}`)
            actualizarProductosCarrito();
        });
        
        var texto = document.createTextNode(`X`);
        btnEliminar.appendChild(texto);
        linea.appendChild(btnEliminar)
    }
    console.log(btnEliminar);
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
        precio.classList.add("precio");
        let total = 0;
        for (let p in listaCarrito){
            total = total+parseInt(listaCarrito[p].precio);
        }
        var texto = document.createTextNode(`$${total}`);
        precio.appendChild(texto);
        linea.appendChild(precio)
}

