// bot de toma de pedidos
alert("¡Bienvenidx a FastFeed!\n\ \n\ Vamos a tomar su orden.\n\ Siga los pasos hasta completar el pedido.")

// array donde se almacenaran los pedidos
let pedidos = []

// funcion que pide al usuario seleccionar su menu
function tomarOrden() {

    // variables para almacenar el menu elegido y el precio total por orden
    let comidaElegida
    let totalPedido = 0

    let menuComida
    // pedimos al usuario que ingrese opcion (siempre y cuando sea una de las disponibles)
    do {
        menuComida = parseInt(prompt("Seleccione Comida: \n\
        1. Hamburguesa Completa -> $3000\n\
        2. Churrasquito caramelizado -> $4500\n\
        3. Opcion vegana -> $5000\n\
        4. Omitir / Continuar\n\ \n\
        Cada opcion incluye guarnición de papas"))

        switch (menuComida) {
            // asignamos la opcion a la variable creada al principio y sumamos el precio al total de este pedido
            case 1:
                comidaElegida ="Hamburguesa Completa"
                totalPedido += 3000
                break
            case 2:
                comidaElegida ="Churrasquito Caramelizado"
                totalPedido += 4500
                break
            case 3:
                comidaElegida ="Menu Vegano"
                totalPedido += 5000
                break
            case 4:
                comidaElegida="Sin comida"
                totalPedido += 0
                break
            default:
                alert("La opcion elegida no es valida.")
        }
    } while (menuComida < 1 || menuComida > 4 || isNaN(menuComida))

    let bebidaElegida
    let menuBebida
    // repetimos para la bebida
    do {
        menuBebida = parseInt(prompt("Seleccione Bebida: \n\
    1. Gaseosa -> $1000\n\
    2. Agua sin gas -> $800\n\
    3. Jugo Exprimido -> $1500\n\
    4. Omitir"))

        switch (menuBebida) {
            case 1:
                bebidaElegida="Gaseosa"
                totalPedido += 1000
                break
            case 2:
                bebidaElegida="Agua sin gas"
                totalPedido += 800
                break
            case 3:
                bebidaElegida="Jugo exprimido"
                totalPedido += 1500
                break
            case 4:
                bebidaElegida="Sin bebida"
                totalPedido += 0
                break
            default:
                alert("la opcion elegida no es valida")
        }
    } while (menuBebida < 1 || menuBebida > 4 || isNaN(menuBebida))

    // si el usuario realizo algun pedido, ya sea comida o gaseosa
    let tamanioCombo = "-"
    if (menuComida != 4 || menuBebida != 4) {
        // preguntamos si desea agrandar su orden
        let extra = prompt("¿Desea agrandar el combo por $500?")
        // mostramos el resultado por consola y lo sumamos al total del pedido
        if (extra === null) {
            extra = "no"
        }
        if (extra == "" || extra.toLowerCase() === "si") {
            tamanioCombo = "Combo agrandado"
            totalPedido += 500
        } else {
            tamanioCombo = "Tamaño regular"
        }
    }

    // por ultimo, agregamos las opciones elegidas (comida, bebida, extra y total por pedido) al array de pedidos 
    let pedidoAgregar = {
        comida: comidaElegida,
        bebida: bebidaElegida,
        tamanio: tamanioCombo,
        importe: totalPedido
    }
    pedidos.push(pedidoAgregar)
}

// funcion principal (corre al iniciarse) - 
let decision
do {
    // llama a la funcion para tomar un pedido
    tomarOrden()

    // y pregunta si desea realizar algun otro pedido
    decision = prompt("¿Desea realizar otra orden (si/no)?")

    // si se apreta el boton "cancelar" entonces la desicion es "no" > esto para que al llamar a .toLowerCase no de error
    if (decision === null) {
        decision = "no"
    }
} while (decision.toLowerCase() != "no")

// funcion que calcula el monto total de las ordenes realizadas para mostrar al usuario el importe a pagar.
function calcularTotal() {
    // HOF - metodo reduce para acumular todos los importes del array en un valor total
    let totalAPagar = pedidos.reduce((valorTotal, pedidos) => valorTotal + pedidos.importe, 0)
    return totalAPagar
}

// modificamos el dom con los menu seleccionados para finalizar
// iniciamos contador en 0 para mostrar el nro de orden
count=0
let contenedorPedidos = document.querySelector("#contenedor-pedidos")

// iteramos el array pedidos
pedidos.forEach(pedido =>{
    // creamos una lista con un item
    let pedidosLista = document.createElement("ul")
    pedidosLista.classList.add("lista-pedido")
    
    let pedidoItem = document.createElement("li")
    pedidoItem.classList.add("item-pedido")

    // a ese item le damos la estructura html
    pedidoItem.innerHTML += `
        <span> Pedido ${++ count} </span>
        <p>${pedido.comida}</p>
        <p>${pedido.bebida}</p>
        <p>${pedido.tamanio}</p>
        <p>$${pedido.importe}</p>
    `
    // agregamos el item a la lista
    pedidosLista.append(pedidoItem)

    // agregamos la lista a la seccion contenedora
    contenedorPedidos.append(pedidosLista)
})

// creamos un div en el main que contendra el total del pedido
let mainContent = document.querySelector("#content")
let contenedorImporteTotal = document.createElement("div")
contenedorImporteTotal.classList.add("contenedor-importe-total")
contenedorImporteTotal.innerText = "El total de su pedido es de: $" + calcularTotal()

// appendeamos ese div al main
mainContent.append(contenedorImporteTotal)

alert("¡Gracias por confiar en FastFeed!")