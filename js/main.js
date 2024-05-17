
alert("¡Bienvenidx a FastFeed!\n\ \n\ Vamos a tomar su orden.\n\ Siga los pasos hasta completar el pedido.")


let pedido = []

function tomarOrden() {
    let totalPedido = 0

    let menuComida
    do {
        menuComida = parseInt(prompt("Seleccione Comida: \n\
        1. Hamburguesa Completa -> $3000\n\
        2. Churrasquito caramelizado -> $4500\n\
        3. Opcion vegana -> $5000\n\
        4. Omitir / Continuar\n\ \n\
        Cada opcion incluye guarnición de papas"))

        switch (menuComida) {
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


    if (menuComida != 4 || menuBebida != 4) {
        let extra = prompt("¿Desea agrandar el combo por $500?")
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
    let pedidoAgregar = {
        comida: menuComida,
        bebida: menuBebida,
        importe: totalPedido
    }
    pedido.push(pedidoAgregar)
}

let decision
do {
    tomarOrden()
    decision = prompt("¿Desea realizar otra orden (si/no)?")
    if (decision === null) {
        decision = "no"
    }
} while (decision.toLowerCase() != "no")


function calcularTotal() {
        let totalAPagar = pedido.reduce((valorTotal, pedido) => valorTotal + pedido.importe, 0)
        return totalAPagar
    }

let importeTotal = calcularTotal()

console.log("Total: ")

console.log(importeTotal)

alert("El total de su pedido es de: $" + importeTotal.toString())
