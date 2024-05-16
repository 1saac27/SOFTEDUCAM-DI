// Función para inicializar la actividad
function iniciarActividad() {
    // Crear una instancia de la clase Actividad
    const actividad = new Actividad();

    // Obtener la imagen del formulario
    const imagenFormulario = document.getElementById('imagen-actividad');

    // Mostrar la primera imagen al cargar la página
    imagenFormulario.src = `../assets/escuela/${actividad.imagenes[actividad.indiceActual]}`;
}

// Función constructora de la clase Actividad
class Actividad {
    constructor() {
        this.palabras = ["salon", "lapiz", "goma","cuaderno","crayones","sacapuntas","tijeras",
            "pizarron"
        ]; 
        this.imagenes = ["el salon de clases.jpeg", 
        "salon-01(lapiz)/Lapiz.png",
         "salon-02(goma)/goma.png","salon-03(cuaderno)/cuaderno.png",
        "salon-04(crayones)/crayones.png","salon-05(sacapuntas)/sacapuntas.png",
        "salon-06(tijeras)/tijeras.png","salon-07(pizarron)/pizarron.png"]; 
        this.indiceActual = 0; 
        this.init();
        this.mostrarSiguiente();
    }

    // Inicializar la actividad
    init() {
        const formulario = document.querySelector('.formulario');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío del formulario
            this.evaluarPalabra();
        });
    }

    // Evaluar la palabra ingresada
    evaluarPalabra() {
        const palabraIngresada = document.getElementById('palabra').value.toLowerCase().trim();
        const palabraCorrecta = this.palabras[this.indiceActual];
        
        console.log('palabra correcta: ' + palabraCorrecta);
        console.log('palabra ingresada: ' + palabraIngresada);

        if (palabraIngresada === palabraCorrecta) {
            if (this.indiceActual < this.palabras.length - 1) {
                this.indiceActual++;
                this.mostrarSiguiente();
                Swal.fire({
                    icon: null, // Deja el icono en null
                    title: "¡ Excelente !",
                    html: '<img src="../assets/feliz1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                          '<br><br>' +
                          '<h2>Has escrito correctamente la palabra!</h2>', // Agrega el texto
                    showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
                });
            }
        } else {
            Swal.fire({
                icon: null, // Deja el icono en null
                title: "Oh no!",
                html: '<img src="../assets/triste1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                      '<br><br>' +
                      '<h2>La palabra es incorrecta o está mal escrita!</h2>', // Agrega el texto
                showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
            });
            
        }
    }

    // Mostrar la siguiente imagen
    mostrarSiguiente() {
        const imagen = document.querySelector('.contenedor img');
        imagen.src = `../assets/escuela/${this.imagenes[this.indiceActual]}`;
        document.getElementById('palabra').value = "";
    }
}

// Iniciar la actividad al cargar el documento
$(document).ready(function() {
    iniciarActividad();
});
