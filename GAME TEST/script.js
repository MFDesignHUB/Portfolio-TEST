const protagonist = document.getElementById('protagonist');
const map = document.getElementById('map');

let posX = 50; // Posizione iniziale orizzontale (percentuale)
let posY = 50; // Posizione iniziale verticale (percentuale)
const moveStep = 5; // Passo di movimento per ogni pressione

// Funzione per aggiornare la posizione del protagonista
function moveProtagonist() {
    protagonist.style.left = `${posX}%`;
    protagonist.style.top = `${posY}%`;
}

// Gestione delle frecce della tastiera
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        if (posY > 0) posY -= moveStep;
        protagonist.src = 'protagonist_up.gif'; // Cambia immagine
    } else if (e.key === 'ArrowDown') {
        if (posY < 100) posY += moveStep;
        protagonist.src = 'protagonist_down.gif'; // Cambia immagine
    } else if (e.key === 'ArrowLeft') {
        if (posX > 0) posX -= moveStep;
        protagonist.src = 'protagonist_left.gif'; // Cambia immagine
    } else if (e.key === 'ArrowRight') {
        if (posX < 100) posX += moveStep;
        protagonist.src = 'protagonist_right.gif'; // Cambia immagine
    }

    moveProtagonist(); // Aggiorna la posizione dopo il cambio immagine
});

// Gestione dei tasti direzionali virtuali


document.getElementById('up').addEventListener('click', () => {
    if (posY > 0) posY -= moveStep; // Sposta il protagonista
    moveProtagonist(); // Aggiorna la posizione
    protagonist.src = 'protagonist_up.gif'; // Cambia l'immagine
});


document.getElementById('down').addEventListener('click', () => {
    if (posY < 100) posY += moveStep;
    moveProtagonist();
    protagonist.src = 'protagonist_down.gif';
});

document.getElementById('left').addEventListener('click', () => {
    if (posX > 0) posX -= moveStep;
    moveProtagonist();
    protagonist.src = 'protagonist_left.gif';
});

document.getElementById('right').addEventListener('click', () => {
    if (posX < 100) posX += moveStep;
    moveProtagonist();
    protagonist.src = 'protagonist_right.gif';
});

//------------------------------da qui cambia-------------------------------------
// Variabile per tenere traccia del filtro selezionato manualmente
let manualFilter = null;

// Funzione per impostare il filtro in base all'ora (solo se manualFilter è nullo)
function applyTimeBasedFilter() {
    if (manualFilter) return; // Se è attivo un filtro manuale, non fare nulla

    const currentHour = new Date().getHours();
    const body = document.body;

    // Rimuovi eventuali filtri esistenti
    body.classList.remove('light-filter', 'dark-filter');

    // Applica il filtro in base all'orario
    if (currentHour >= 5 && currentHour <= 10) {
        body.classList.add('light-filter');
    } else if (currentHour >= 17 || currentHour < 5) {
        body.classList.add('dark-filter');
    }
}

// Funzione per gestire la pressione dei tasti
function handleKeyPress(event) {
    const body = document.body;

    // Controlla quale tasto è stato premuto
    if (event.key.toLowerCase() === 'b') {
        body.classList.remove('dark-filter'); // Rimuovi filtro scuro
        body.classList.add('light-filter'); // Applica filtro luminoso
        manualFilter = 'light'; // Imposta lo stato manuale
    } else if (event.key.toLowerCase() === 'd') {
        body.classList.remove('light-filter'); // Rimuovi filtro luminoso
        body.classList.add('dark-filter'); // Applica filtro scuro
        manualFilter = 'dark'; // Imposta lo stato manuale
    } else if (event.key.toLowerCase() === 'n') {
        body.classList.remove('light-filter', 'dark-filter'); // Rimuovi tutti i filtri
        manualFilter = 'normal'; // Imposta lo stato manuale a normale
    }
}
    












// da qui nuovo codice 


const gridSize = 18; // Dividiamo la mappa in 18x18 riquadri
const riquadri = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

// Funzione per ottenere l'indice del riquadro basato sulle percentuali
function getRiquadroIndex(posX, posY) {
    const col = Math.floor((posX / 100) * gridSize);
    const row = Math.floor((posY / 100) * gridSize);
    return { col, row };
}

// Funzione per gestire l'interazione con un riquadro
function interagisciConRiquadro(posX, posY) {
    const { col, row } = getRiquadroIndex(posX, posY);
    const azione = riquadri[row][col];
    if (azione) {
        alert(azione); // Puoi cambiare questa azione con qualcosa di più complesso
    }
}

// Modifica moveProtagonist per includere l'interazione con i riquadri
function moveProtagonist() {
    protagonist.style.left = `${posX}%`;
    protagonist.style.top = `${posY}%`;
    interagisciConRiquadro(posX, posY);
}

// Esempio di definizione delle azioni nei riquadri
riquadri[2][3] = "Hai vinto!";
riquadri[4][5] = "Hai perso!";
riquadri[6][7] = "Ostacolo, non puoi passare!";


// Applica il filtro all'avvio
applyTimeBasedFilter();

// Aggiorna il filtro ogni minuto (se non è stato selezionato manualmente)
setInterval(applyTimeBasedFilter, 60000);

// Aggiungi l'evento per rilevare la pressione dei tasti
document.addEventListener('keydown', handleKeyPress);
