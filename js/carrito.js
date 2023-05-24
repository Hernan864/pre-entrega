let tabla=document.querySelector("table");

tabla.addEventListener("click",(e)=>{

    if(e.target.getAttribute("data-id")!== null && e.target.innerText === "Eliminar"){
        let carritoLS =  JSON.parse(localStorage.getItem("carrito"));
        let idElemento= +e.target.getAttribute("data-id");
        const indexElelment = carritoLS?.findIndex(carr =>{return idElemento === carr.producto.id});
        carritoLS.splice(indexElelment,1);
        localStorage.setItem("carrito",JSON.stringify(carritoLS));
        location.reload();
    }
    
})

let crearElemento=(elemento,contenidoTexto)=>{
    let etiqueta=document.createElement(elemento);
    etiqueta.textContent=contenidoTexto;
    return etiqueta;

}

const obtenerDatosCarrito = () => {
    const carritoLS = JSON.parse(localStorage.getItem("carrito"));
    const tbody = document.querySelector("tbody");
    if (carritoLS && tbody) {

        let sumaSubtotal = 0;
        carritoLS.forEach(ele => {
            const tr = document.createElement("tr");

            const tdNombre =crearElemento("td",ele.producto.nombre);
            const tdPrecio = crearElemento("td",ele.producto.precio);
            const tdCantidad = crearElemento("td",ele.cantidad);
            const tdSubtotal = crearElemento("td",ele.cantidad * ele.producto.precio);

            sumaSubtotal += ele.cantidad * ele.producto.precio;

            const tdEliminar=document.createElement("td");
            const btnEliminar = crearElemento("button","Eliminar");
            btnEliminar.setAttribute("data-id", ele.producto.id);
            tdEliminar.appendChild(btnEliminar);


            tr.appendChild(tdNombre);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdCantidad);
            tr.appendChild(tdSubtotal);
            tr.appendChild(tdEliminar);

            tbody.appendChild(tr);


        })
        const total = document.querySelector(".total");
        total.textContent = sumaSubtotal;
    }


}
obtenerDatosCarrito();

