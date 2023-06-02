let carrito = [];
let productos = [];
let inputBuscar = document.querySelector(".form-control");

const obtenerStorage = (storage) => {
  return JSON.parse(localStorage.getItem(storage));
};

let carritoLS = obtenerStorage("carrito");
// cuenta los productos en el carrito
if (carritoLS.length !== 0) {
  const contadorCarrito = document.querySelector(".contadorCarrito");
  contadorCarrito.textContent = carritoLS.length;
} else {
  const contadorCarrito = document.querySelector(".contadorCarrito");
  contadorCarrito.textContent = 0;
}

// carga el array de carrito desde el storage
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

const cargarProductosLocalStorage = () => {
  productos.push(new Producto(1,"perfume mas bolso",1500,"../assets/img-natura-cards/125654_1.jpg"));
  productos.push(new Producto(2, "Kriska Rojo", 2500, "../assets/img-natura-cards/185_1.jpg"));
  productos.push(new Producto(3,"Homen emotion",6000,"../assets/img-natura-cards/NATARG-97823_1.jpg"));
  productos.push(new Producto(4,"Humor",7500,"../assets/img-natura-cards/NATARG-1921_1.jpg"));
  productos.push(new Producto(5,"Kaik",8500,"../assets/img-natura-cards/NATARG-13120_1.jpg"));
  productos.push(new Producto(6,"Homen coragio",5500,"../assets/img-natura-cards/NATARG-186_1.jpg"));
  localStorage.setItem("productos", JSON.stringify(productos));
};
cargarProductosLocalStorage();

const divCol = document.querySelector(".padre");
// agrega elementos al carrito del storage
divCol.addEventListener("click", (e) => {
  if (e.target.classList.value === "btn") {
    let elemento = e.target;
    let dataID = elemento.getAttribute("data-id");
    let producto = productos.find((producto) => producto.id === +dataID);

    const carritoLS = JSON.parse(localStorage.getItem("carrito"));
    if (carritoLS === null) {
      carrito.push(new ItemCarrito(producto, 1));
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        const indexElelment = carritoLS?.findIndex((carr) => {
        return producto.id === carr.producto.id;
      });

      if (indexElelment !== undefined && indexElelment !== -1) {
        carritoLS[indexElelment].cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(carritoLS));
      } else {
        carrito = [...carritoLS, new ItemCarrito(producto, 1)];
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    }
  }
});

let crearElementos = (elemento, clase, nombre, setId, setUrl) => {
  let etiqueta = document.createElement(elemento);
  etiqueta.classList.add(clase);
  etiqueta.textContent = nombre;
  etiqueta.setAttribute("data-id", setId || "");
  etiqueta.setAttribute("src", setUrl || "");
  return etiqueta;
};
let eliminarDOM = () => {
  let elementosEliminar = document.querySelector(".card");
  elementosEliminar?.remove();
};
let cargarProductosDOM = (producto, index) => {
  let divCard = document.createElement("div");
  divCard.classList.add(`card-${index + 1}`);
  divCard.classList.add("card");

  let img = crearElementos("img", "card-img-top", "", "", producto.url);
  img.setAttribute("alt", "Imagen del producto");
  divCard.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let cardTitle = crearElementos("h5", "card-title", producto.nombre);
  let cardPrice = crearElementos("p", "card-text", "$" + producto.precio);
  let cardBtn = crearElementos("button","btn","Agregar a la compra",producto.id);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardBtn);

  divCard.appendChild(cardBody);

  divCol.appendChild(divCard);
};

productos = JSON.parse(localStorage.getItem("productos"));
let contador=0;
productos.forEach((producto, index) => {
    cargarProductosDOM(producto, index);
  // contador++;
  // if(contador<=3){

  // }else
  // if (contador%3===0){
  //   const row=document.querySelector(".container-fluid");
  //   const newDiv=document.createElement("div");
  //   newDiv.classList.add("padre");
  //   newDiv.classList.add("col-sm-4");
  //   newDiv.classList.add("col-md-4");
  //   newDiv.classList.add("mb-2");
  //   newDiv.classList.add("mt-2");
  //   const newRow=document.createElement("div");
  //   newRow.classList.add("row");
  //   newRow.appendChild(newDiv);
  //   row.appendChild(newRow);
  //   cargarProductosDOM(producto, index);

  // }
});

inputBuscar.addEventListener("change", (e) => {
  e.preventDefault;
  let valorBuscado = e.target.value.toUpperCase();
  let productosLs = obtenerStorage("productos");
  let spam=document.createElement("spam");
  let productosEncontrados = productosLs.filter((producto) => {
    return producto.nombre.toUpperCase().includes(valorBuscado);
  });
  if (productosEncontrados.length !== 0) {
    productosLs.forEach(() => {eliminarDOM();});
    spam=document.querySelector("spam");
    spam?.remove();
    productosEncontrados.forEach((producto, index) => {
      cargarProductosDOM(producto, index);
    });
  } else 
      if(valorBuscado!=="" && productosEncontrados.length === 0){
          productosLs.forEach(() => {eliminarDOM();});
          
          let padre=document.querySelector(".padre");
          spam.textContent="No hay conincidencia con la busqueda realizada"
          padre.appendChild(spam)
          console.log("No hay conincidencia con la busqueda realizada");
      }else 
        if (productosEncontrados.length === 0) {
          spam=document.querySelector("spam");
          spam.remove();
          productosLs.forEach((producto, index) => {
          cargarProductosDOM(producto, index);
          });
        }
});
