// bot de toma de pedidos
alert("¡Bienvenidx a FastFeed!\n\ \n\ Vamos a tomar su orden.\n\ Siga los pasos hasta completar el pedido.")

// array donde se almacenaran los pedidos
let pedido = []

// funcion que pide al usuario seleccionar su menu
function tomarOrden() {

    // variable para almacenar el precio total por orden
    let totalPedido = 0

    let menuComida
    // pedimos al usuario que ingrese opcion siempre y cuando sea una de las disponibles
    do {
        menuComida = parseInt(prompt("Seleccione Comida: \n\
        1. Hamburguesa Completa -> $3000\n\
        2. Churrasquito caramelizado -> $4500\n\
        3. Opcion vegana -> $5000\n\
        4. Omitir / Continuar\n\ \n\
        Cada opcion incluye guarnición de papas"))

        switch (menuComida) {
            // mostramos la opcion por consola y sumamos el precio al total de este pedido
            case 1:
                console.log("Agregado: hamburguesa completa")
                totalPedido += 3000
                break
            case 2:
                console.log("Agregado: churrasquito caramelizado")
                totalPedido += 4500
                break
            case 3:
                console.log("Agregado: menu vegano")
                totalPedido += 5000
                break
            case 4:
                break
            default:
                console.log("La opcion elegida no es valida.")
        }
    } while (menuComida < 1 || menuComida > 4 || isNaN(menuComida))

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
                console.log("Agregado: gaseosa")
                totalPedido += 1000
                break
            case 2:
                console.log("Agregado: agua sin gas")
                totalPedido += 800
                break
            case 3:
                console.log("Agregado: jugo exprimido")
                totalPedido += 1500
                break
            case 4:
                break
            default:
                console.log("la opcion elegida no es valida")
        }
    } while (menuBebida < 1 || menuBebida > 4 || isNaN(menuBebida))

    // si el usuario realizo algun pedido, ya sea comida o gaseosa
    if (menuComida != 4 || menuBebida != 4) {
        // preguntamos si desea agrandar su orden
        let extra = prompt("¿Desea agrandar el combo por $500?")
        // mostramos el resultado por consola y lo sumamos al total del pedido
        if (extra === null) {
            extra = "no"
        }
        if (extra == "" || extra.toLowerCase() === "si") {
            console.log("Combo agrandado")
            totalPedido += 500
        } else {
            console.log("Tamaño regular")
        }
    }

    // por ultimo, agregamos las opciones elegidas (comida, bebida y total por pedido) al array de pedidos 
    let pedidoAgregar = {
        comida: menuComida,
        bebida: menuBebida,
        importe: totalPedido
    }
    pedido.push(pedidoAgregar)
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
    let totalAPagar = pedido.reduce((valorTotal, pedido) => valorTotal + pedido.importe, 0)
    return totalAPagar
}

let importeTotal = calcularTotal()

console.log("Total a abonar: ", importeTotal)

alert("El total de su pedido es de: $" + importeTotal.toString())
