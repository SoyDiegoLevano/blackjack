//PATRON POR MODULOS

//funcion anonima auto invicada evita la manipulacion directa del javascript
const miModulo = (() => {
    'use strict'

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['J', 'Q', 'K', 'A']

    //Puntos
    let puntosJugadores = [];

    // Referencias
    const btnNuevo = document.querySelector('#nuevo-juego'),
          btnPedir = document.querySelector('#pedir-carta'),
          btnDetener = document.querySelector('#detener');

    const lblPuntos = document.querySelectorAll('small'),
          divCartas = document.querySelectorAll('.div-cartas'),
          divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas');

    const iniciarJuego = ( numJugadores = 2 ) => {
        puntosJugadores = [];

        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }
        
        //Reiniciar cartas
        divCartas.forEach(elem => elem.innerText = '');

        //Reiniciar puntajes
        lblPuntos.forEach(elem => elem.innerText = 0);

        //Activar botones
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    const crearDeck = () => {
        deck = []
        for (let tipo of tipos) {
            for (let i = 2; i <= 10; i++) {
                deck.push(i + tipo);
            }
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    };

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay más cartas en el Deck'
        }
        return deck.pop();
    };


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    }

    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        lblPuntos[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    };

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.webp`;
        imgCarta.classList = 'carta';
        divCartas[turno].append(imgCarta);

    };

    const determinarGanador = () => {
        setTimeout( () => {
            const [puntosMinimos, puntosComputador] = puntosJugadores;

            if (puntosMinimos > 21) {
                console.warn('Perdiste, Computadora Gana.');
            } else if (puntosComputador > 21) {
                console.warn('Jugador Gana');
            } else if (puntosComputador > puntosMinimos && puntosComputador <= 21) {
                console.warn('Computadora Gana');
            } else if (puntosComputador == puntosMinimos) {
                console.warn('Empate')
            }
        }, 100 )
    };

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputador;

        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos( carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1);
        } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador(puntosMinimos, puntosComputador);
    
    };


    //Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta( carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador == 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0])
    });

    btnNuevo.addEventListener('click', () => {
        //Reiniciar
        iniciarJuego();
    })

    return {
        startGame: iniciarJuego
    }

})();
