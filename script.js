const board = document.getElementById('game-board');

const scoreDisplay = document.getElementById('score');

const tileValues = ['🍎', '🍌', '🍉', '🍍', '🍓', '🍇', '🍊', '🍒', '🍎',' 🫒','🍌', '🍉', '🍐','🍍', '🍓', '🍇', '🍊', '🍒', '🍑', '🥝', '🍑', '🥥', '🍈', '🍊', '🍍', '🍋', '🍍', '🍒','🫒','🍐'];

let flippedTiles = [];

let matchedCount = 0;

let score = 0;

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];

  }

}

function createTile(value) {

  const tile = document.createElement('div');

  tile.classList.add('tile');

  tile.dataset.value = value;

  tile.addEventListener('click', flipTile);

  return tile;

}

function flipTile() {

  if (flippedTiles.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {

    return;

  }

  this.classList.add('flipped');

  this.textContent = this.dataset.value;

  flippedTiles.push(this);

  if (flippedTiles.length === 2) {

    checkMatch();

  }

}

function checkMatch() {

  const [firstTile, secondTile] = flippedTiles;

  if (firstTile.dataset.value === secondTile.dataset.value) {

    firstTile.classList.add('matched');

    secondTile.classList.add('matched');

    score += 10; // Increase score for a match

    matchedCount += 2;

    flippedTiles = [];

    scoreDisplay.textContent = score;

    if (matchedCount === tileValues.length) {

      alert('You win!');

    }

  } else {

    setTimeout(() => {

      firstTile.classList.remove('flipped');

      secondTile.classList.remove('flipped');

      firstTile.textContent = '';

      secondTile.textContent = '';

      flippedTiles = [];

    }, 1000);

  }

}

function startGame() {

  shuffle(tileValues);

  tileValues.forEach(value => {

    const tile = createTile(value);

    board.appendChild(tile);

  });

}

startGame();