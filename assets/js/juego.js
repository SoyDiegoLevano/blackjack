let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A']

//Puntos
let puntosJugador = 0,
    puntosComputador = 0;

// Referencias
const btnNuevo = document.querySelector('#nuevo-juego');
const btnPedir = document.querySelector('#pedir-carta');
const btnDetener = document.querySelector('#detemer');
const lblPuntosJugador = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');

const crearDeck = () => {
    for(let tipo of tipos){
        for(let i = 2; i <= 10; i++){
            deck.push(i + tipo);
        }
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    console.log(deck);
    return _.shuffle(deck);
};

let nuevoDeck = crearDeck();


const pedirCarta = () => {
    if (nuevoDeck.length === 0){
        throw 'No hay más cartas en el Deck'
    }
    let carta = nuevoDeck.pop();
    return carta
};


const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}


//Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    lblPuntosJugador[0].innerText = puntosJugador

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.webp`;
    imgCarta.classList = 'carta';

    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
    }else if( puntosJugador == 21){
        console.warn('21!!!')
    }

    console.log(puntosJugador)
})