
alert("¡Bienvenidx a FastFeed!\n\ \n\ Vamos a tomar su orden.\n\ Siga los pasos hasta completar el pedido.")


let totalAPagar = 0

function tomarOrden() {

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
                totalAPagar += 3000
                break
            case 2:
                console.log("Agregado: churrasquito caramelizado")
                totalAPagar += 4500
                break
            case 3:
                console.log("Agregado: menu vegano")
                totalAPagar += 5000
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
                totalAPagar += 1000
                break
            case 2:
                console.log("Agregado: agua sin gas")
                totalAPagar += 800
                break
            case 3:
                console.log("Agregado: jugo exprimido")
                totalAPagar += 1500
                break
            case 4:
                break
            default:
                console.log("la opcion elegida no es valida")
        }
    } while (menuBebida < 1 || menuBebida > 4 || isNaN(menuBebida))

    if (menuComida != 4 || menuBebida != 4){
        let extra = prompt("¿Desea agrandar el combo por $500?")
            if (extra === null){
                extra = "no"
            }
            if (extra == "" || extra.toLowerCase() === "si") {
                console.log("Combo agrandado")
                totalAPagar += 500
            } else {
                console.log("Tamaño regular")
            }
        }
}

let decision
do {
    tomarOrden()
    decision = prompt("¿Desea realizar otra orden (si/no)?")
    if (decision === null) {
        decision = "no"
    }
} while (decision.toLowerCase() != "no")


console.log("Total:")
console.log(totalAPagar)

alert("El total de su pedido es de: $" + totalAPagar.toString())
