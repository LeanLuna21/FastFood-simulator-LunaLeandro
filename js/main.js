
// //////////////// esto es lo primero que corre al entrar a la pag ////////////////

// url API local
const url = './js/menu-data.json'
// variable que guardara la respuesta del fetch
let menu = []

// traemos los datos de la API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        //filtramos la data por categoria
        const comidas = data.filter(menuOpcion => menuOpcion.category === "comidas")
        const bebidas = data.filter(menuOpcion => menuOpcion.category === "bebidas")
        // la guardamos en la variable global
        menu = data

        //modificamos el dom con cada seccion
        crearSeccionMenu(comidas, "comidas")
        crearSeccionMenu(bebidas, "bebidas")
        //agregamos a los botones de las secciones la funcionalidad
        botonAgregarEventListeners()
        //mostramos el carrito si es que ya existe
        mostrarCarrito()
    })
    .catch((err) => console.log(err))

// funcion que crea la seccion donde se mostrará cada array
function crearSeccionMenu(array, section) {
    // traemos la seccion que se va a llenar
    let menuSection = document.getElementById(section)

    // creo el div del titulo y la search-bar de la seccion
    let sectionTitleBar = document.createElement("div")
    sectionTitleBar.id = `${section}-title-bar`
    // creamos el titulo
    let sectionTitle = document.createElement("h1")
    sectionTitle.classList.add("title")
    sectionTitle.textContent = `Elegi tus ${section}`
    // creamos la searchbar
    let inputSearchBar = document.createElement("input")
    inputSearchBar.id = `${section}-search-bar`
    inputSearchBar.classList.add("search-bar")
    inputSearchBar.placeholder = 'Search'
    // asignamos un eventlistener al input de busqueda
    inputSearchBar.addEventListener("input", (event) => {
        let userInput = event.target.value.toLowerCase()

        const filterItems = (menuOptions) => {
            return menuOptions.filter(option => option.name.toLowerCase().includes(userInput));
        };

        // filtramos el array que llega por parametro, con lo que indique el usuario
        newArray = filterItems(array)
        // Si el array no esta vacio, llamamos a la fx mostrarMenu para actualizar el dom con el nuevo array filtrado
        newArray.length > 0 ? mostrarMenu(newArray) : opcionMenuNoDisponible(array[0])
        // sino se llama a la funcion que muestra un mensaje en el dom

        // reasignamos las funciones de "agregar" a los botones del DOM ahora que se actualizaron
        botonAgregarEventListeners()
    })

    // apendeamos ambos al div y apendeamos el div barra a la seccion
    sectionTitleBar.append(sectionTitle, inputSearchBar)
    menuSection.append(sectionTitleBar)

    // creamos el div donde iran las opciones de los menú
    let menuOptionsContainer = document.createElement("div")
    menuOptionsContainer.id = `menu-${section}`
    menuOptionsContainer.classList.add("menu-options")
    menuSection.append(menuOptionsContainer)

    mostrarMenu(array)
}

// funcion que llena la seccion con los objetos del array
function mostrarMenu(array) {
    // llamamos al div donde iran las opciones del menu
    let menuOptionsContainer = document.getElementById(`menu-${array[0].category}`) //el id va a ser igual a la categoria de los elementos del array(comidas/bebidas)

    let sectionHTML = ""
    // iteramos el array de comidas o bebidas que llega por parametro y creamos el html para cada opcion del menu
    for (let option of array) {
        // += para que no se reescriba el contenido del html, sino que se sume
        sectionHTML += `
        <div class="menu-card" id=${option.id}>
          <img src=${option.img} alt=${option.description}>
          <div class="menu-card-info">
            <h3>${option.name}</h3>
            <p>${option.description}</p>
            <div class="price-button">
                <b>$${option.price.toFixed(2)}</b>
                <button class="add-to-cart" data-id=${option.id}>Agregar</button>
            </div>
          </div>
        </div>
        `
    }
    // añadimos los objetos a la seccion
    menuOptionsContainer.innerHTML = sectionHTML
}

// recibe el objeto de la seccion correspondiente donde se mostrara el mensaje de "NOT FOUND"
function opcionMenuNoDisponible(objeto) {
    let menuOptionsContainer = document.getElementById(`menu-${objeto.category}`)
    menuOptionsContainer.innerHTML = `
        <div class="menu-card">
            <div class="menu-card-info">
                <h3>¡Oops!</h3>
                <p>no disponemos de esa opción en este momento.</p>
            </div>
        </div>
    `
}

// asigna eventos a los botones de "agregar"
function botonAgregarEventListeners() {
    // traemos todos los botones de "agregar"
    let botonesAdd = document.querySelectorAll(".add-to-cart")

    // por cada boton del array
    botonesAdd.forEach(boton => {
        // cuando el usuario clickee, se añade la opcion a la orden
        boton.removeEventListener("click", eventoAgregarAlCarrito),
        boton.addEventListener("click", eventoAgregarAlCarrito)
    })
}

function eventoAgregarAlCarrito(event){
    // recupera el id de la opcion a donde se dispare el evento
    const optionMenuID = event.target.getAttribute("data-id")
    // lo agregamos al carrito
    addToCart(optionMenuID)
    // agregamos efecto usando la libreria Toastify
    Toastify({
        text: "¡Orden agregada!",
        duration: 1500,
        className: "info",
        gravity: "bottom",
        stopOnFocus: false,
        offset: {
            x: 0,
            y: 5,
        },
        style: {
            'font-size': '12px',
            'font-weight': 600,
            padding: '8px 15px',
            color:"black",
            background: "linear-gradient(to right,  hsl(44deg 100% 56%) 0%, hsl(46deg 100% 71%) 40%,hsl(53deg 100% 83%) 100%)",
            border: '0.5px solid black',
            'border-radius': '0.8rem',
            opacity: 0.9,
            transition: 'all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)',
            cursor: 'default'
        }
    }).showToast();
}

function addToCart(menuID) {
    // creamos un carrito que contendra lo guardado en localStorage o si no, un array vacio
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    
    // usamos HOF .find para traer el objeto de nuestro array que coincida con el id que tenemos
    let optionMenu = menu.find(option => option.id === menuID)

    // y buscamos si ese elemento tambien ya esta en nuestro carrito
    let ordenesEnCarrito = carrito.find(orden => orden.id === menuID)

    // si ya existe
    if (ordenesEnCarrito) {
        // le sumamos 1 a la cantidad y calculamos el precio total
        ordenesEnCarrito.quantity += 1
        ordenesEnCarrito.totalPrice = ordenesEnCarrito.quantity * ordenesEnCarrito.price
    } else {
        // sino pusheamos el objeto optionMenu que trajimos antes al carrito (le agregamos prop cantidad, y $ total)
        carrito.push({
            ...optionMenu,
            quantity: 1,
            totalPrice: optionMenu.price
        })
    }
    // guardamos en el localstorage el objeto carrito con los cambios
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // mostramos el carrito
    mostrarCarrito();
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []

    // traemos el contenedor donde iran las ordenes
    let pedidosSeccion = document.querySelector("#contenedor-pedidos")
    // inicializamos el contenido del contenedor vacio
    pedidoHTML = ""
    // cada pedido agragado al carrito
    for (let pedido of carrito) {

        // le damos la estructura html
        pedidoHTML += `
    <div class="lista-pedido" id=${pedido.id}>
        <div class="item-pedido" id=${pedido.id}>
            <p>${pedido.name}</p>
            <p>(${pedido.quantity})</p>
            <p>$${pedido.price}</p>
            <div class="price-button">
                <b>$${pedido.totalPrice.toFixed(2)}</b>
                <button class="eliminar-orden" data-id=${pedido.id}>
                <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>

    `
    }

    // agregamos la estructura creada a la seccion contenedora
    pedidosSeccion.innerHTML = pedidoHTML

    // agregar funcionalidad para eliminar del carrito
    document.querySelectorAll('.eliminar-orden').forEach(boton => {
        boton.addEventListener('click', () => {
            let menuID = boton.getAttribute('data-id')
            eliminarDelCarrito(menuID) //llamamos a la fx elimiar declarada abajo
            Toastify({
                text: "¡Orden Eliminada!",
                duration: 1500,
                className: "info",
                gravity: "bottom",
                stopOnFocus: false,
                offset: {
                    x: 0,
                    y: 5,
                },
                style: {
                    'font-size': '12px',
                    'font-weight': 600,
                    padding: '8px 15px',
                    color:"white",
                    background: "linear-gradient(to top, hsl(0deg 79% 36%) 10%, hsl(22deg 81% 37%) 63%, hsl(36deg 85% 37%) 99%",
                    border: '0.5px solid black',
                    'border-radius': '0.8rem',
                    opacity: 0.9,
                    transition: 'all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)',
                    cursor: 'default'
                }
            }).showToast();
        });
    });

    // HOF .reduce para sumar los totales de cada pedido
    let totalCarrito = carrito.reduce((acc, pedido) => acc + pedido.totalPrice, 0);
    // traemos la seccion donde se muestra el carrito
    let seccionCarrito = document.querySelector("#seccion-carrito")
    // traemos el contenedor donde mostraremos el total
    let carritoTotalPrice = document.querySelector(".contenedor-importe-total")

    // si el carrito tiene ordenes, mostramos el total del pedido.
    if (totalCarrito > 0) {
        seccionCarrito.classList.remove("hidden-box") //removemos la clase para que se vea la seccion en pantalla
        cartButtonPopper()
        carritoTotalPrice.innerHTML = `
        <p>El total de su pedido es de: <b>$${totalCarrito.toFixed(2)}</b></p>
        <a><button class="btn btn-outline-warning btn-sm m-2">Realizar pedido <i class="fa-brands fa-whatsapp"></i></button></a>`
        let boton = carritoTotalPrice.lastElementChild
        boton.setAttribute("href", "https://wa.me/FastFeedOrderBot")

    } else {
        // sino esta vacio, entonces escondemos la seccion
        seccionCarrito.classList.add("hidden-box")
    }

}

function eliminarDelCarrito(menuID) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoEditado
    let menuOptionToDelete = carrito.find(orden => orden.id === menuID)

    // si del objeto a eliminar, la cantidad es mayor a uno, restamos 1 del carrito y actualizamos el precioTotal de la orden
    if (menuOptionToDelete.quantity > 1) {
        menuOptionToDelete.quantity -= 1
        menuOptionToDelete.totalPrice = menuOptionToDelete.quantity * menuOptionToDelete.price
        carritoEditado = carrito
    } else {
        // sino HOF .filter() para mantener los elementos que NO coincidan con el ID que le pasamos
        carritoEditado = carrito.filter(orden => orden.id !== menuID)
    }

    localStorage.setItem('carrito', JSON.stringify(carritoEditado))
    mostrarCarrito()
}

// funcion que crea el boton para ir al carrito en el div del html correspondiente
function cartButtonPopper() {
    let containerCarrito = document.querySelector("#cart-button")
    containerCarrito.classList.add("cart-button-container")

    let carritoButton = document.createElement("button")
    carritoButton.innerHTML = '<i class="fa-solid fa-cart-shopping"> </i>'

    carritoButton.addEventListener("click", () => {
        let carritoSection = document.querySelector("#seccion-carrito")
        carritoSection.scrollIntoView()
    })

    containerCarrito.replaceChildren(carritoButton)
}

