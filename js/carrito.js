const obtenerDatosCarrito = () => {
    const carritoLS = JSON.parse(localStorage.getItem("carrito"));
    const tbody = document.querySelector("tbody");
    if (carritoLS && tbody) {

        let sumaSubtotal = 0;
        carritoLS.forEach(ele => {
            const tr = document.createElement("tr");


            const tdNombre = document.createElement("td");
            tdNombre.textContent = ele.producto.nombre;

            const tdPrecio = document.createElement("td");
            tdPrecio.textContent = ele.producto.precio;

            const tdCantidad = document.createElement("td");
            tdCantidad.textContent = ele.cantidad;

            const tdSubtotal = document.createElement("td");
            tdSubtotal.textContent = ele.cantidad * ele.producto.precio;
            sumaSubtotal += ele.cantidad * ele.producto.precio;
            tr.appendChild(tdNombre);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdCantidad);
            tr.appendChild(tdSubtotal);

            tbody.appendChild(tr);


        })
        const total = document.querySelector(".total");
        total.textContent = sumaSubtotal;
    }


}
obtenerDatosCarrito();

