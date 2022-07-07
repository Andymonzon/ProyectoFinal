import { obtenerProductos, obtenerProducto } from "./firebase.js";

const carro = []

let precioTotal = 0;

const btnFinalizarCompra = document.querySelector(".btnFinalizarCompra");

const btnCancelarCompra = document.querySelector(".btnCancelarCompra");

const vaciarCarro = () => {

    precioTotal = 0;

    document.querySelector(".total").textContent = precioTotal;

    carro.length = 0;

    document.querySelector(".carroInterior").innerHTML = "";

};

btnFinalizarCompra.addEventListener("click", vaciarCarro);

btnCancelarCompra.addEventListener("click", vaciarCarro);

const renderizarCarro = () => {

    const carroInterior = document.querySelector(".carroInterior");

    carroInterior.innerHTML = "";

    carro.forEach(producto => {

        const tarjeta = document.createElement("div")

        tarjeta.classList = "card mb-3";

        tarjeta.innerHTML = `
        
            <div class="row g-0">

                <div class="col-md-4">
                    <img src=${producto.data().img} class="img-fluid rounded-start" alt=${producto.data().nombre}>
                </div>
                
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.data().nombre}</h5>
                        <p class="card-text">$${producto.data().precio}</p>
                    </div>
                </div>
                
            </div>

        `;

        carroInterior.append(tarjeta);

    });

};

const revisarCarro = (id) => carro.some(producto => producto.id === id);

const actualizarTotal = (precio) => {

    const total = document.querySelector(".total");

    precioTotal += precio;

    total.textContent = precioTotal;

};

const agregarAlCarro = async (e) => {

    if (revisarCarro(e.target.id)) {

        return false;
        
    }
    else{

        const enviarProductoAlCarro = await obtenerProducto(e.target.id);

        actualizarTotal(enviarProductoAlCarro.data().precio);

        carro.push(enviarProductoAlCarro); 

        renderizarCarro();

    }

    

};

function agregarEvento(){

    const botonesComprar = document.querySelectorAll(".botonComprar");
    
    botonesComprar.forEach(btn => btn.addEventListener("click", agregarAlCarro));
    
};

const renderizarCartas = async (productosArr) => {

    const productos = await productosArr;

    const tarjetas = document.querySelector(".tarjetas");

    productos.forEach(producto => {

        const tarjeta = document.createElement("div");
        
        tarjeta.classList = "card col-12 col-xl-4 col-md-6 col-sm-6";

        tarjeta.innerHTML = `

            <img src=${producto.data().img} class="card-img-top celularesImg" alt=${producto.data().nombre}>

            <div class="card-body">
                <h5 class="card-title">${producto.data().nombre}</h5>
                <p class="card-text text-success">$${producto.data().precio}</p>
                <a href="#" class="btn btn-primary botonComprar" id=${producto.id}>Añadir al carrito</a>
            </div>

        `;

        tarjetas.append(tarjeta);

    });

    agregarEvento();

};

renderizarCartas(obtenerProductos());