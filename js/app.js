let carrito=[];
let productos=[];

let carritoLS=JSON.parse(localStorage.getItem("carrito"));
console.log(carritoLS.length);

const contadorCarrito = document.querySelector(".contadorCarrito");
contadorCarrito.textContent = carritoLS.length;

const divCol = document.querySelector(".padre");

if(localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
}

// productos.push(new Producto(1,"perfume mas bolso", 1500,"../assets/img-natura-cards/125654_1.jpg"));
// productos.push(new Producto(2,"Kriska Rojo", 2500,"../assets/img-natura-cards/185_1.jpg"));
// productos.push(new Producto(3,"Homen emotion", 6000,"../assets/img-natura-cards/NATARG-97823_1.jpg"));
// productos.push(new Producto(4,"Humor", 7500,"../assets/img-natura-cards/NATARG-1921_1.jpg"));
// productos.push(new Producto(5,"Kaik", 8500,"../assets/img-natura-cards/NATARG-13120_1.jpg"));
// productos.push(new Producto(6,"Homen coragio", 5500,"../assets/img-natura-cards/NATARG-186_1.jpg"));
// localStorage.setItem("productos",JSON.stringify(productos));


divCol.addEventListener("click", (e)=>{
    if (e.target.classList.value==="btn"){

        let elemento = e.target;
        let dataID = elemento.getAttribute('data-id');
        let producto = productos.find((producto)=>producto.id=== +dataID);

        const carritoLS =JSON.parse(localStorage.getItem("carrito"));
        if (carritoLS===null){
            carrito.push(new ItemCarrito(producto,1));
            localStorage.setItem("carrito",JSON.stringify(carrito));

        }else{
        const indexElelment = carritoLS?.findIndex(carr =>{
            return producto.id===carr.producto.id});
        
        if(indexElelment !== undefined && indexElelment !== -1){
            carritoLS[indexElelment].cantidad += 1;
            localStorage.setItem("carrito",JSON.stringify(carritoLS));
            
        }else{
            carrito=[...carritoLS, new ItemCarrito(producto,1) ]
            localStorage.setItem("carrito",JSON.stringify(carrito));
        }}

    }
   
})
let crearElementos=(elemento,clase,nombre,setId, setUrl)=>{
    let etiqueta=document.createElement(elemento);
    etiqueta.classList.add(clase);
    etiqueta.textContent=nombre;
    etiqueta.setAttribute("data-id",setId || "")
    etiqueta.setAttribute("src",setUrl || "" )
    return etiqueta;
}
productos=JSON.parse(localStorage.getItem("productos"));
productos.forEach((producto,index) => {
    
    let divCard = document.createElement("div");
    divCard.classList.add(`card-${index+1}`);
    divCard.classList.add("card");
    
    
    let img = crearElementos("img","card-img-top","","",producto.url);
    img.setAttribute("alt","Imagen del producto");
    divCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    let cardTitle = crearElementos("h5","card-title",producto.nombre);
    let cardPrice = crearElementos("p","card-text","$"+producto.nombre);
    let cardBtn = crearElementos("button","btn","Agregar a la compra",producto.id);
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardBtn);
    
    divCard.appendChild(cardBody);
    
    divCol.appendChild(divCard);
    
});


