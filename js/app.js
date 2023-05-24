// const productos = [
//   { id: 1, nombre: arroz, precio: 250 },
//   { id: 2, nombre: fideo, precio: 150 },
//   { id: 3, nombre: azucar, precio: 550 },
//   { id: 4, nombre: pan, precio: 750 },
//   { id: 5, nombre: harina, precio: 250 },
// ];
let productosLS=JSON.parse(localStorage.getItem("Productos"));
console.log(productosLS.length);

const contadorCarrito = document.querySelector(".contadorCarrito");
contadorCarrito.textContent = productosLS.length;

