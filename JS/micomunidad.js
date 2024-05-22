document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'img1', img: '../assets/FAMILIA1/hermana.jpg' },
        { name: 'img1', img: '../assets/FAMILIA1/hermana.jpg' },
        { name: 'img2', img: '../assets/FAMILIA1/abuelos.png' },
        { name: 'img2', img: '../assets/FAMILIA1/abuelos.png' },
        { name: 'img3', img: '../assets/FAMILIA1/mama.png' },
        { name: 'img3', img: '../assets/FAMILIA1/mama.png' },
        { name: 'img4', img: '../assets/FAMILIA1/hermano.jpeg' },
        { name: 'img4', img: '../assets/FAMILIA1/hermano.jpeg' },
        { name: 'img5', img: '../assets/FAMILIA1/papa3.jpeg' },
        { name: 'img5', img: '../assets/FAMILIA1/papa3.jpeg' },
        { name: 'img6', img: '../assets/FAMILIA1/grandmother.png' },
        { name: 'img6', img: '../assets/FAMILIA1/grandmother.png' },
        { name: 'img7', img: '../assets/FAMILIA1/grandfather.png' },
        { name: 'img7', img: '../assets/FAMILIA1/grandfather.png' },
        { name: 'img8', img: '../assets/FAMILIA1/primos.jpeg' },
        { name: 'img8', img: '../assets/FAMILIA1/primos.jpeg' },
        { name: 'img9', img: '../assets/FAMILIA1/FAMILIA.jpg' },
        { name: 'img9', img: '../assets/FAMILIA1/FAMILIA.jpg' },
        { name: 'img10', img: '../assets/FAMILIA1/tios y primos.png' },
        { name: 'img10', img: '../assets/FAMILIA1/tios y primos.png' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('game-board');
    let chosenCards = [];
    let chosenCardIds = [];
    let cardsWon = [];

    function createBoard() {
        cardArray.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.setAttribute('class', 'card');
            cardElement.setAttribute('data-id', index);
            cardElement.addEventListener('click', flipCard);
            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', card.img);
            cardElement.appendChild(cardImage);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (chosenCardIds.includes(cardId) || cardsWon.includes(cardArray[cardId].name)) {
            return;
        }

        chosenCards.push(cardArray[cardId].name);
        chosenCardIds.push(cardId);
        this.classList.add('flipped');

        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = chosenCardIds;

        if (chosenCards[0] === chosenCards[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(chosenCards[0]);
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
        }

        chosenCards = [];
        chosenCardIds = [];

        if (cardsWon.length === cardArray.length / 2) {
            // Mostrar un alert
            Swal.fire({
                icon: null, // Deja el icono en null
                title: "¡ Felicidades !",
                html: '<img src="../assets/feliz1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                    '<br><br>' +
                    '<h2>Has terminado la actividad!</h2>', // Agrega el texto
                showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
                willClose: () => {
                    window.location.href = "../1MAIN/Contenido.html"; // Reemplaza con la URL a la que quieres redirigir
                }
            });
        }
    }

    createBoard();
});