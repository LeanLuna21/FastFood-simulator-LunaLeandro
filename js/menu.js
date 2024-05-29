const comidas = [
    {
        id: 'ffprod-202402',
        name: 'Hamburguesa Completa',
        price: 6.99,
        img: './assets/icons/hamburguesa.png',
        description: 'Una jugosa hamburguesa de res con queso derretido, lechuga, tomate y pepinillos en un pan tostado.'
    },
    {
        id: 'ffprod-202403',
        name: 'Nuggets de Pollo',
        price: 4.49,
        img: 'https://picsum.photos/200/300?random=2',
        description: 'Crujientes nuggets de pollo dorados, servidos con la salsa de tu elección.'
    },
    {
        id: 'ffprod-202404',
        name: 'Hamburguesa Vegana',
        price: 6.49,
        img: 'https://picsum.photos/200/300?random=3',
        description: 'Una deliciosa hamburguesa de lentejas con vegetales frescos y una salsa picante.'
    },
    {
        id: 'ffprod-202405',
        name: 'Ensalada César',
        price: 5.49,
        img: 'https://picsum.photos/200/300?random=5',
        description: 'Lechuga romana fresca, crutones, queso parmesano y aderezo César.'
    },
    {
        id: 'ffprod-202407',
        name: 'Sandwich de Pollo',
        price: 6.99,
        img: 'https://picsum.photos/200/300?random=6',
        description: 'Pechuga de pollo a la parrilla con lechuga, tomate y mayonesa en un pan tostado.'
    },
    {
        id: 'ffprod-202413',
        name: 'Hamburguesa BBQ con Tocino',
        price: 7.49,
        img: 'https://picsum.photos/200/300?random=12',
        description: 'Una hamburguesa de res con salsa BBQ, tocino, queso y aros de cebolla en un pan tostado.'
    },
    {
        id: 'ffprod-202408',
        name: 'Wrap de Pollo César',
        price: 5.99,
        img: 'https://picsum.photos/200/300?random=14',
        description: 'Pollo a la parrilla, lechuga romana, queso parmesano y aderezo César envueltos en una tortilla.'
    },
    {
        id: 'ffprod-202406',
        name: 'Sándwich de Pollo Picante',
        price: 6.49,
        img: 'https://picsum.photos/200/300?random=9',
        description: 'Un filete de pollo picante a la plancha con salsa BBQ en pan de campo.'
    },
];

const bebidas = [
    {
        id: 'ffprod-12301',
        name: 'Coca-Cola',
        price: 4.99,
        img: 'https://picsum.photos/200/300?random=21',
        description: 'Una bebida de cola clásica y refrescante.'
    },
    {
        id: 'ffprod-12302',
        name: 'Pepsi',
        price: 4.99,
        img: 'https://picsum.photos/200/300?random=22',
        description: 'Una popular soda con sabor a cola.'
    },
    {
        id: 'ffprod-12303',
        name: 'Sprite',
        price: 4.99,
        img: 'https://picsum.photos/200/300?random=23',
        description: 'Una soda crujiente y refrescante con sabor a limón-lima.'
    },
    {
        id: 'ffprod-12304',
        name: 'Fanta Naranja',
        price: 4.99,
        img: 'https://picsum.photos/200/300?random=25',
        description: 'Una soda afrutada y burbujeante con sabor a naranja.'
    },
    {
        id: 'ffprod-12305',
        name: 'Jugo de Naranja',
        price: 2.99,
        img: 'https://picsum.photos/200/300?random=30',
        description: 'Un jugo de naranja exprimido, fresco y ácido.'
    },
    {
        id: 'ffprod-12306',
        name: 'Limonada',
        price: 3.49,
        img: 'https://picsum.photos/200/300?random=27',
        description: 'Una limonada clásica hecha con limones frescos.'
    },
    {
        id: 'ffprod-12307',
        name: 'Agua',
        price: 1.49,
        img: 'https://picsum.photos/200/300?random=29',
        description: 'Una botella de agua refrescante para saciar tu sed.'
    },
    {
        id: 'ffprod-12308',
        name: 'Agua con gas',
        price: 1.59,
        img: 'https://picsum.photos/200/300?random=30',
        description: 'Agua carbonatada hidratante y nutritiva.'
    }
];

// funciones que corren al iniciar
mostrarMenu(comidas, '#menu-comidas') 
mostrarMenu(bebidas, '#menu-bebidas')  
buttonAddEventListener()
mostrarCarrito()

// para no repetir codigo, creamos una fx que recibe un array(que luego iteraremos para mostrar en pantalla) y la seccion donde se mostraran esos elementos
function mostrarMenu(array, sectionID) {
    let section = document.querySelector(sectionID);
    let sectionHTML = "";

    // iteramos el array de comidas o bebidas y creamos el html para cada opcion del menu
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
        `;
    }
    // añadimos los objetos a la seccion
    section.innerHTML = sectionHTML;
}

// funcion que le da a los botones el evento on-click para añadirlos al pedido.
function buttonAddEventListener(){
    // traemos todos los botones creados en la fx anterior
    let botonesAdd = document.querySelectorAll(".add-to-cart")

    // por cada boton del array
    botonesAdd.forEach(boton => {
        // añadimos un EventListener cuando el usuario haga click
        boton.addEventListener("click", () => {
            // que recupere el id de la opcion a la que pertenezca el boton
            const optionMenuID = boton.getAttribute("data-id")
            // lo añadimos al carrito
            addToCart(optionMenuID)
        })
    })
}

// para añadir productos al carrito, necesitamos almacenarlo en el localStorage
function addToCart(menuID) {
    // creamos un carrito que contendra lo guardado en localStorage o si no, un array vacio
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    
    // usamos HOF .find para traer el objeto de nuestro array de productos que coincida con nuestro array
    let optionMenu = comidas.find(option => option.id === menuID) || bebidas.find(option => option.id === menuID)

    // y buscamos si ese elemento tambien ya esta en nuestro carrito
    let ordenesEnCarrito = carrito.find(orden => orden.id === menuID)

    // si ya existe
    if (ordenesEnCarrito){
        // le sumamos 1 a la cantidad y calculamos el precio total
        ordenesEnCarrito.quantity += 1
        ordenesEnCarrito.totalPrice = ordenesEnCarrito.quantity * ordenesEnCarrito.price
    } else {
        // pusheamos el objeto optionMenu que trajimos antes
        carrito.push({
            id: menuID,
            name: optionMenu.name,
            price: optionMenu.price,
            quantity: 1,
            totalPrice: optionMenu.price
        })
    }
    // guardamos en el localstorage el objeto carrito con los cambios
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // mostramos el carrito
    mostrarCarrito();
}

function mostrarCarrito(){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []

    // iniciamos contador en 0 para mostrar el nro de orden
    let count = 0
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
                <span> ${++ count}) </span>
                <p>${pedido.name}</p>
                <p>${pedido.price}</p>
                <p>${pedido.quantity}</p>
                <div class="price-button">
                    <b>$${pedido.totalPrice.toFixed(2)}</b>
                    <button class="eliminar-orden" data-id=${pedido.id}>
                        Eliminar
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
        });
      });

    // HOF .reduce para sumar los totales de cada pedido
    let totalCarrito = carrito.reduce((acc, pedido) => acc + pedido.totalPrice, 0);
    // traemos la seccion donde se muestra el carrito
    let seccionCarrito = document.querySelector("#seccion-carrito")
    // traemos el contenedor donde mostraremos el total
    let carritoTotalPrice = document.querySelector(".contenedor-importe-total")

    // si el carrito tiene ordenes, mostramos el total del pedido.
    if (totalCarrito > 0){
        seccionCarrito.classList.remove("hidden-box") //removemos la clase para que se vea la seccion en pantalla
        carritoTotalPrice.innerHTML = `<p>El total de su pedido es de: <b>$${totalCarrito.toFixed(2)}</b></p>`
    } else {
        // sino esta vacio, entonces escondemos la seccion
        seccionCarrito.classList.add("hidden-box")
    }

}

function eliminarDelCarrito(menuID) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // HOF .filter() para mantener los elementos que NO coincidan con el ID que le pasamos
    let carritoEditado = carrito.filter(orden => orden.id !== menuID)

    localStorage.setItem('carrito', JSON.stringify(carritoEditado))
    mostrarCarrito()
}



// dark mode toggler
let btnColorMode = document.querySelector("#color-mode");
let btnColorIcon = document.querySelector("#color-mode-icon");
let nav = document.querySelector(".navbar")

btnColorMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        btnColorIcon.classList.replace("fa-lightbulb","fa-moon")
        nav.classList.replace("navbar-light","navbar-dark")
        nav.classList.replace("bg-light","bg-dark")
    } else {
        btnColorIcon.classList.replace("fa-moon","fa-lightbulb")
        nav.classList.replace("navbar-dark","navbar-light")
        nav.classList.replace("bg-dark","bg-light")
        
    }
})