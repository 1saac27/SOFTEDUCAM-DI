const cardsArray = [
    { name: 'elote', img: '../../assets/4-ALIMENTACION/elote.png' },
    { name: 'leche', img: '../../assets/4-ALIMENTACION/leche.png' },
    { name: 'limon', img: '../../assets/4-ALIMENTACION/lemon.png' },
    { name: 'mango', img: '../../assets/4-ALIMENTACION/mango.png' },
    { name: 'manzana', img: '../../assets/4-ALIMENTACION/manzana.png' },
    { name: 'naranja', img: '../../assets/4-ALIMENTACION/naranja.png' },
    { name: 'nopal', img: '../../assets/4-ALIMENTACION/nopal.png' },
    { name: 'platano', img: '../../assets/4-ALIMENTACION/platano.png' },
    { name: 'queso', img: '../../assets/4-ALIMENTACION/queso.png' },
    { name: 'tomate', img: '../../assets/4-ALIMENTACION/tomatoe.png' },
    { name: 'elote', img: '../../assets/4-ALIMENTACION/elote.png' },
    { name: 'leche', img: '../../assets/4-ALIMENTACION/leche.png' },
    { name: 'limon', img: '../../assets/4-ALIMENTACION/lemon.png' },
    { name: 'mango', img: '../../assets/4-ALIMENTACION/mango.png' },
    { name: 'manzana', img: '../../assets/4-ALIMENTACION/manzana.png' },
    { name: 'naranja', img: '../../assets/4-ALIMENTACION/naranja.png' },
    { name: 'nopal', img: '../../assets/4-ALIMENTACION/nopal.png' },
    { name: 'platano', img: '../../assets/4-ALIMENTACION/platano.png' },
    { name: 'queso', img: '../../assets/4-ALIMENTACION/queso.png' },
    { name: 'tomate', img: '../../assets/4-ALIMENTACION/tomatoe.png' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let aciertos = 0;
let turnos = 0;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    cardsArray.sort(() => 0.5 - Math.random());

    cardsArray.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const imgFront = document.createElement('img');
        imgFront.src = card.img; // Añadir la ruta de la imagen
        cardFront.appendChild(imgFront);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    });
}

// Llamar a la función para crear el tablero al cargar la página
createBoard();

// Iniciar el juego cuando se hace clic en el botón "Jugar"
$("#start-button").on("click", function() {
    // Mostrar todas las cartas durante 10 segundos
    showAllCards();
    setTimeout(flipAllCards, 5000); // Voltear todas las cartas después de 10 segundos
    $(this).hide(); // Ocultar el botón después de hacer clic en él
});

// Función para manejar el clic en una carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
    turnos++; // Incrementar el contador de turnos
    $("#turnos").text(turnos);
}

// Función para comprobar si las dos cartas son iguales
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards(); // Si son iguales, deshabilitar las cartas
        aciertos++; // Incrementar el contador de aciertos
        $("#aciertos").text(aciertos);
        checkIfGameWon(); // Comprobar si el juego ha sido ganado
    } else {
        unflipCards(); // Si no son iguales, voltear las cartas de nuevo
    }
}

// Función para deshabilitar las cartas cuando son iguales
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Función para voltear las cartas cuando no son iguales
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

// Función para reiniciar el tablero después de un par de intentos
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Función para mostrar todas las cartas durante 10 segundos
function showAllCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('flip'));
}

// Función para voltear todas las cartas
function flipAllCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.remove('flip'));
}

// Función para comprobar si el juego ha sido ganado
function checkIfGameWon() {
    if (aciertos === cardsArray.length / 2) {
        mostrarFelicidades(); // Mostrar el modal de felicitaciones
    }
}

// Función para mostrar el modal con el mensaje de felicitaciones
function mostrarFelicidades() {
    $('#mensajeResultado').text('¡FELICIDADES!');
    $('#resultadoImagen').attr('src', '../assets/feliz1.png'); // Cambia la ruta de la imagen según sea necesario
    $('#resultadoModal').css('display', 'block');
}

$(document).ready(function() {
    // Cierra el modal al hacer clic en la "x"
    $('.close').on('click', function() {
        $('#resultadoModal').css('display', 'none');
    });

    // Cierra el modal al hacer clic fuera del contenido del modal
    $(window).on('click', function(event) {
        if (event.target.id === 'resultadoModal') {
            $('#resultadoModal').css('display', 'none');
        }
    });

    // Acción del botón "Volver a jugar"
    $('#volverAJugar').on('click', function() {
        location.reload(); // Recargar la página
    });

    // Acción del botón "Salir"
    $('#salir').on('click', function() {
        window.location.href = "../1MAIN/Contenido.html"; // Redirigir a otra página
    });
});