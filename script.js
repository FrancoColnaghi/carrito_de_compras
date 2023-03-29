'use strict'

//CAMBIO PRODUCTOS-CARRITO

const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");

container.classList.add("tl-1");

btn.addEventListener("click", () => {
    container.classList.toggle("tl-1");
    container.classList.toggle("tl-2");
})
btn2.addEventListener("click", () => {
    container.classList.toggle("tl-1");
    container.classList.toggle("tl-2");
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

console.log(listaProductos)

const contProd = document.querySelector(".container-products");

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

// asd

for (let i in listaProductos){
    for (let r in listaProductos[i].precio){
        const boton = document.querySelector(`btn${listaProductos[i].nombre}-${r}`);
        //console.log(`btn${listaProductos[i].nombre}-${r}`)
        boton.addEventListener("click",()=>{
            console.log(`btn${listaProductos[i].nombre}-${r}`);
        });
    }
}