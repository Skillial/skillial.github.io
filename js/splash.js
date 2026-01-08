const splashContainer = document.getElementById('splash-screen');
const grid = document.getElementById('grid-bg');
let tiles = [];
let tileSize = 80;

function createTiles() {
    tiles = [];
    grid.innerHTML = '';
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    let cols = Math.ceil(containerWidth / tileSize);
    let rows = Math.ceil(containerHeight / tileSize);
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
        tiles.push(tile);
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function* fibonacci() {
    let a = 1, b = 1;
    while (true) { yield a;[a, b] = [b, a + b]; }
}

async function playSplash() {
    createTiles();
    const logo = document.getElementById('splash-logo');

    await delay(400);
    logo.style.opacity = '1';
    logo.style.transform = 'scale(1)';

    let shuffledTiles = shuffle(tiles);
    let index = 0;
    const fibGen = fibonacci();
    const shades = ['#ffffff', '#fcfcfd', '#f9f9fb'];

    while (index < shuffledTiles.length) {
        const groupSize = fibGen.next().value;
        const actualSize = Math.min(groupSize, shuffledTiles.length - index);
        const group = shuffledTiles.slice(index, actualSize + index);
        group.forEach(tile => {
            tile.style.backgroundColor = shades[Math.floor(Math.random() * shades.length)];
            tile.style.opacity = '1';
            tile.style.transform = 'scale(1)';
        });
        index += actualSize;
        await delay(index < 50 ? 60 : 15);
    }

    await delay(1000);

    document.getElementById('main-content').classList.add('content-visible');
    document.getElementById('main-nav').classList.add('nav-visible');
    splashContainer.style.background = 'transparent';
    logo.style.opacity = '0';

    let fadeTiles = shuffle(tiles);
    const batchSize = Math.ceil(tiles.length / 20);
    for (let i = 0; i < fadeTiles.length; i += batchSize) {
        const chunk = fadeTiles.slice(i, i + batchSize);
        chunk.forEach(t => {
            t.style.opacity = '0';
            t.style.transform = 'scale(1.2)';
        });
        await delay(40);
    }

    await delay(500);
    splashContainer.style.display = 'none';
    startTypewriter();
}

const phrases = [
    "efficiency.",
    "scalability.",
    "stability.",
    "optimization.",
    "security."
];
let pIdx = 0, cIdx = 0, isDeleting = false;

function startTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const current = phrases[pIdx];
    el.textContent = current.substring(0, isDeleting ? cIdx - 1 : cIdx + 1);
    cIdx = isDeleting ? cIdx - 1 : cIdx + 1;
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && cIdx === current.length) {
        speed = 2500;
        isDeleting = true;
    } else if (isDeleting && cIdx === 0) {
        isDeleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        speed = 400;
    }
    setTimeout(startTypewriter, speed);
}

window.onload = playSplash;
window.onresize = createTiles;