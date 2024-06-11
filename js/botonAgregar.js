const addingButtons = document.querySelectorAll(".add-to-cart")

addingButtons.forEach(boton => {
    boton.addEventListener("click", () => {
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
    })
})
