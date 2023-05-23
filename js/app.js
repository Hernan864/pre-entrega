let carrito=[];
let productos=[];

const divCol = document.querySelector(".col-sm-4");

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


productos=JSON.parse(localStorage.getItem("productos"));
productos.forEach((producto,index) => {
   
    let divCard = document.createElement("div");
    divCard.classList.add(`card-${index+1}`);
    divCard.classList.add("card");

   
    let img = document.createElement("img");
    img.setAttribute("src", producto.url);
    img.setAttribute("alt","Ima");
    img.classList.add("card-img-top");
    divCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    let cardPrice = document.createElement("p");
    let cardBtn = document.createElement("a");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = producto.nombre;
    cardPrice.classList.add("card-text");
    cardPrice.textContent = "$ "+producto.precio;
    cardBtn.classList.add("btn");
    cardBtn.textContent="Agregar a la compra";
    cardBtn.addEventListener("click",()=>{

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
    })



    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardBtn);

    divCard.appendChild(cardBody);

    divCol.appendChild(divCard);
});



