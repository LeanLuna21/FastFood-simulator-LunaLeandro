
alert("¡Bienvenidx a FastFeed!\n\ \n\ Vamos a tomar su orden.\n\ Siga los pasos hasta completar el pedido.")


let total_a_pagar = 0

function tomarOrden() {

    let comida
    do {
        comida = parseInt(prompt("Seleccione Comida: \n\
        1. Hamburguesa Completa -> $3000\n\
        2. Churrasquito caramelizado -> $4500\n\
        3. Opcion vegana -> $5000\n\
        4. Omitir / Continuar\n\ \n\
        Cada opcion incluye guarnición de papas"))

        switch (comida) {
            case 1:
                console.log("Agregado: hamburguesa completa")
                total_a_pagar += 3000
                break
            case 2:
                console.log("Agregado: churrasquito caramelizado")
                total_a_pagar += 4500
                break
            case 3:
                console.log("Agregado: menu vegano")
                total_a_pagar += 5000
                break
            case 4:
                break
            default:
                console.log("La opcion elegida no es valida.")
        }

    } while (comida < 1 || comida > 4 || isNaN(comida))

    
    let bebida
    do {
        bebida = parseInt(prompt("Seleccione Bebida: \n\
    1. Gaseosa -> $1000\n\
    2. Agua sin gas -> $800\n\
    3. Jugo Exprimido -> $1500\n\
    4. Omitir"))

        switch (bebida) {
            case 1:
                console.log("Agregado: gaseosa")
                total_a_pagar += 1000
                break
            case 2:
                console.log("Agregado: agua sin gas")
                total_a_pagar += 800
                break
            case 3:
                console.log("Agregado: jugo exprimido")
                total_a_pagar += 1500
                break
            case 4:
                break
            default:
                console.log("la opcion elegida no es valida")
        }
    } while (bebida < 1 || bebida > 4 || isNaN(bebida))

    if (comida != 4 || bebida != 4){
        let extra = prompt("¿Desea agrandar el combo por $500?")
            if (extra === null){
                extra = "no"
            }
            if (extra == "" || extra.toLowerCase() === "si") {
                console.log("Combo agrandado")
                total_a_pagar += 500
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
console.log(total_a_pagar)

alert("El total de su pedido es de: $" + total_a_pagar.toString())
