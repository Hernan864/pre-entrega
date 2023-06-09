let tabla=document.querySelector("table");
let section=document.querySelector("section");


let numeroFactura=0;
let idcliente=1;
let facturaLS=[];
let factura=[];

const obtenerStorage=(storage)=>{
    return JSON.parse(localStorage.getItem(storage));
}
facturaLS=obtenerStorage("factura");
if (facturaLS?.length){
    numeroFactura=facturaLS.length;
}else{
    numeroFactura=0;
}


tabla.addEventListener("click",(e)=>{
    if(e.target.getAttribute("data-id")!== null && e.target.innerText === "Eliminar"){
        let carritoLS =  JSON.parse(localStorage.getItem("carrito"));
        let idElemento= +e.target.getAttribute("data-id");
        const indexElelment = carritoLS?.findIndex(carr =>{return idElemento === carr.producto.id});
        carritoLS.splice(indexElelment,1);
        localStorage.setItem("carrito",JSON.stringify(carritoLS));
        location.reload();
    }
});
const vaciarLS=(vaciarLS,nombreLS)=>{
    vaciarLS=[];
    localStorage.setItem(nombreLS,JSON.stringify(vaciarLS));
    location.reload();
}
section.addEventListener("click",(e)=>{
    if(e.target.classList[0]==="vaciarBtn"){
        carritoLS=obtenerStorage("carrito");
        console.log("carritols",carritoLS)
        if (carritoLS.length!==0){
          
            Swal.fire({
                title: 'Esta seguro?',
                text: "No podrás revertir esto.!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, vaciar.!'
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Carrito vaciado!',
                        'sus productos fueron eliminados.',
                        'success'
                        ).then(()=>{
                            
                            vaciarLS(carritoLS,"carrito");
                            actualizarContador();
                        })
                }
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito esta vacio!',
              })
        }
    }else
    if(e.target.classList[0]==="comprarBtn"){
        carritoLS=obtenerStorage("carrito");
        if(carritoLS.length!==0){
            Swal.fire({
                title: 'Confirmacion de compra',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Compra realizada',
                        '',
                        'success'
                        ).then(()=>{
                            if (numeroFactura===0){
                                factura.push(new Factura(numeroFactura, idcliente, carritoLS));
                                localStorage.setItem("factura",JSON.stringify(factura));
                            }else if(carritoLS.length)
                            {
                                factura=[...facturaLS,new Factura(numeroFactura, idcliente, carritoLS)];
                                localStorage.setItem("factura",JSON.stringify(factura))
                            }
                            vaciarLS(carritoLS,"carrito");
                        })
                }
              })
         
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos en su carrito!',
              })
            // alert("No hay productos para su compra");
        }
    }
})

const crearElemento=(elemento,contenidoTexto)=>{
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

