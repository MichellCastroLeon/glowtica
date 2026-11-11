document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MENÚ HAMBURGUESA
    ========================= */

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {

        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });

    }


    /* =========================
       CARRITO DE COMPRAS
    ========================= */

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const botonesCarrito = document.querySelectorAll(".btn-carrito");

    const abrirCarrito = document.getElementById("abrir-carrito");
    const cerrarCarrito = document.getElementById("cerrar-carrito");

    const carritoVentana = document.getElementById("carrito");

    const productosCarrito = document.getElementById("productos-carrito");

    const totalCarrito = document.getElementById("total-carrito");

    const contadorCarrito = document.getElementById("contador-carrito");

    const vaciarCarrito = document.getElementById("vaciar-carrito");

    const comprarCarrito = document.getElementById("comprar-carrito");


    /* =========================
       AGREGAR PRODUCTOS
    ========================= */

    botonesCarrito.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const nombre = boton.dataset.nombre;
            const precio = Number(boton.dataset.precio);

            const productoExistente = carrito.find(
                producto => producto.nombre === nombre
            );

            if (productoExistente) {

                productoExistente.cantidad++;

            } else {

                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                });

            }

            guardarCarrito();
            mostrarCarrito();

        });

    });


    /* =========================
       MOSTRAR CARRITO
    ========================= */

    function mostrarCarrito() {

        if (!productosCarrito) return;

        productosCarrito.innerHTML = "";

        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach(function (producto, index) {

            const subtotal = producto.precio * producto.cantidad;

            total += subtotal;

            cantidadTotal += producto.cantidad;

            const item = document.createElement("div");

            item.classList.add("item-carrito");

            item.innerHTML = `

                <h3>${producto.nombre}</h3>

                <p>
                    $${producto.precio.toLocaleString("es-CO")}
                </p>

                <div class="controles-carrito">

                    <button onclick="disminuirCantidad(${index})">
                        −
                    </button>

                    <strong>
                        ${producto.cantidad}
                    </strong>

                    <button onclick="aumentarCantidad(${index})">
                        +
                    </button>

                    <button 
                        class="btn-eliminar"
                        onclick="eliminarProducto(${index})">
                        🗑️
                    </button>

                </div>

                <p>
                    Subtotal:
                    <strong>
                        $${subtotal.toLocaleString("es-CO")}
                    </strong>
                </p>

            `;

            productosCarrito.appendChild(item);

        });


        if (carrito.length === 0) {

            productosCarrito.innerHTML = `
                <p style="text-align:center;">
                    Tu carrito está vacío 🛍️
                </p>
            `;

        }


        if (totalCarrito) {

            totalCarrito.textContent =
                "$" + total.toLocaleString("es-CO");

        }


        if (contadorCarrito) {

            contadorCarrito.textContent = cantidadTotal;

        }

    }


    /* =========================
       AUMENTAR CANTIDAD
    ========================= */

    window.aumentarCantidad = function (index) {

        carrito[index].cantidad++;

        guardarCarrito();
        mostrarCarrito();

    };


    /* =========================
       DISMINUIR CANTIDAD
    ========================= */

    window.disminuirCantidad = function (index) {

        if (carrito[index].cantidad > 1) {

            carrito[index].cantidad--;

        } else {

            carrito.splice(index, 1);

        }

        guardarCarrito();
        mostrarCarrito();

    };


    /* =========================
       ELIMINAR PRODUCTO
    ========================= */

    window.eliminarProducto = function (index) {

        carrito.splice(index, 1);

        guardarCarrito();
        mostrarCarrito();

    };


    /* =========================
       GUARDAR CARRITO
    ========================= */

    function guardarCarrito() {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }


    /* =========================
       ABRIR CARRITO
    ========================= */

    if (abrirCarrito) {

        abrirCarrito.addEventListener("click", function (e) {

            e.preventDefault();

            carritoVentana.classList.add("mostrar");

            mostrarCarrito();

        });

    }


    /* =========================
       CERRAR CARRITO
    ========================= */

    if (cerrarCarrito) {

        cerrarCarrito.addEventListener("click", function () {

            carritoVentana.classList.remove("mostrar");

        });

    }


    /* =========================
       VACIAR CARRITO
    ========================= */

    if (vaciarCarrito) {

        vaciarCarrito.addEventListener("click", function () {

            carrito = [];

            guardarCarrito();
            mostrarCarrito();

        });

    }


    /* =========================
       FINALIZAR COMPRA
    ========================= */

    if (comprarCarrito) {

        comprarCarrito.addEventListener("click", function () {

            if (carrito.length === 0) {

                alert("Tu carrito está vacío.");

                return;

            }

            alert(
                "¡Gracias por tu compra en Glowtica! 💜"
            );

            carrito = [];

            guardarCarrito();
            mostrarCarrito();

        });

    }


       /* =========================
       ACTUALIZAR AL CARGAR
    ========================= */

    mostrarCarrito();


    /* =========================
       BOTÓN VOLVER ARRIBA
    ========================= */

    const btnArriba = document.getElementById("btnArriba");

    if (btnArriba) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                btnArriba.classList.add("mostrar");

            } else {

                btnArriba.classList.remove("mostrar");

            }

        });


        btnArriba.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});