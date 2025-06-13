const grid = document.getElementById('grid-bg');
let name;
if (screen.width <= 425) {
    name = document.getElementById('phone-name');
    let abensonTasks = document.getElementById('abenson-tasks');
    let listItems = abensonTasks.querySelectorAll('li');
    listItems.forEach(item => {
        item.style.display = 'none';
    });
} else {
    name = document.getElementById('pc-name');
}
if (screen.width <= 768) {
    let languageList = document.getElementById('languages-list');
    languageList.classList.remove('border-t-2', 'border-gray-300', 'pt-2',);
}
if (screen.width <= 1024) {
    document.getElementById('phone-about-me').style.display = 'block';
    document.getElementById('pc-about-me').style.display = 'none';
}
let tileSize = 100;
let tiles = [];
let totalTiles = 0;
let isFast;
function createTiles() {
    tiles = [];
    grid.innerHTML = '';

    const containerWidth = screen.width;
    const containerHeight = window.innerHeight;
    let cols = Math.ceil(containerWidth / tileSize);
    let rows = Math.ceil(containerHeight / tileSize);
    while (cols > 32 || rows > 16) {
        isFast = true;
        tileSize += 10;
        cols = Math.ceil(containerWidth / tileSize);
        rows = Math.ceil(containerHeight / tileSize);
    }
    totalTiles = rows * cols;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        const shade = 245 + Math.floor(Math.random() * 10);
        tile.style.backgroundColor = `rgb(${shade},${shade},${shade})`;
        tile.style.transform = 'scale(1)';
        tile.style.zIndex = '1';
        tile.style.opacity = '0.6';
        grid.appendChild(tile);
        tiles.push(tile);
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function* fibonacci() {
    let a = 1,
        b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

async function animateTilesToColorRandomGroups(color, scale) {
    let shuffledTiles = shuffle(tiles);
    let index = 0;
    const fibGen = fibonacci();

    while (index < shuffledTiles.length) {
        const groupSize = fibGen.next().value;
        const actualGroupSize = Math.min(groupSize, shuffledTiles.length - index);
        const group = shuffledTiles.slice(index, index + actualGroupSize);

        for (const tile of group) {
            tile.style.backgroundColor = color;
            tile.style.transform = `scale(${scale})`;
            tile.style.zIndex = '1';
            tile.style.opacity = '0.6'; /* Keep opacity consistent */
            if (isFast) {
                await delay(1); // Shorter delay for faster animation on smaller screens/more tiles
            } else {
                await delay(4);
            }
        }
        index += actualGroupSize;
        if (isFast) {
            await delay(4);
        } else {
            await delay(12);
        }
    }
}
async function animateTilesToRandomWhite() {
    let shuffledTiles = shuffle(tiles);
    let index = 0;
    const fibGen = fibonacci();
    while (index < shuffledTiles.length) {
        const groupSize = fibGen.next().value;
        const actualGroupSize = Math.min(groupSize, shuffledTiles.length - index);
        const group = shuffledTiles.slice(index, index + actualGroupSize);
        for (const tile of group) {
            const shade = 245 + Math.floor(Math.random() * 10);
            tile.style.backgroundColor = `rgb(${shade},${shade},${shade})`;
            tile.style.transform = 'scale(1)';
            // Tiles are temporarily brought to the front to cover the name.
            tile.style.zIndex = '3';
            tile.style.opacity = '1'; /* Return to full opacity */
            if (!isFast) {
                await delay(4);
            }
        }
        index += actualGroupSize;
        if (!isFast) {
            await delay(8);
        }
    }
}